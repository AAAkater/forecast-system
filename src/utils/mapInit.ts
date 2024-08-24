import * as ChinaJson from "@/assets/China.json"
import * as d3 from "d3"
import gsap from "gsap"
import * as THREE from "three"
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js"
import type {
  GeometryCoordinates,
  GeometryType,
  LabelDataObject,
} from "./typed"

import {
  drawExtrudeMesh,
  drawLineBetween2Spot,
  drawSpot,
  generateMapLabel2D,
  getDynamicMapScale,
} from "@/utils/mapFunc"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { mapConfig } from "./mapConfig"

export class Map {
  scene
  raycaster
  pointer
  camera
  labelRenderer: CSS2DRenderer
  mapDom: HTMLElement
  labelDom: HTMLElement
  renderer: THREE.WebGLRenderer
  ChinaMap: THREE.Object3D
  labelData: LabelDataObject = {}
  spotList: any
  flySpotList: any = []

  public constructor(mapDom: HTMLElement, labelDom: HTMLElement) {
    this.mapDom = mapDom
    this.labelDom = labelDom
    // 场景
    this.scene = new THREE.Scene()

    // 摄像机
    this.camera = new THREE.PerspectiveCamera(
      30, //45
      mapDom.clientWidth / mapDom.clientHeight,
      0.1,
      1000,
    )
    this.camera.position.set(-10, -90, 130)
    // 渲染器
    this.renderer = new THREE.WebGLRenderer({
      antialias: true, //抗锯齿
      alpha: true, //背景透明
    })
    this.renderer.setSize(mapDom.clientWidth, mapDom.clientHeight)
    mapDom.appendChild(this.renderer.domElement)

    //设置 raycaster
    this.raycaster = new THREE.Raycaster()
    this.pointer = new THREE.Vector2()

    // css2 Renderer 渲染器
    this.labelRenderer = new CSS2DRenderer()
    this.labelRenderer.setSize(mapDom.clientWidth, mapDom.clientHeight)
    this.labelRenderer.domElement.style.position = "absolute"
    this.labelRenderer.domElement.style.top = "0px"
    if (labelDom?.childNodes[0]) {
      labelDom.removeChild(labelDom.childNodes[0])
    }
    labelDom?.appendChild(this.labelRenderer.domElement)

    const projectionFn = d3
      .geoMercator()
      .center([104.0, 37.5])
      .scale(40)
      .translate([0, 0])
    // 3D地图
    this.ChinaMap = this.initMap3D(projectionFn)
    //标签
    this.labelData = this.initLabel(projectionFn)
    //绘制点位
    this.spotList = this.initSpot()
    // Models
    this.initModels()
    // 绘制连线
    this.initLine()
    //地图缩放
    const mapScale: number = getDynamicMapScale(this.ChinaMap, this.mapDom)
    // 动画
    gsap.to(this.ChinaMap.scale, {
      x: mapScale,
      y: mapScale,
      z: 1,
      duration: 1,
    })

    // 控制器
    new OrbitControls(this.camera, this.labelRenderer.domElement)

    // 新增光源
    const light = new THREE.PointLight(0xffffff, 1.5)
    light.position.set(0, -5, 30)
    this.scene.add(light)

    // 光源辅助线
    const lightHelper = new THREE.PointLightHelper(light)
    this.scene.add(lightHelper)

    this.animate()

    this.setResize()

    this.setMouseMove()
  }

