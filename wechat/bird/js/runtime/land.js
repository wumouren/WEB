import { Spriter } from "../base/spriter.js";
import { DataStore } from "../base/dataStore.js";

export class Land extends Spriter {
  constructor(){
    const img = Spriter.getImg('land');
    super(img,0,0,
      img.width,img.height,
      0,DataStore.getInstace().clientHeight-img.height,
      img.width,img.height);
      this.DataStore = DataStore.getInstace();
      this.landX = 0;
  }
  draw(){
    this.landX = this.landX + this.DataStore.moveSpeed;
    if(this.landX > this.img.width - this.DataStore.clientWidth){
      this.landX = 0
    }
    super.draw(
      this.img,this.imgX,this.imgY,
      this.imgW,this.imgH,
      -this.landX,this.y,
      this.width,this.height,
    )
  }
}