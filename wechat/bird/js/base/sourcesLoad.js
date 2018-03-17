import { Sources }from './sources.js';
export class SourcesLoad {
  constructor(){
    this.map = new Map(Sources)
    for(let [key,val] of this.map){
      const img = wx.createImage();
      img.src = val 
      this.map.set(key,img)
    }
  }

  onloader(callBack){
    let count = 0;
    for(let val of this.map.values()){
      val.onload = () => {
        count ++;
        if(count == this.map.size){
          callBack(this.map)
        }
      }
    }
  }

  static creatSource(){
    return new SourcesLoad()
  }
}