export class DataStore {
  static getInstace(){
    if(!DataStore.instance){
      DataStore.instance = new DataStore();
    }
    return DataStore.instance;
  }
  
  constructor(){
    this.map = new Map();
    this.isGameOver = false;
    this.moveSpeed = 2;
    this.penSpace = wx.createCanvas().height / 5;
    this.clientWidth = wx.createCanvas().width;
    this.clientHeight = wx.createCanvas().height;
    this.g = 0.98 / 2.4;
    this.up = 0.38;
    this.help = 30;
    this.score = 0;
    this.isAddScore = true;
    this.isInit = true;
  }
  init(){
    this.isAddScore = true;
    this.score = 0;
  }
  put(key,val){
    if(typeof val === 'function'){
      val = new val();
    }
    this.map.set(key,val);
    return this;
  }
  get(key){
    return this.map.get(key);
  }
  destory(){
    for(let val of this.map.values()){
      val = null;
    }
  }
}