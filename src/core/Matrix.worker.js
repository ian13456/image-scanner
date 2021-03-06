/* eslint-disable no-restricted-globals */
import PerspT from 'perspective-transform'

self.onmessage = function (e) {
  const {
    points: { topLeft, topRight, bottomLeft, bottomRight }
  } = e.data

  const dimW =
    (Math.sqrt((topLeft.x - topRight.x) ** 2 + (topLeft.y - topRight.y) ** 2) +
      Math.sqrt(
        (bottomRight.x - bottomLeft.x) ** 2 +
          (bottomRight.y - bottomLeft.y) ** 2
      )) /
    2
  const dimH =
    (Math.sqrt(
      (topLeft.x - bottomLeft.x) ** 2 + (topLeft.y - bottomLeft.y) ** 2
    ) +
      Math.sqrt(
        (bottomRight.x - topRight.x) ** 2 + (bottomRight.y - topRight.y) ** 2
      )) /
    2

  const srcCorners = [
    topLeft.x,
    topLeft.y,
    topRight.x,
    topRight.y,
    bottomRight.x,
    bottomRight.y,
    bottomLeft.x,
    bottomLeft.y
  ]
  const dstCorners = [0, 0, dimW, 0, dimW, dimH, 0, dimH]

  const perspT = PerspT(srcCorners, dstCorners)

  self.postMessage({ matrix: perspT, width: dimW, height: dimH })
}
