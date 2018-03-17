import { DataStore } from "./dataStore.js";

export class Spriter {
  static getImg(key){
    return DataStore.getInstace().res.get(key);
  }
  constructor(img = null, imgX = 0, imgY = 0, imgW = 0, imgH = 0, x = 0, y = 0, width = 0, height = 0) {
    this.DataStore = DataStore.getInstace(); 
    this.cxt = this.DataStore.cxt;
    this.img = img;
    this.imgX = imgX;
    this.imgY = imgY;
    this.imgW = imgW;
    this.imgH = imgH;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  draw(
    img = this.img,
    imgX = this.imgX,imgY = this.imgY,
    imgW = this.imgW,imgH = this.imgH,
    x = this.x, y = this.y,
    width = this.width,height = this.height,
  ) {
    this.cxt.drawImage(
      img,
      imgX,imgY,
      imgW,imgH,
      x,y,
      width,height,
    )
  }
}