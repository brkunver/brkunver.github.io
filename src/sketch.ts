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

    // calculate the distance between the mouse and wolf's position
    let distanceX = Math.abs(p.mouseX - wolf.position.x)
    let distanceY = Math.abs(p.mouseY - wolf.position.y)

    
    if (distanceX > 48 || distanceY > 48) {
      wolf.isMoving = true
      if (distanceX > 48 && distanceY < 48) {
        if (p.mouseX > wolf.position.x) {
          wolf.direction = "r"
          wolf.position.x += 1
        } else if (p.mouseX < wolf.position.x) {
          wolf.direction = "l"
          wolf.position.x -= 1
        }
      }
    }

    // wolf is not moving
    else {
      wolf.direction = "idle"
      wolf.isMoving = false
    }

    wolf.draw()
    console.log("distance x => " , distanceX)
    console.log("distance y => " , distanceY)
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight)
  }
}

new p5(sketch)
