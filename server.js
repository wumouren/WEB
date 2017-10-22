const express = require('express');
const body = require('body-parser') // 中间件
const fs = require('fs'); // 文件读写模块

express()
    .all('*', function(req, res, next) { // 设置跨域请求
        res.header("Access-Control-Allow-Origin", "*");  
        res.header("Access-Control-Allow-Headers", "X-Requested-With");  
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
        res.header("X-Powered-By",' 3.2.1')  
        res.header("Content-Type", "application/json;charset=utf-8");  
        next();  
    })  
    .use(body.urlencoded({ extended: false })) // 中间件
    .post('/signin',function(req,res){
        if(req.body.user && req.body.pwd && req.body.tel && req.body.email){ // 重新检验注册信息
            fs.readFile('./src/data/data.json','utf-8',function(err,data){ // 读取 data.json
                if(!err){
                    let jsonData = [];
                    if (data !== "") {
                        jsonData = JSON.parse(data);
                    }
                    jsonData.push(req.body)
                    fs.writeFile('./src/data/data.json', JSON.stringify(jsonData), function (err) { // 重写 data.json
                        if (!err){
                            res.send({
                                info: "注册成功",
                                data: jsonData
                            })
                        } else {
                            res.send({
                                info: "系统出错"
                            })
                        }
                    });
                } else {
                    res.send({
                        info: "系统出错"
                    })
                }
            })
        } else {
            res.send({
                info: "信息有误"
            })
        }
    })
    .post('/signup',function(req,res){
        if(req.body.user && req.body.pwd){ // 重新检验登录信息
            fs.readFile('./src/data/data.json','utf-8',function(err,data){ // 读取 data.json
                if(!err){
                    let jsonData = [];
                    if (data !== "") {
                        jsonData = JSON.parse(data);
                    }
                    let result = false;
                    for(const item of jsonData){
                        if(item.user === req.body.user && item.pwd === req.body.pwd){
                            result = true;
                        }
                    }
                    if(result){
                        res.send({
                            info: "登录成功",
                            data: jsonData
                        })
                    } else {
                        res.send({
                            info: "登录失败",
                            data: jsonData
                        })
                    }
                } else {
                    res.send({
                        info: "系统出错"
                    })
                }
            })
        } else {
            res.send({
                info: "信息有误"
            })
        }
    })
    .listen(8081,function(){
        console.log('-------------- server star localhost:8081 ----------------')
    })