/***
 * 所有应用js
 * 
 */


/**
 * Get取数据
 * @param url
 * @param data 数据
 * @param success 成功回调函数
 * @param me Vue对象
 * @returns
 */
var Gsystem = "/cmt";
function getData(url,data,me,success){
	var errorFunc=function(XMLHttpRequest, textStatus, errorThrown){
		if(XMLHttpRequest.status==401 ){
			me.$message.error("会话超时，请重新登录！");
		}else{
			me.$message.error("获取数据失败！");
		}
		
	};
	
	//调用前
	var loading=function(){
		me.loading=true;
	};
	//调用完成
	var completed=function(xhr, textStatus){
		me.loading=false;
		/*
		var status=xhr.getResponseHeader("sessionstatus");
		if(status=="sessionOut"){
			alert("被迫下线，原因：与服务器失去连接！");
			var top=getTopWin();
			top.document.location="/criportal/logout.jsp";
		}
		*/		
	};
	
	//success函数
	var gsuccess=function(data){
        me.loading=false;
        success(data);
	};

	$.ajax({
	   type: "GET",
	   cache:false,
	   url:  url,	  
	   data: data,
	   complete:completed,
	   beforeSend:loading,
	   success: gsuccess,
	   error:errorFunc
	});
}

/**
 * Post数据
 * @param url
 * @param data 数据
 * @param success 成功回调函数
 * @param me Vue对象
 * @returns
 */
function postData(url,data,me,success){
	var errorFunc=function(XMLHttpRequest, textStatus, errorThrown){
		if(XMLHttpRequest.status===401){
			me.$message.error("会话超时，请重新登录！");
		}else{
			me.$message.error("获取数据失败！");
		}
	};
	
	//调用前
	var loading=function(){
		$('#loading').show();
	};
	//调用完成
	var completed=function(xhr, textStatus){
		$('#loading').hide();
		/*
		var status=xhr.getResponseHeader("sessionstatus");
		if(status=="sessionOut"){
			alert("被迫下线，原因：与服务器失去连接！");
			var top=getTopWin();
			top.document.location="/criportal/logout.jsp";
		}
		*/		
	};
	
	//success函数
	var gsuccess=function(data){
        me.loading=false;
        success(data);
	};

	$.ajax({
	   type: "POST",
	   cache:false,
	   url:  url,	  
	   data: data,
	   complete:completed,
	   beforeSend:loading,
	   success: gsuccess,
	   error:errorFunc
	});
}


function postJsonData(url,data,me,success){
	var errorFunc=function(XMLHttpRequest, textStatus, errorThrown){
        if(XMLHttpRequest.status===401){
            me.$message.error("会话超时，请重新登录！");
        }else{
            me.$message.error("获取数据失败！");
        }
	};
	
	//调用前
	var loading=function(){
		$('#loading').show();
	};
	//调用完成
	var completed=function(xhr, textStatus){
		$('#loading').hide();
		/*
		var status=xhr.getResponseHeader("sessionstatus");
		if(status=="sessionOut"){
			alert("被迫下线，原因：与服务器失去连接！");
			var top=getTopWin();
			top.document.location="/criportal/logout.jsp";
		}
		*/		
	};
	
	//success函数
	var gsuccess=function(data){
        me.loading=false;
        success(data);
	};

	$.ajax({
	   type: "POST",
	   cache:false,
	   url:  url,	  
	   contentType: "application/json",
	   dataType: "json",
	   data: JSON.stringify(data),
	   complete:completed,
	   beforeSend:loading,
	   success: gsuccess,
	   error:errorFunc
	});
}

//返回顶层window
function getTopWin(){
    return window.parent!=window.self ? window.parent : window.self;
}

//字节转大小
function bytesToSize(bytes) {
    if (bytes === 0) return '0 B';
    var k = 1024, // or 1024
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
   return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}

//内页高度
$(document).ready(function(){	
	if(window.parent==window.self){
		//没有外层frame时，跳转到首页
		//document.location="/pm/index.jsp";
        //$("#app").css("min-height",$(window).height()- 115);
	}else{
		//$("#app").css("min-height",$(window).height()- 115);
	}	
});

