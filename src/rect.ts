import p5 from "p5"

class Rect {
  x: number
  y: number
  w: number
  h: number

  constructor(x: number, y: number, w: number, h: number) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }

  draw(p: p5) {
    p.rect(this.x, this.y, this.w, this.h)
  }

}


export default Rect