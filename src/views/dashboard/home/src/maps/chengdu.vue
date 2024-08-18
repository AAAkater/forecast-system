<script lang="ts" setup>
import gsap from "gsap"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js"

import { onMounted, ref } from "vue"

import {
  generateMapLabel2D,
  generateMapObject3D,
  generateMapSpot,
  getDynamicMapScale,
} from "@/utils/map/drawFunc"
import { mapConfig } from "@/utils/map/mapConfig"
const mapRef = ref<HTMLElement>()
const map2DRef = ref<HTMLElement>()
let lastPick: any = null

onMounted(() => {
  const currentDom = mapRef.value
  const labelRendererDom = map2DRef.value
  if (!currentDom) return

  // 初始化场景
  const scene = new THREE.Scene()

  // 摄像机
  const camera = new THREE.PerspectiveCamera(
    30, //45
    currentDom.clientWidth / currentDom.clientHeight,
    0.1,
    1000,
  )
  camera.position.set(-10, -90, 130)

  // 渲染器
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(currentDom.clientWidth, currentDom.clientHeight)

  // 这里修改为下面写法，否则 onresize 不生效
  if (currentDom.childNodes[0]) {
    currentDom.removeChild(currentDom.childNodes[0])
  }
  currentDom.appendChild(renderer.domElement)

  // css2 Renderer 渲染器
  const labelRenderer = new CSS2DRenderer()
  labelRenderer.setSize(currentDom.clientWidth, currentDom.clientHeight)
  labelRenderer.domElement.style.position = "absolute"
  labelRenderer.domElement.style.top = "0px"

  if (labelRendererDom?.childNodes[0]) {
    labelRendererDom.removeChild(labelRendererDom.childNodes[0])
  }
  labelRendererDom?.appendChild(labelRenderer.domElement)

  /**
   * 初始化模型（绘制3D模型）
   */
  const { mapObject3D, label2dData } = generateMapObject3D()
  scene.add(mapObject3D)

  /**
   * 动态地图缩放大小
   */
  const mapScale = getDynamicMapScale(mapObject3D, currentDom)

  /**
   * 绘制 2D 面板
   */
  const labelObject2D = generateMapLabel2D(label2dData)
  mapObject3D.add(labelObject2D)

  /**
   * 绘制点位
   */
  const { spotList, spotObject3D } = generateMapSpot(label2dData)
  mapObject3D.add(spotObject3D)

  // Models
  // coneUncompression.glb 是压缩过的模型，需要用dracoLoader加载
  // cone.glb 是未压缩，用 gltfLoader 加载即可

  const modelObject3D = new THREE.Object3D()
  // let mixer: any = null;
  let modelMixer: any = []
  const loader = new GLTFLoader()
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath("/draco/")
  loader.setDRACOLoader(dracoLoader)

  // loader.load("/models/coneUncompression.glb", (glb) => {
  loader.load("/models/cone.glb", (glb: any) => {
    label2dData.forEach((item: any) => {
      // console.log(item, "0-0-0-");
      const { featureCenterCoord } = item
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
        featureCenterCoord[0],
        -featureCenterCoord[1],
        mapConfig.spotZIndex,
      )
      // 设置模型大小
      clonedModel.scale.set(0.3, 0.3, 0.6)
      // clonedModel.rotateX(-Math.PI / 8);
      modelObject3D.add(clonedModel)
    })

    mapObject3D.add(modelObject3D)
  })

  /**
   * 绘制连线（随机生成两个点位）
   */
  // const MAX_LINE_COUNT = 5 // 随机生成5组线
  // let connectLine: any[] = []
  // for (let count = 0; count < MAX_LINE_COUNT; count++) {
  //   const midIndex = Math.floor(label2dData.length / 2)
  //   const indexStart = Math.floor(Math.random() * midIndex)
  //   const indexEnd = Math.floor(Math.random() * midIndex) + midIndex - 1
  //   connectLine.push({
  //     indexStart,
  //     indexEnd,
  //   })
  // }

  /**
   * 绘制飞行的点
   */
  // const flyObject3D = new THREE.Object3D()
  // const flySpotList: any = []
  // connectLine.forEach((item: any) => {
  //   const { indexStart, indexEnd } = item
  //   const { flyLine, flySpot } = drawLineBetween2Spot(
  //     label2dData[indexStart].featureCenterCoord,
  //     label2dData[indexEnd].featureCenterCoord,
  //   )
  //   flyObject3D.add(flyLine)
  //   flyObject3D.add(flySpot)
  //   flySpotList.push(flySpot)
  // })
  // mapObject3D.add(flyObject3D)

  /**
   * 初始化控制器
   */
  // new OrbitControls(camera, renderer.domElement);
  new OrbitControls(camera, labelRenderer.domElement)

  /**
   * 新增光源
   */
  const light = new THREE.PointLight(0xffffff, 1.5)
  light.position.set(0, -5, 30)
  scene.add(light)

  // 光源辅助线
  const lightHelper = new THREE.PointLightHelper(light)
  scene.add(lightHelper)

  // 视窗伸缩
  const onResizeEvent = () => {
    // 更新摄像头
    camera.aspect = currentDom.clientWidth / currentDom.clientHeight
    // 更新摄像机的投影矩阵
    camera.updateProjectionMatrix()
    // 更新渲染器
    renderer.setSize(currentDom.clientWidth, currentDom.clientHeight)
    labelRenderer.setSize(currentDom.clientWidth, currentDom.clientHeight)
    // 设置渲染器的像素比例
    renderer.setPixelRatio(window.devicePixelRatio)
  }

  /**
   * 设置 raycaster
   */
  const raycaster = new THREE.Raycaster()
  const pointer = new THREE.Vector2()

  // 鼠标移入事件
  // const onMouseMoveEvent = (e: MouseEvent) => {
  //   const intersects = raycaster.intersectObjects(scene.children)
  //   pointer.x = (e.clientX / currentDom.clientWidth) * 2 - 1
  //   pointer.y = -(e.clientY / currentDom.clientHeight) * 2 + 1

  //   // 如果存在，则鼠标移出需要重置
  //   if (lastPick) {
  //     // lastPick.object.material[0].color.set(mapConfig.mapColor);

  //     const color = mapConfig.mapColorGradient[Math.floor(Math.random() * 4)]
  //     lastPick.object.material[0].color.set(color)
  //     lastPick.object.material[0].opacity = mapConfig.mapOpacity // 设置完全不透明
  //   }
  //   lastPick = null
  //   // lastPick = intersects.find(
  //   //   (item: any) => item.object.material && item.object.material.length === 2
  //   // );
  //   // 优化
  //   lastPick = intersects.find(
  //     (item: any) => item.object.userData.isChangeColor,
  //   )

  //   if (lastPick) {
  //     const properties = lastPick.object.parent.customProperties
  //     if (lastPick.object.material[0]) {
  //       lastPick.object.material[0].color.set(mapConfig.mapHoverColor)
  //       lastPick.object.material[0].opacity = 1 // 设置完全不透明
  //     }

  //     //   if (toolTipRef.current && toolTipRef.current.style) {
  //     //     toolTipRef.current.style.left = e.clientX + 2 + "px";
  //     //     toolTipRef.current.style.top = e.clientY + 2 + "px";
  //     //     toolTipRef.current.style.visibility = "visible";
  //     //   }
  //     //   setToolTipData({
  //     //     text: properties.name,
  //     //   });
  //     // } else {
  //     //   toolTipRef.current.style.visibility = "hidden";
  //     // }
  //   }

  //   // 鼠标双击事件
  //   // const onDblclickEvent = () => {
  //   //   const intersects = raycaster.intersectObjects(scene.children);
  //   //   const target = intersects.find(
  //   //     (item: any) => item.object.userData.isChangeColor
  //   //   );
  //   //   if (target) {
  //   //     const obj: any = target.object.parent;
  //   //     const p = obj.customProperties;
  //   //     dblClickFn(p);
  //   //   }
  // }

  /**
   * 动画
   */
  gsap.to(mapObject3D.scale, {
    x: mapScale,
    y: mapScale,
    z: 1,
    duration: 1,
  })

  /**
   * Animate
   */
  const clock = new THREE.Clock()
  // let previousTime = 0
  const animate = function () {
    // const elapsedTime = clock.getElapsedTime();
    // const deltaTime = elapsedTime - previousTime;
    // previousTime = elapsedTime;

    // Update mixer
    // mixer?.update(deltaTime);
    const delta = clock.getDelta()
    modelMixer.map((item: any) => item.update(delta))

    requestAnimationFrame(animate)
    // 通过摄像机和鼠标位置更新射线
    raycaster.setFromCamera(pointer, camera)
    renderer.render(scene, camera)
    labelRenderer.render(scene, camera)

    // 圆环
    spotList.forEach((mesh: any) => {
      mesh._s += 0.01
      mesh.scale.set(1 * mesh._s, 1 * mesh._s, 1 * mesh._s)
      if (mesh._s <= 2) {
        mesh.material.opacity = 2 - mesh._s
      } else {
        mesh._s = 1
      }
    })

    // 飞行的圆点
    // flySpotList.forEach(function (mesh: any) {
    //   mesh._s += 0.003
    //   let tankPosition = new THREE.Vector3()
    //   // getPointAt() 根据弧长在曲线上的位置。必须在范围[0，1]内。
    //   tankPosition = mesh.curve.getPointAt(mesh._s % 1)
    //   mesh.position.set(tankPosition.x, tankPosition.y, tankPosition.z)
    // })
  }
  animate()

  // window.addEventListener("resize", onResizeEvent, false)
  // window.addEventListener("mousemove", onMouseMoveEvent, false)
  // // window.addEventListener("dblclick", onDblclickEvent, false);

  // return () => {
  //   window.removeEventListener("resize", onResizeEvent)
  //   window.removeEventListener("mousemove", onMouseMoveEvent)
  //   // window.removeEventListener("dblclick", onDblclickEvent);
  // }
})
</script>

<template>
  <div class="relative h-screen w-full">
    <div ref="map2DRef"></div>
    <div
      ref="mapRef"
      class="h-screen w-full"
    ></div>
  </div>
</template>

<style scoped lang="less"></style>
