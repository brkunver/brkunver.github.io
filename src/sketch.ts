import p5 from "p5"
import Wolf from "./wolf"

const margin = 32

const sketch = (p: p5) => {
  let wolf: Wolf

  p.setup = () => {
    let canvas = p.createCanvas(p.windowWidth, p.windowHeight)
    canvas.position(0, 0)
    canvas.style("z-index", "9999")
    canvas.style("position", "fixed")
    canvas.style("pointer-events", "none")

    wolf = new Wolf(p, p.createVector(p.width / 2, p.height / 2))
    p.frameRate(60)
  }

  p.draw = () => {
    p.clear()

    // calculate the distance between the mouse and wolf's position
    let distanceX = Math.abs(p.mouseX - wolf.position.x)
    let distanceY = Math.abs(p.mouseY - wolf.position.y)

    if (distanceX > margin || distanceY > margin) {
      if (p.mouseX > wolf.position.x + margin) {
        wolf.isMoving = true
        // right down movement
        if (p.mouseY > wolf.position.y + margin) {
          wolf.direction = "dr"
          wolf.position.x += 2
          wolf.position.y += 2
        }
        // right up movement
        else if (p.mouseY < wolf.position.y - margin) {
          wolf.direction = "ur"
          wolf.position.x += 2
          wolf.position.y -= 2
        } else {
          wolf.direction = "r"
          wolf.position.x += 2
        }
      }

      // check left movement
      else if (p.mouseX < wolf.position.x - margin) {
        wolf.isMoving = true

        // left down movement
        if (p.mouseY > wolf.position.y + margin) {
          wolf.direction = "dl"
          wolf.position.x -= 2
          wolf.position.y += 2
        }
        // left up movement
        else if (p.mouseY < wolf.position.y - margin) {
          wolf.direction = "ul"
          wolf.position.x -= 2
          wolf.position.y -= 2
        } else {
          wolf.direction = "l"
          wolf.position.x -= 2
        }
      }

      // up movement
      else if (p.mouseX < wolf.position.x + margin && p.mouseX > wolf.position.x - margin) {
        if (p.mouseY < wolf.position.y - margin) {
          wolf.isMoving = true
          wolf.direction = "u"
          wolf.position.y -= 2
        }
        // down movement
        else if (p.mouseY > wolf.position.y + margin) {
          wolf.isMoving = true
          wolf.direction = "d"
          wolf.position.y += 2
        }
      }
    }

    // wolf is not moving
    else {
      wolf.direction = "idle"
      wolf.isMoving = false
    }

    wolf.draw()
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight)
  }
}

new p5(sketch)
