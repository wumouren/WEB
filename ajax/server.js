const express = require('express');
const { exec } = require('child_process');
exec('node client');
express()
  .get('/proxy',(req,res)=>{
    res.send({ info : '服务端调用，不存在跨域问题，说明跨域是浏览器限制，不是后台服务限制' })
  })
  .get('/jsonp',(req,res) => {
    res.set('Content-Type','application/javascript');
    res.send(`${req.query.callback}({ info : '通过 jsonp 来解决跨域问题，原理是利用跨域请求的产生条件之一，即必须是 xhr 请求' })`)
  })
  .get('/all',(req,res) => {
    res.set('Access-Control-Allow-Origin',req.headers.origin);
    res.send({ info : '通过在请求头中设置 Access-Control-Allow-Origin 来告诉浏览器：允许所有的跨域请求'})
  })
  .all('*',(req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'token');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header('Access-Control-Max-Age', 3600);
    if (req.method == 'OPTIONS') {
      res.send(200); 
    } else {
      next();
    }
  })
  .get('/addHeader',(req,res) => {
    res.send({ info : '增加了自定义请求头的非简单请求'})
  })
  .listen(8082,console.log('client run port 8081 \n server run port 8082'))