  // 视窗伸缩
  public setResize(): void {
    // 更新渲染器
    const e = () => {
      const newHeight = window.innerHeight
      const newWidth = window.innerWidth
      this.camera.aspect = newWidth / newHeight
      // 更新摄像机的投影矩阵
      this.camera.updateProjectionMatrix()
      // 更新渲染器
      this.renderer.setSize(newWidth, newHeight)
      this.labelRenderer.setSize(newWidth, newHeight)
      if (this.mapDom.childNodes[0]) {
        this.mapDom.removeChild(this.mapDom.childNodes[0])
      }
      this.mapDom.appendChild(this.renderer.domElement)
      // 设置渲染器的像素比例
      this.renderer.setPixelRatio(window.devicePixelRatio)
    }

    window.addEventListener("resize", e, false)
  }
  // 鼠标悬浮
  public setMouseMove() {
    let lastPick: any = null
    const event = (e: MouseEvent) => {
      const intersects = this.raycaster.intersectObjects(this.scene.children)

      this.pointer.x = (e.clientX / this.mapDom.clientWidth) * 2 - 1
      this.pointer.y = -(e.clientY / this.mapDom.clientHeight) * 2 + 1
      // 如果存在，则鼠标移出需要重置
      if (lastPick) {
        lastPick.object.material[0].color.set(mapConfig.mapColor)
        lastPick.object.material[0].opacity = mapConfig.mapOpacity // 设置完全不透明
      }
      lastPick = null
      // 优化
      lastPick = intersects.find(
        (item: any) => item.object.userData.isChangeColor,
      )

      if (lastPick) {
        if (lastPick.object.material[0]) {
          lastPick.object.material[0].color.set(mapConfig.mapHoverColor)
          lastPick.object.material[0].opacity = 1 // 设置完全不透明
        }

        const properties = lastPick.object.parent.customProperties
        //   if (toolTipRef.current && toolTipRef.current.style) {
        //     toolTipRef.current.style.left = e.clientX + 2 + "px";
        //     toolTipRef.current.style.top = e.clientY + 2 + "px";
        //     toolTipRef.current.style.visibility = "visible";
        //   }
        //   setToolTipData({
        //     text: properties.name,
        //   });
        // } else {
        //   toolTipRef.current.style.visibility = "hidden";
        // }
      }
    }
    window.addEventListener("mousemove", event, false)
  }
  private initMap3D(projectionFn: d3.GeoProjection): THREE.Object3D {
    // 大地图对象
    const ChinaMap = new THREE.Object3D()
    // 省份数据
    const provinces = ChinaJson.features

    // 遍历所有省
    provinces.forEach((province) => {
      // 省份模型
      const provinceMap = new THREE.Object3D()
      // 省份坐标
      const provinceCoords: GeometryCoordinates<GeometryType> =
        province.geometry.coordinates
      switch (province.geometry.type) {
        case "MultiPolygon": {
          provinceCoords.forEach((multiPolygon: [number, number][][]) => {
            multiPolygon.forEach((polygon: [number, number][]) => {
              const { mesh, line } = drawExtrudeMesh(polygon, projectionFn)
              provinceMap.add(mesh)
              provinceMap.add(line)
            })
          })
          break
        }
        case "Polygon": {
          provinceCoords.forEach((polygon: [number, number][]) => {
            const { mesh, line } = drawExtrudeMesh(polygon, projectionFn)
            provinceMap.add(mesh)
            provinceMap.add(line)
          })
          break
        }
      }
      // 将省份添加到中国大地图
      ChinaMap.add(provinceMap)
    })
    this.scene.add(ChinaMap)
    return ChinaMap
  }

  private initLabel(projectionFn: d3.GeoProjection) {
    // 省份数据
    const provinces = ChinaJson.features
    // 省份标签
    const labelData: LabelDataObject = {}

    for (const province of provinces) {
      const provinceFeature = province.properties
      // 不存在省份中心
      if (!provinceFeature.centroid) {
        continue
      }
      // 省中心坐标
      const provinceCenterCoord = projectionFn(
        provinceFeature.centroid as [number, number],
      ) as [number, number]
      // 省会城市名
      const provinceName: string = provinceFeature.name
      // console.log(cityName, provinceCenterCoord)
      labelData[provinceName] = provinceCenterCoord
    }
    const labelObject2D = generateMapLabel2D(labelData)
    this.ChinaMap.add(labelObject2D)
    return labelData
  }

