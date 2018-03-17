import { Spriter } from "../base/spriter.js";
import { DataStore } from "../base/dataStore.js";

export class Bird extends Spriter {
  constructor(){
    const img = Spriter.getImg('birds');
    super(
      img,0,0,
      img.width,img.height,
      0,0,
      img.width,img.height
    )
    this.img = img;
    this.placeX = [9,9+34+18,9+34+18+34+18]
    this.placeY = [10,10,10];
    this.placeW = [34,34,34];
    this.placeH = [24,24,24];
    const birdX = DataStore.getInstace().clientWidth / 4;
    const birdY = DataStore.getInstace().clientHeight / 2;
    this.birdX = [birdX,birdX,birdX];
    this.birdY = [birdY,birdY,birdY];
    this.num = 0;
    this.index = 0;
    this.time = 0;
  }

  draw(){
    const speed = 0.2
    this.time ++;

    this.num = this.index >= 2 ? this.num = 0 :  this.num += speed;
    this.index = this.num;
    this.index = Math.floor(this.index);
    this.imgX = this.placeX[this.index];
    this.imgY = this.placeY[this.index];
    this.width = this.placeW[this.index];
    this.height = this.placeH[this.index];
    this.width = this.placeW[this.index];
    this.height = this.placeH[this.index];
    this.x = this.birdX[this.index];
    this.y = this.birdY[this.index];
    
    // 重力加速度
    const downBird = DataStore.getInstace().g * this.time * this.time / 2;

    // 小鸟飞翔的升力
    const upBird = DataStore.getInstace().up * this.time * this.time / 2;
    
    const offsetY = upBird - downBird;
    for(let i = 0; i< 3;i++){
      this.birdY[i] = this.birdY[i] - offsetY;
    }

    super.draw(
      this.img,
      this.imgX, this.imgY,
      this.width, this.height,
      this.x, this.y,
      this.width, this.height
    );
  }
}