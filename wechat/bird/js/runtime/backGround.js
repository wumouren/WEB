import { Spriter } from '../base/spriter.js'
import { DataStore } from '../base/dataStore.js';
export class BackGround extends Spriter{
  constructor(){
    const img = Spriter.getImg('background');
    super(img,0,0,img.width,img.height,0,0,DataStore.getInstace().clientWidth,DataStore.getInstace().clientHeight)
  }
}