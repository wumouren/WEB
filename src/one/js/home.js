import '../less/home.less';
import '../html/home.html';
import config from './public/config';
import $ from 'jQuery';

$(function () {
    $.ajax({
        url: "/data/data.json",
        type: "get",
        data: {},
        dataType: "json",
    }).then(function (jsonData) {
        let nameStr = '<div class="item">姓名</div>';
        let telStr = '<div class="item">电话</div>';
        let emailStr = '<div class="item">邮箱</div>';
        jsonData.forEach(function(item){
            nameStr += '<div class="item">'+ item.user +'</div>'
            emailStr += '<div class="item">'+ item.email +'</div>'
            telStr += '<div class="item">'+ item.tel +'</div>';
            
        })
        $('#name').html(nameStr);
        $('#tel').html(telStr);
        $('#email').html(emailStr);
    })
});
console.log('1231dsadaddddds')
