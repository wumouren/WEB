import { DataStore } from "./base/dataStore.js";
import { UpPencil } from "./runtime/upPencil.js";
import { DownPencil } from "./runtime/downPencil.js";

export class Director {
  static getInstance(){
    if(!Director.instance){
      Director.instance = new Director();
    }
    return Director.instance;
  }
  constructor(){
    this.dataStore = DataStore.getInstace();
  }
  createPencil(){
    const minTop = this.dataStore.clientHeight / 8;
    const maxTop = this.dataStore.clientHeight / 2;
    const top = minTop + Math.random() * (maxTop - minTop);
    this.dataStore.get('pencils').push(new UpPencil(top));
    this.dataStore.get('pencils').push(new DownPencil(top));
  }

  
  birdsEvent(){
    console.log('sas') 
    for(let i = 0; i< 3;i++){
      this.dataStore.get('birds').birdY[i] -= this.dataStore.help;
    }
    this.dataStore.get('birds').time = 0;
  }


  // 碰撞校验
  check(){
    const land = this.dataStore.get('land');
    const birds = this.dataStore.get('birds');
    const pencils = this.dataStore.get('pencils');

    if(birds.y + birds.height >= land.y){
      this.dataStore.isGameOver = true;
      return;
    }

    // 边界建模
    const birdsBorder = {
      top: birds.y,
      bottom: birds.y + birds.height,
      left: birds.x,
      right: birds.x + birds.width
    }

    for(let i = 0;i<pencils.length;i++){
      const pencilBorder = {
        top: pencils[i].y,
        bottom: pencils[i].y + pencils[i].height,
        left: pencils[i].x,
        right: pencils[i].x + pencils[i].width
      }
      if(this.penCheck(birdsBorder,pencilBorder)){
        this.dataStore.isGameOver = true;
        return;
      }
    }

    // 加分逻辑
    if(birdsBorder.left > pencils[0].x + pencils[0].width && this.dataStore.isAddScore){ 
      this.dataStore.score ++;
      this.dataStore.isAddScore = false;
    }
  }

  penCheck(bird,pencil){
    let fly = false;
    if (bird.top > pencil.bottom || 
      bird.bottom < pencil.top || 
      bird.right < pencil.left || 
      bird.left > pencil.right) {
      fly = true;
    }
    return !fly;
  }
  
  run(){
    this.check();
    if(!this.dataStore.isGameOver){
      const pencils = this.dataStore.get('pencils');
      if(pencils[0].x < (this.dataStore.clientWidth / 2 - pencils[0].width / 2) && pencils.length === 2){
        this.createPencil();
      }
      if(pencils[0].x < - pencils[0].width && pencils.length === 4){
        pencils.shift()
        pencils.shift()
        this.dataStore.isAddScore = true;
      }
      this.dataStore.get('background').draw();
      pencils.forEach(item => {
        item.draw();
      })
      this.dataStore.get('land').draw();
      this.dataStore.get('birds').draw()
      this.dataStore.get('score').draw();
      const timer =  requestAnimationFrame(() => this.run());
      this.dataStore.put('timer',timer);
    }else{
      this.dataStore.get('startButton').draw()
      cancelAnimationFrame(this.dataStore.get('timer'))
      this.dataStore.destory()
    }
  }
}