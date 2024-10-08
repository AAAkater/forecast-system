import * as THREE from "three"
import { Line2 } from "three/examples/jsm/lines/Line2.js"
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js"
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js"
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js"
import { mapConfig } from "./mapConfig"
import type { LabelDataObject } from "./typed"

// 绘制材质
export function drawExtrudeMesh(
  point: [number, number][],
  projectionFn: any,
): any {
  const shape = new THREE.Shape()
  const pointsArray = []

  for (let i = 0; i < point.length; i++) {
    const [x, y]: any = projectionFn(point[i]) // 将每一个经纬度转化为坐标点
    if (i === 0) {
      shape.moveTo(x, -y)
    }
    shape.lineTo(x, -y)
    pointsArray.push(x, -y, mapConfig.topLineZIndex)
  }

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: mapConfig.mapDepth, // 挤出的形状深度
    bevelEnabled: false, // 对挤出的形状应用是否斜角
  })

  const material = new THREE.MeshBasicMaterial({
    color: mapConfig.mapColor,
    // color: mapConfig.mapColorGradient[Math.floor(Math.random() * 4)],
    transparent: mapConfig.mapTransparent,
    opacity: mapConfig.mapOpacity,
  })

  const materialSide = new THREE.ShaderMaterial({
    uniforms: {
      color1: {
        value: new THREE.Color(mapConfig.mapSideColor1),
      },
      color2: {
        value: new THREE.Color(mapConfig.mapSideColor2),
      },
    },
    vertexShader: `
      varying vec3 vPosition;
      void main() {
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 color1;
      uniform vec3 color2;
      varying vec3 vPosition;
      void main() {
        vec3 mixColor = mix(color1, color2, 0.5 - vPosition.z * 0.2); // 使用顶点坐标 z 分量来控制混合
        gl_FragColor = vec4(mixColor, 1.0);
      }
    `,
    //   wireframe: true,
  })

  const mesh: any = new THREE.Mesh(geometry, [material, materialSide])
  // userData 存储自定义属性
  mesh.userData = {
    isChangeColor: true,
  }

  // 边框线，赋值空间点坐标，3个一组
  const lineGeometry = new LineGeometry()
  lineGeometry.setPositions(pointsArray)

  const lineMaterial = new LineMaterial({
    color: mapConfig.topLineColor,
    linewidth: mapConfig.topLineWidth,
  })
  lineMaterial.resolution.set(window.innerWidth, window.innerHeight)
  const line = new Line2(lineGeometry, lineMaterial)

  return { mesh, line }
}
// 地图缩放
export function getDynamicMapScale(
  mapObject3D: THREE.Object3D,
  containerRef: HTMLElement,
) {
  const width = containerRef.clientWidth
  const height = containerRef.clientHeight
  const refArea = width * height

  const boundingBox = new THREE.Box3().setFromObject(mapObject3D)
  // 获取包围盒的尺寸
  const size = new THREE.Vector3()
  boundingBox.getSize(size)
  // 新增 Math.random避免缩放为1，没有动画效果
  const scale =
    Math.round(Math.sqrt(refArea / (size.x * size.y * 400))) +
    parseFloat((Math.random() + 0.5).toFixed(2))
  return scale
}

function draw2dLabel(coord: [number, number], provinceName: string) {
  if (coord && coord.length) {
    // 模版字符串
    const innerHTML = `<div style="color: #fff">${provinceName}</div>`
    const labelDiv = document.createElement("div")
    labelDiv.innerHTML = innerHTML
    labelDiv.style.pointerEvents = "none" // 禁用事件
    // console.log(provinceName)
    const labelObject = new CSS2DObject(labelDiv)
    labelObject.position.set(coord[0], -coord[1], mapConfig.label2dZIndex)
    return labelObject
  }
}

export function generateMapLabel2D(labelData: LabelDataObject) {
  const labelObject2D = new THREE.Object3D()
  Object.entries(labelData).forEach(([provinceName, centerCoord]) => {
    const labelObjectItem = draw2dLabel(centerCoord, provinceName)
    if (labelObjectItem) {
      labelObject2D.add(labelObjectItem)
    }
  })
  return labelObject2D
}

// 绘制圆点
export const drawSpot = (coord: [number, number]) => {
  if (coord && coord.length) {
    /**
     * 绘制圆点
     */
    const spotGeometry = new THREE.CircleGeometry(0.2, 200)
    const spotMaterial = new THREE.MeshBasicMaterial({
      color: "#3EC5FB",
      side: THREE.DoubleSide,
    })
    const circle = new THREE.Mesh(spotGeometry, spotMaterial)
    circle.position.set(coord[0], -coord[1], mapConfig.spotZIndex)

    // 圆环
    const ringGeometry = new THREE.RingGeometry(0.2, 0.3, 50)
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: "#3FC5FB",
      side: THREE.DoubleSide,
      transparent: true,
    })
    const ring = new THREE.Mesh(ringGeometry, ringMaterial)
    ring.position.set(coord[0], -coord[1], mapConfig.spotZIndex)
    return { circle, ring }
  }
}

//线上移动物体
export const drawFlySpot = (curve: any) => {
  const aGeo = new THREE.SphereGeometry(0.2)
  const aMater = new THREE.MeshBasicMaterial({
    color: "#77f077",
    side: THREE.DoubleSide,
  })
  const aMesh: any = new THREE.Mesh(aGeo, aMater)
  // 保存曲线实例
  aMesh.curve = curve
  aMesh._s = 0
  return aMesh
}

// 绘制两点链接飞线
export const drawLineBetween2Spot = (
  coordStart: [number, number],
  coordEnd: [number, number],
) => {
  const [x0, y0, z0] = [...coordStart, mapConfig.spotZIndex]
  const [x1, y1, z1] = [...coordEnd, mapConfig.spotZIndex]
  // 使用 QuadraticBezierCurve3 创建 三维二次贝塞尔曲线
  const curve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(x0, -y0, z0),
    new THREE.Vector3((x0 + x1) / 2, -(y0 + y1) / 2, 20),
    new THREE.Vector3(x1, -y1, z1),
  )

  const flySpot = drawFlySpot(curve)

  const lineGeometry = new THREE.BufferGeometry()
  // 获取曲线上50个点
  const points = curve.getPoints(50)
  const positions = []
  const colors = []
  const color = new THREE.Color()

  // 给每个顶点设置演示 实现渐变
  for (let j = 0; j < points.length; j++) {
    color.setHSL(0.21 + j, 0.77, 0.55 + j * 0.0025) // 色
    colors.push(color.r, color.g, color.b)
    positions.push(points[j].x, points[j].y, points[j].z)
  }
  // 放入顶点 和 设置顶点颜色
  lineGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(positions), 3, true),
  )
  lineGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(new Float32Array(colors), 3, true),
  )

  const material = new THREE.LineBasicMaterial({
    vertexColors: true,
    // color: "red",
    side: THREE.DoubleSide,
  })
  const flyLine = new THREE.Line(lineGeometry, material)

  return { flyLine, flySpot }
}