  private initModels() {
    const modelObject3D = new THREE.Object3D()
    let modelMixer: any = []
    const loader = new GLTFLoader()
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath("/draco/")
    loader.setDRACOLoader(dracoLoader)
    loader.load("/models/cone.glb", (glb: any) => {
      Object.entries(this.labelData).forEach(([provinceName, centerCoord]) => {
        const clonedModel = glb.scene.clone()
        const mixer = new THREE.AnimationMixer(clonedModel)
        const clonedAnimations = glb.animations.map((clip: any) => {
          return clip.clone()
        })
        clonedAnimations.forEach((clip: any) => {
          mixer.clipAction(clip).play()
        })
        // 添加每个model的mixer
        modelMixer.push(mixer)
        // 设置模型位置
        clonedModel.position.set(
          centerCoord[0],
          -centerCoord[1],
          mapConfig.spotZIndex,
        )
        // 设置模型大小
        clonedModel.scale.set(0.3, 0.3, 0.6)
        modelObject3D.add(clonedModel)
      })

      // this.labelData.forEach((label: LabelDataObject) => {
      //   const featureCenterCoord = label.centerCoord
      //   const clonedModel = glb.scene.clone()
      //   const mixer = new THREE.AnimationMixer(clonedModel)
      //   const clonedAnimations = glb.animations.map((clip: any) => {
      //     return clip.clone()
      //   })
      //   clonedAnimations.forEach((clip: any) => {
      //     mixer.clipAction(clip).play()
      //   })
      //   // 添加每个model的mixer
      //   modelMixer.push(mixer)
      //   // 设置模型位置
      //   clonedModel.position.set(
      //     featureCenterCoord[0],
      //     -featureCenterCoord[1],
      //     mapConfig.spotZIndex,
      //   )
      //   // 设置模型大小
      //   clonedModel.scale.set(0.3, 0.3, 0.6)
      //   modelObject3D.add(clonedModel)
      // })
      this.ChinaMap.add(modelObject3D)
    })
  }

  private initSpot() {
    const spotObject3D = new THREE.Object3D()
    const spotList: any = []
    Object.entries(this.labelData).forEach(([provinceName, centerCoord]) => {
      const spotObjectItem = drawSpot(centerCoord)
      if (spotObjectItem && spotObjectItem.circle && spotObjectItem.ring) {
        spotObject3D.add(spotObjectItem.circle)
        spotObject3D.add(spotObjectItem.ring)
        spotList.push(spotObjectItem.ring)
      }
    })
    this.ChinaMap.add(spotObject3D)
    return spotList
  }
  private initLine(MAX_LINE_COUNT: number = 5) {
    const endNames = [
      "新疆维吾尔自治区",
      "青海省",
      "云南省",
      "贵州省",
      "重庆市",
      "海南省",
      "江苏省",
      "北京市",
      "山东省",
    ]

    //绘制飞行的点
    const flyObject3D = new THREE.Object3D()
    endNames.forEach((endName: string) => {
      const { flyLine, flySpot } = drawLineBetween2Spot(
        this.labelData["四川省"],
        this.labelData[endName],
      )
      flyObject3D.add(flyLine)
      flyObject3D.add(flySpot)
      this.flySpotList.push(flySpot)
    })
    this.ChinaMap.add(flyObject3D)
  }

  private animate() {
    requestAnimationFrame(this.animate.bind(this))
    // 通过摄像机和鼠标位置更新射线
    this.raycaster.setFromCamera(this.pointer, this.camera)
    this.renderer.render(this.scene, this.camera)
    this.labelRenderer.render(this.scene, this.camera)

    // 圆环
    this.spotList.forEach((mesh: any) => {
      mesh._s += 0.01
      mesh.scale.set(1 * mesh._s, 1 * mesh._s, 1 * mesh._s)
      if (mesh._s <= 2) {
        mesh.material.opacity = 2 - mesh._s
      } else {
        mesh._s = 1
      }
    })

    // 飞行的圆点
    this.flySpotList.forEach(function (mesh: any) {
      mesh._s += 0.003
      let tankPosition = new THREE.Vector3()
      // getPointAt() 根据弧长在曲线上的位置。必须在范围[0，1]内。
      tankPosition = mesh.curve.getPointAt(mesh._s % 1)
      mesh.position.set(tankPosition.x, tankPosition.y, tankPosition.z)
    })
  }
}
