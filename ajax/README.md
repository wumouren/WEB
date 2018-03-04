## 整理 Ajax 相关内容

### 示例代码启动命令  
#### npm i
#### npm run start

### 项目目录介绍  
#### ajax 简易 Ajax 及 jsonp 封装
#### public 静态资源文件夹
#### index.html 前端静态页面  
#### client.js 提供客户端服务    
#### server.js 模拟后台服务，响应接口调用  
*****

关于 ajax 的相关内容，几乎一直是面试中的必考题，在看了慕课网中关于 ajax 跨域的全面讲解之后，加深了自己对 ajax 跨域的理解，结合自己以往的经验，做出了下面学习笔记。视频连接请[点击这里](https://www.imooc.com/learn/947)。再次感谢晓风清老师的讲解。

### Ajax
Ajax 不是一种编程语言，而是一种在无需重新加载整个网页的情况下，能够更新部分网页的技术。它的出现大大优化了用户体验。所有现代浏览器（IE7+、Firefox、Chrome、Safari 以及 Opera）均内建 XMLHttpRequest 对象（IE5 和 IE6 使用 ActiveXObject）。

使用 Ajax 与后台服务建立通信大致可分为以下三步：

1、实例化 XMLHttpRequest（或 ActiveXObject）对象
  ```
  let xhr;
  if (window.XMLHttpRequest){
      xhr = new XMLHttpRequest();
  }else{
      xhr = new ActiveXObject('Microsoft.XMLHTTP')
  }
  ```
2、发送请求
```
  if (options.type == 'GET'){
      xhr.open("GET",options.url + '?' + options.data ,options.async);
      xhr.send(null)
  }else if (options.type == 'POST'){
      xhr.open('POST',options.url,options.async);
      // POST请求设置请求头
      xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
      xhr.send(options.data);
  }
```
> open 方法规定请求的类型、URL 以及是否异步处理请求等信息。
> send 方法来向后台发送一个请求，在 post 请求中，我们将请求数据作为 send 方法的参数发送个后台。
> setRequestHeader 方法用来设置请求头信息。
3、监听状态码，请求结束后通过回调函数来处理返回数据。
```
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4){
        var status = xhr.status;
        if (status >= 200 && status < 300 ){
            options.success && options.success(JSON.parse(xhr.responseText));
        }else{
            options.fail && options.fail(status);
        }
    }
  }
```
以上，便完成了前后端的数据交互，[在这里]()，我做了一个简易的 ajax 封装。



