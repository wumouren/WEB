import { Spriter } from "../base/spriter.js";
import { DataStore } from "../base/dataStore.js";

export class Pencil extends Spriter{
  constructor(img,top){
    super(
      img,
      0,0,
      img.width,img.height,
      DataStore.getInstace().clientWidth,0,
      img.width,img.height,
    )
    this.top = top;
    this.img = img;
  }
  draw(){
    this.x = this.x - DataStore.getInstace().moveSpeed;
    super.draw()
  }
}