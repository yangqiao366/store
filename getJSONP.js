function getJSONP(url,callback){
    if(!url){
        return;
    }
    // 声明数组用来随机生成函数名
    var a = ['a','b','c','d','e','f','g','i','h','j'],
        r1 = Math.floor(Math.random()*10),
        r2 = Math.floor(Math.random()*10),
        r3 = Math.floor(Math.random()*10),
        name = 'getJSONP' + a[r1] + a[r2] + a[r3],
        cbname = 'getJSONP.' + name;
        // 判断url地址中是否含有?号
        if(url.indexOf('?') === -1){
            url += '?jsonp=' + cbname;
        }else{
            url += '&jsonp=' + cbname;
        }
        // 动态创建script标签
        var script = document.createElement('script');
        // 定义被脚本执行的回调函数
        getJSONP[name] = function(data){
            try{
                callback && callback(data);
            } catch(e){
                //
            }finally{
                // 最后删除该函数及script标签
                delete getJSONP[name];
                script.parentNode.removeChild(script);
            }
        }
        // 定义script的src
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
}

getJSONP("http://class.imooc.com/api/jsonp",function(data){
        console.log(data);
});