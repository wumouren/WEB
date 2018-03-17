import { Pencil } from "./pencil.js";
import { Spriter } from "../base/spriter.js";
import { DataStore } from "../base/dataStore.js";

export class DownPencil extends Pencil{
  constructor(top){
    const img = Spriter.getImg('pieDown');
    super(img,top);
  }
  draw(){
    this.y = this.top + DataStore.getInstace().penSpace;
    super.draw()
  }
}