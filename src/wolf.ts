import p5 from "p5";

class Wolf{

  position : p5.Vector
  
  constructor(posiition : p5.Vector){
    this.position = posiition
  }

  draw(p : p5){
    p.ellipse(this.position.x, this.position.y, 20, 20)
  }

}