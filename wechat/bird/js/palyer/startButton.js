import { Spriter } from "../base/spriter.js";
import { DataStore } from "../base/dataStore.js";

export class StartButton extends Spriter {
  constructor(){
    const img = Spriter.getImg('startButton');
    super(
      img,
      0,0,
      img.width,img.height,
      (DataStore.getInstace().clientWidth - img.width) / 2, DataStore.getInstace().clientHeight / 2.5,
      img.width,img.height,
    )
  }
  draw(){
    super.draw();
  }
}