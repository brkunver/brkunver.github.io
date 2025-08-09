import p5 from "p5"
import Wolf from "./wolf"
import { createLocalStorageObserver } from "./utils/storageObserver"

const wolfStatus = createLocalStorageObserver<boolean>("isWolfActive")
const margin = 32
const currentWolfStatus = wolfStatus.get()
if (currentWolfStatus == null) {
  wolfStatus.set(true)
}

let wolfInstance: p5 | null = null

const sketch = (p: p5) => {
  let wolf: Wolf

  p.setup = () => {
    let canvas = p.createCanvas(p.windowWidth, p.windowHeight)
    canvas.position(0, 0)
    canvas.style("z-index", "9999")
    canvas.style("position", "fixed")
    canvas.style("pointer-events", "none")

    wolf = new Wolf(
      p,
      p.createVector(
        p.random(10, p.width - 10),
        p.random(10, p.height - 10)
      )
    )

    p.frameRate(60)
  }

  p.draw = () => {
    p.clear()

    let distanceX = Math.abs(p.mouseX - wolf.position.x)
    let distanceY = Math.abs(p.mouseY - wolf.position.y)

    if (distanceX > margin || distanceY > margin) {
      if (p.mouseX > wolf.position.x + margin) {
        wolf.isMoving = true
        if (p.mouseY > wolf.position.y + margin) {
          wolf.direction = "dr"
          wolf.position.x += 2
          wolf.position.y += 2
        } else if (p.mouseY < wolf.position.y - margin) {
          wolf.direction = "ur"
          wolf.position.x += 2
          wolf.position.y -= 2
        } else {
          wolf.direction = "r"
          wolf.position.x += 2
        }
      } else if (p.mouseX < wolf.position.x - margin) {
        wolf.isMoving = true
        if (p.mouseY > wolf.position.y + margin) {
          wolf.direction = "dl"
          wolf.position.x -= 2
          wolf.position.y += 2
        } else if (p.mouseY < wolf.position.y - margin) {
          wolf.direction = "ul"
          wolf.position.x -= 2
          wolf.position.y -= 2
        } else {
          wolf.direction = "l"
          wolf.position.x -= 2
        }
      } else if (
        p.mouseX < wolf.position.x + margin &&
        p.mouseX > wolf.position.x - margin
      ) {
        if (p.mouseY < wolf.position.y - margin) {
          wolf.isMoving = true
          wolf.direction = "u"
          wolf.position.y -= 2
        } else if (p.mouseY > wolf.position.y + margin) {
          wolf.isMoving = true
          wolf.direction = "d"
          wolf.position.y += 2
        }
      }
    } else {
      wolf.direction = "idle"
      wolf.isMoving = false
    }

    wolf.draw()
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight)
  }
}

wolfStatus.subscribe((isActive) => {
  if (isActive) {
    if (!wolfInstance) {
      wolfInstance = new p5(sketch)
    }
  } else {
    if (wolfInstance) {
      wolfInstance.remove() 
      wolfInstance = null
    }
  }
})
