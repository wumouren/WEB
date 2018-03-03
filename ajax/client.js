const express = require('express');
const request = require('request');
const fs = require('fs')
express()
  /**
   * '/public/*' '/ajax/*' 静态资源服务,简易模拟 express.static 中间件
   */
  .get('/public/*',(req,res)=>{
    fs.readFile(__dirname + req.path, 'utf-8' , (err, data) => {
      if(err) return console.log(err);
      res.set('Content-Type','application/javascript');
      res.send(data);
    });
  })
  .get('/ajax/*',(req,res)=>{
    fs.readFile(__dirname + req.path, 'utf-8' , (err, data) => {
      if(err) return console.log(err);
      res.set('Content-Type','application/javascript');
      res.send(data);
    });
  })
  .get('/',(req,res)=>{
    fs.readFile('./index.html', 'utf-8' , (err, data) => {
      if(err) return console.log(err);
      res.send(data)
    });
  })
  .get('/proxy',(req,res) => {
    request(req.query.proxy, function (error, response, body) {
      res.send(body);
    });
  })
  .listen(8081,() => {
    const c = require('child_process');
    c.exec('start http://127.0.0.1:8081');
  })