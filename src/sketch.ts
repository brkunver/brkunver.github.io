import p5 from "p5"
import Wolf from "./wolf"

const sketch = (p: p5) => {
  let wolf: Wolf

  p.setup = () => {
    let canvas = p.createCanvas(p.windowWidth, p.windowHeight)
    canvas.position(0, 0)
    canvas.style("z-index", "-1")
    canvas.style("position", "fixed")

    wolf = new Wolf(p, p.createVector(p.width / 2, p.height / 2))
    p.frameRate(60)
  }

  p.draw = () => {
    p.clear()
    p.fill(0, 100, 100)
    p.ellipse(p.mouseX, p.mouseY, 80, 80)
    wolf.draw()
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight)
  }
}

new p5(sketch)
