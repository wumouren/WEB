import { Pencil } from "./pencil.js";
import { Spriter } from "../base/spriter.js";
export class UpPencil extends Pencil {
  constructor(top){
    const img = Spriter.getImg('pieUp');
    super(img,top);
  }
  draw(){
    this.y = this.top - this.height;
    super.draw()
  }
}