import { SourcesLoad } from '../base/sourcesLoad.js'
import { Director } from '../director.js';
import { BackGround } from '../runtime/backGround.js';
import { DataStore } from '../base/dataStore.js';
import { Land } from '../runtime/land.js';
import { Bird } from './bird.js';
import { StartButton } from './startButton.js';
import { Score } from './score.js';

export class Main {
  constructor(){
    this.canvas = wx.createCanvas();
    this.cxt = this.canvas.getContext('2d');
    this.dataStore = DataStore.getInstace();

    const loader = SourcesLoad.creatSource();
    loader.onloader(map => this.creatFristSource(map));
    this.director = Director.getInstance();
  }
  creatFristSource(map){
    this.dataStore.cxt = this.cxt;
    this.dataStore.res = map;
    this.init()
  }
  init(){
    this.dataStore.init();
    this.dataStore.isGameOver = false;
    this.dataStore
      .put('background', BackGround)
      .put('pencils',[])
      .put('land',Land)
      .put('birds',Bird)
      .put('startButton',StartButton)
      .put('score',Score);
    
    this.dataStore.isInit ?  this.listerEvent() : '';
    this.director.createPencil();  
    this.director.run()  
  }

  listerEvent(){
    this.dataStore.isInit = false;  
    wx.onTouchStart(() => {
      if (this.dataStore.isGameOver) {
        console.log('游戏开始');
        this.init();
      } else {
        this.director.birdsEvent();
      }
    });
  }
}