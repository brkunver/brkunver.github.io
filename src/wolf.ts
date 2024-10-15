import p5 from "p5"

class Wolf {
  p5: p5
  position: p5.Vector
  down_sprites_paths: Array<string> = [
    "assets/wolf/down/d0.png",
    "assets/wolf/down/d1.png",
    "assets/wolf/down/d2.png",
    "assets/wolf/down/d3.png",
    "assets/wolf/down/d4.png",
    "assets/wolf/down/d5.png",
  ]
  direction: "u" | "d" | "l" | "r" | "ul" | "ur" | "dl" | "dr" | "idle" = "idle"
  isMoving: boolean = false

  // Animasyon frame index ve yüklenmiş sprite'lar
  spriteImages: Array<p5.Image> = []
  frameIndex: number = 0
  frameDelay: number = 5 // Her 5 frame'de bir sprite değişecek
  frameCounter: number = 0

  constructor(p5: p5, position: p5.Vector) {
    this.p5 = p5
    this.position = position

    this.down_sprites_paths.forEach((path) => {
      this.spriteImages.push(this.p5.loadImage(path))
    })
  }

  draw() {
    if (this.frameCounter % this.frameDelay === 0) {
      // Sonraki sprite'a geç
      this.frameIndex = (this.frameIndex + 1) % this.spriteImages.length
    }
    this.frameCounter++

    // Mevcut sprite'ı çiz
    this.p5.image(this.spriteImages[this.frameIndex], this.position.x, this.position.y)
  }
}

export default Wolf
