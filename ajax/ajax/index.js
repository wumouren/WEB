export default function ajax(options){
  /**
   * 默认为GET请求
   * 返回值类型默认为json
   * 默认为异步请求
  **/
  const queryData = {
    url: '',
    type: 'GET',
    dataType: 'json',
    async: true,
    data: {},
    header: {},
    success: function(){},
    fail: function(){}
  }
  options = options || queryData;
  options.data = getParams(options);
  /**
   * 创建一个 ajax请求
   * W3C标准和IE标准
   */
  let xhr;
  if (window.XMLHttpRequest){
      xhr = new XMLHttpRequest();
  }else{
      xhr = new ActiveXObject('Microsoft.XMLHTTP')
  }

  /**
   * 发送请求
   */
  if (options.type == 'GET'){
      xhr.open("GET",options.url + '?' + options.data ,options.async);
      xhr.send(null)
  }else if (options.type == 'POST'){
      xhr.open('POST',options.url,options.async);
      // POST请求设置请求头
      xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
      xhr.send(options.data);
  }
  /**
   * callback
   */
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
}

/**
* 对象参数的处理
* @param data
* @returns {string}
*/
function getParams(option) {
  const queryData = option.data || {};
  let arr = [];
  for (let key in queryData){
    arr.push(encodeURIComponent(key) + '=' +encodeURIComponent(queryData[key]));
  }
  option.proxy ? arr.push('proxy=' + option.proxy) : '';
  const params = arr.join('&');
  return params;
}