//后缀转成图片图标
function suffix2img(suffix){
	if(suffix==null){
		return "icon-file";
	}
	
	var tmp = suffix.toLowerCase();
	switch(tmp){
	    case "pdf":
	    	return "icon-pdf";
	    	break;
	    case "doc":
	    	return "icon-word";
	    	break;
	    case "docx":
	    	return "icon-word";
	    	break;
	    case "xls":
	    	return "icon-excel";
	    	break;
	    case "xlsx":
	    	return "icon-excel";
	    	break;
	    case "txt":
	    	return "icon-text";
	    	break;
	    case "html":
	    	return "icon-html";
	    	break;
	    case "htm":
	    	return "icon-html";
	    	break;
	    case "jpg":
	    	return "icon-picture";
	    	break;
	    case "jpeg":
	    	return "icon-picture";
	    	break;
	    case "png":
	    	return "icon-picture";
	    	break;
	    case "gif":
	    	return "icon-picture";
	    	break;	    
	}
	
	var audios = ".wav; .m3u; .cda; .ogg; .ape; .flac; .aac; .acp; .aif; .aifc; .aiff; .au; .la1; .lavs; .lmsff; .mid; .midi; .mnd; .mns; .mp1; .mp2; .mp3; .mpga; .pls; .ra; .ram; .rmi; .rmm; .rpm; .snd; .wax; .wma; .xpl";
	var videos = ".mxf;.avi; .mp4; .wmv; .mxf; .ts; .rmvb; .mov; .dat; .mpe; .asf; .asx; .ivf; .m1v; .m2v; .m4e; .movie; .mp2v; .mp2v; .mpa; .mpeg; .mpg; .mps; .mpv; .mpv2; .rv; .wm; .wmx; .wvx"
	
	if( videos.indexOf(tmp)>0 ){
		return "icon-video";
	}
	
	if(audios.indexOf(tmp)>0){
		return "icon-icaudio";
	}
	
	return "icon-file";
}

/**
 * 克隆对象，初始化属性
 * @param obj
 */
function cloneObject(obj){
    var newObj = {};
    for( var item in obj){
        newObj[item] = obj[item];
    }
    return newObj;
}

/**
 * 验证主机端口
 * @param hostPort 例如：http://127.0.0.1:8080  http://www.baidu.com:9070
 * @returns {boolean} ture：正确 false:错误
 */
function hostPortCheck(hostPort){
    var reg = /^((https|http)?:\/\/)(((25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d))|(([a-zA-Z]+(.)){1,}))((:)+[0-9]{1,})/;
    return reg.test(hostPort);
}

Date.prototype.format = function(fmt) {
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
};

/**
 * 取文件后缀
 * @param filePath
 * @returns {string}
 */
function getSuffix(filePath) {
    var startIndex = filePath.lastIndexOf(".");
    if (startIndex != -1){
        return filePath.substring(startIndex + 1, filePath.length).toLowerCase();
    }else{
        return "";
    }
}

function timeDiff(time1,time2){
    time = time2.getTime() - time1.getTime();
    time = parseInt(time/1000);
    hh = parseInt(time/60/60);
    time1 = time % (60*60);
    mm = parseInt(time1/60);
    ss = (time1 % (60));
    mmStr = mm>9? mm+"" : "0"+mm;
    ssStr = ss>9? ss+"" : "0"+ss;
    return hh + ":" + mmStr + ":" +ssStr;
}

/**
 * 时长、入点转成字符串
 */
function formatVideoTime(time){
    var hh = parseInt(time/(60*60*1000));
    var time1 = time % (60*60*1000);
    var mm = parseInt(time1/(60*1000));
    var time2 = time1 % (60*1000);
    var ss = parseInt(time2/1000);
    var mi = time2 % 1000;
    hhStr = hh>9? hh+"" : "0"+hh;
    mmStr = mm>9? mm+"" : "0"+mm;
    ssStr = ss>9? ss+"" : "0"+ss;
    miStr = "";
    if(mi<=9){
        miStr = "00"+mi;
    }else if(mi<=99){
        miStr = "0"+mi;
    }else{
        miStr = mi+"";
    }
    return hhStr + ":" + mmStr + ":" +ssStr + ":" + miStr;
}

/**
 * 格式话流Id
 * @param streamId
 * @returns {*}
 */
function formatStreamId(streamId){
    if(streamId==-1){
        return "默认全部";
    }else{
        return streamId
    }
}
function formatChannel(channelId){
    if(channelId==null || channelId=="" || channelId=="ALL"){
        return "默认全部";
    }else{
        return channelId;
    }
}
function isNumber(val){
    var regPos = /^\d+$/;
    return regPos.test(val);
}