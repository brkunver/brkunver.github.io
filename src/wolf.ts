import p5 from "p5"

class Wolf {
  p: p5
  position: p5.Vector
  down_sprites_paths: Array<string> = [
    "assets/wolf/down/d0.png",
    "assets/wolf/down/d1.png",
    "assets/wolf/down/d2.png",
    "assets/wolf/down/d3.png",
    "assets/wolf/down/d4.png",
    "assets/wolf/down/d5.png",
  ]
  up_sprites_paths: Array<string> = [
    "assets/wolf/up/u0.png",
    "assets/wolf/up/u1.png",
    "assets/wolf/up/u2.png",
    "assets/wolf/up/u3.png",
    "assets/wolf/up/u4.png",
    "assets/wolf/up/u5.png",
  ]
  left_sprites_paths: Array<string> = [
    "assets/wolf/left/l0.png",
    "assets/wolf/left/l1.png",
    "assets/wolf/left/l2.png",
    "assets/wolf/left/l3.png",
    "assets/wolf/left/l4.png",
    "assets/wolf/left/l5.png",
  ]
  right_sprites_paths: Array<string> = [
    "assets/wolf/right/r0.png",
    "assets/wolf/right/r1.png",
    "assets/wolf/right/r2.png",
    "assets/wolf/right/r3.png",
    "assets/wolf/right/r4.png",
    "assets/wolf/right/r5.png",
  ]
  upleft_sprites_paths: Array<string> = [
    "assets/wolf/upleft/ul0.png",
    "assets/wolf/upleft/ul1.png",
    "assets/wolf/upleft/ul2.png",
    "assets/wolf/upleft/ul3.png",
    "assets/wolf/upleft/ul4.png",
    "assets/wolf/upleft/ul5.png",
  ]
  upright_sprites_paths: Array<string> = [
    "assets/wolf/upright/ur0.png",
    "assets/wolf/upright/ur1.png",
    "assets/wolf/upright/ur2.png",
    "assets/wolf/upright/ur3.png",
    "assets/wolf/upright/ur4.png",
    "assets/wolf/upright/ur5.png",
  ]
  downleft_sprites_paths: Array<string> = [
    "assets/wolf/downleft/dl0.png",
    "assets/wolf/downleft/dl1.png",
    "assets/wolf/downleft/dl2.png",
    "assets/wolf/downleft/dl3.png",
    "assets/wolf/downleft/dl4.png",
    "assets/wolf/downleft/dl5.png",
  ]
  downright_sprites_paths: Array<string> = [
    "assets/wolf/downright/dr0.png",
    "assets/wolf/downright/dr1.png",
    "assets/wolf/downright/dr2.png",
    "assets/wolf/downright/dr3.png",
    "assets/wolf/downright/dr4.png",
    "assets/wolf/downright/dr5.png",
  ]

  idle_up_sprite_path: string = "assets/wolf/idle/idleup.png"
  idle_down_sprite_path: string = "assets/wolf/idle/idledown.png"

  direction: "u" | "d" | "l" | "r" | "ul" | "ur" | "dl" | "dr" | "idle" = "idle"
  isMoving: boolean = false

  downSpriteImages: Array<p5.Image> = []
  upSpriteImages: Array<p5.Image> = []
  leftSpriteImages: Array<p5.Image> = []
  rightSpriteImages: Array<p5.Image> = []
  upleftSpriteImages: Array<p5.Image> = []
  uprightSpriteImages: Array<p5.Image> = []
  downleftSpriteImages: Array<p5.Image> = []
  downrightSpriteImages: Array<p5.Image> = []

  idleUpSprite: p5.Image
  idleDownSprite: p5.Image

  frameIndex: number = 0
  frameDelay: number = 5
  frameCounter: number = 0

  constructor(p: p5, position: p5.Vector) {
    this.p = p
    this.position = position

    this.down_sprites_paths.forEach((path) => {
      this.downSpriteImages.push(this.p.loadImage(path))
    })

    this.up_sprites_paths.forEach((path) => {
      this.upSpriteImages.push(this.p.loadImage(path))
    })

    this.left_sprites_paths.forEach((path) => {
      this.leftSpriteImages.push(this.p.loadImage(path))
    })

    this.right_sprites_paths.forEach((path) => {
      this.rightSpriteImages.push(this.p.loadImage(path))
    })

    this.upleft_sprites_paths.forEach((path) => {
      this.upleftSpriteImages.push(this.p.loadImage(path))
    })

    this.upright_sprites_paths.forEach((path) => {
      this.uprightSpriteImages.push(this.p.loadImage(path))
    })

    this.downleft_sprites_paths.forEach((path) => {
      this.downleftSpriteImages.push(this.p.loadImage(path))
    })

    this.downright_sprites_paths.forEach((path) => {
      this.downrightSpriteImages.push(this.p.loadImage(path))
    })

    this.idleUpSprite = this.p.loadImage(this.idle_up_sprite_path)
    this.idleDownSprite = this.p.loadImage(this.idle_down_sprite_path)
  }

  draw() {
    let spriteImages = this.downSpriteImages
    this.p.imageMode(this.p.CENTER)
    if (this.direction === "u") {
      spriteImages = this.upSpriteImages
    } else if (this.direction === "l") {
      spriteImages = this.leftSpriteImages
    } else if (this.direction === "r") {
      spriteImages = this.rightSpriteImages
    } else if (this.direction === "ul") {
      spriteImages = this.upleftSpriteImages
    } else if (this.direction === "ur") {
      spriteImages = this.uprightSpriteImages
    } else if (this.direction === "dl") {
      spriteImages = this.downleftSpriteImages
    } else if (this.direction === "dr") {
      spriteImages = this.downrightSpriteImages
    } else if (this.direction === "idle") {
      spriteImages = [this.idleDownSprite]
    }

    if (!this.isMoving) {
      this.p.image(spriteImages[0], this.position.x, this.position.y, 48, 48)
    } else {
      if (this.frameCounter % this.frameDelay === 0) {
        // Sonraki sprite'a geç
        this.frameIndex = (this.frameIndex + 1) % spriteImages.length
      }
      this.frameCounter++

      // Mevcut sprite'ı çiz
      this.p.image(spriteImages[this.frameIndex], this.position.x - 24, this.position.y, 48, 48)
    }
  }
}

export default Wolf
