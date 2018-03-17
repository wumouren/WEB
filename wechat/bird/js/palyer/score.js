import { DataStore } from "../base/dataStore.js";

export class Score {
  constructor(){
    this.cxt = DataStore.getInstace().cxt;
  }
  draw(){
    this.cxt.fillStyle = 'red'
    this.cxt.font = '30px "微软雅黑"';
    this.cxt.fillText(
      DataStore.getInstace().score,
      DataStore.getInstace().clientWidth / 2,
      DataStore.getInstace().clientHeight / 18
    )
  }
}