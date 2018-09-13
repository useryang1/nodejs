
//这里才开始
var fs        = require('fs');
var readline  = require('readline');
var stream    = require('stream');
var streamFile = function(filename){
    var instream  = fs.createReadStream(filename);
    var outstream = new stream;
    return readline.createInterface(instream, outstream);
}
var rl = streamFile('./SystemOut.log');

//new RegExp(pattern, attributes); 参数 pattern 是一个字符串，指定了正则表达式的模式或其他正则表达式。 参数 attributes 是一个可选的字符串，包含属性 "g"、"i" 和 "m"，分别用于指定全局匹配、区分大小写的匹配和多行匹配。
var err = new RegExp("\\[ERROR\\]");

var suc1 = new RegExp("\\[INFO\\]");
var suc2 = new RegExp("\\[WARN\\]");
var suc3 = new RegExp("\\[DEBUG\\]");

var errlist =  new Array();

rl.on('line', function(line) {
        var data = line.toString();
		var arr = data.split(" ").map(function (val) {  
			 return val;  
		});

        if(suc1.test(data) ){
           //  console.log('\n输出 suc1 data:'+data);
        }else if ( suc2.test(data) ){
           // console.log('\n输出 suc2 data:'+data);
        }else if ( suc3.test(data) ){
            // console.log('\n输出 suc2 data:'+data);
        } else if(err.test(data)) {  //请求  RegExpObject.test(string) 如果字符串 string 中含有与 RegExpObject 匹配的文本，则返回 true，否则返回 false。
            //console.log('\n输出 err data:'+data);
            errlist.push("##############################################"); //分割行
            errlist.push(data);
        }else {
            //console.log('\n输出 else data:'+data);
            errlist.push(data);
        }

});


rl.on('close',function(){
    //文件结束，整理一下统计数据并输出
    var errInfo = '';
    for(var x=0;x<errlist.length;x++){
        errInfo += errlist[x] + '\r\n';
    }

    //最近错误记录
    fs.appendFileSync('分析结果.txt', errInfo, options = { encoding: 'utf8'});

    var Datetemp2 = new Date();
    stopTime = Datetemp2.getFullYear() + "-" + (Datetemp2.getMonth() + 1) + "-" + Datetemp2.getDate() + " " + Datetemp2.getHours() + ":" + Datetemp2.getMinutes() + ":" + Datetemp2.getSeconds() + ":" + Datetemp2.getMilliseconds();
    console.log('\n输出到 ‘分析结果.txt’ 文件结束！');

    // process.exit(0);   //加上这一行可以强行结束程序，否则还会继续输出接下来的3,4,5,6直到最后一行。
});

