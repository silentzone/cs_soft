$(function() { 
	desk.init();  
    // 判断浏览器的支持
   
    if(isIE) {
    	 
    	appIE.init();
    	// 将云桌面切换成IE 视图
    	$(".live-tile,.flip-list").liveTile();
    	return;
    } else {
 
    	// 初始化 3D 视图
    	// 载入3D 试图中 的 APP 层
    	app.init(); 
    	 // 启动 3D 视图
		impress().init();
    }
   
   
});

var desk = function (me) { 
	return me={ 
		init:function(){
			me.create(); 
		},
		create:function(){ 
			me.box=$("#impress"); 
		},
		addPanel:function(panel){
			me.box.append(panel);
		}

	}
}();
// css3 浏览器
var app = function(me) {
	var o = { "data-x" :0, "data-y" :0, "data-z" :0 } 
	return me = {
			init : function(){ 
				this.app = DATA.app; 
				for(a in this.app) {
					this.create(this.app[a]);
				}  
			}, 
			create:function(data){ 
				var box = $("<div class='app step slide'></div>");   
				 	if ( (data.idx + 2) % 2 !=  0) {
	             	 	// 单数  
	 					o["data-x"] = 300;
	             	 	o["data-z"] -= 1000;
					 } else {
	 					// 复数 
	 					o["data-x"] = 0;
	             	 	o["data-z"] -= 1000;
		            }
		         
 			 
				box.attr({
					id:"icon_app_"+ data.appid,
					// appid:this.app.appid,
					// fileid : this.app.appid, 
					title:data.name,
					url:data.url,
					sonMenu:data.sonMenu,
					w: data.w,
					h: data.h
				});
				box.attr(o);
				
				var img = $("<img>",{
					alt:data.name ,
					src:'img/icon/'+data.icon, 
					"class":"app_img"  
				});
				var name = $("<span class='app_name'>" + data.name+ "</span>");
				var shadow = $("<img src='img/appShadow.png' class='app_shadow' />");
				box.append(img).append(name).append(shadow);
				this.bindEvent(box);
				desk.addPanel(box);
			},
			bindEvent:function(box){//绑定事件 

				box.click(function(e){ 
					 
					// event.preventDefault()
					// 该方法将通知 Web 浏览器不要执行与事件关联的默认动作（如果存在这样的动作）。
					// 例如，如果 type 属性是 "submit"，在事件传播的任意阶段可以调用任意的事件句柄，通过调用该方法，可以阻止提交表单。
					// 注意，如果 Event 对象的 cancelable 属性是 fasle，那么就没有默认动作，或者不能阻止默认动作。无论哪种情况，调用该方法都没有作用。
					 // e.preventDefault();
					// event.stopPropagation()
					// 该方法将停止事件的传播，阻止它被分派到其他 Document 节点。在事件传播的任何阶段都可以调用它。
					// 注意，虽然该方法不能阻止同一个 Document 节点上的其他事件句柄被调用，但是它可以阻止把事件分派到其他节点。
					 //  e.stopPropagation();
					var _this = $(this);
					var id = _this.attr("appid");
					var title = $.trim(_this.text());
					var url =_this.attr("url");
					var icon =_this.find("img").attr("src").split("/")[1];
					var sonMenu =_this.attr("sonMenu");//获取子菜单
					if(sonMenu == undefined){
						sonMenu = "[]"
					}
					var jsonSonMenu = eval("(" + sonMenu + ")");//将json格式的字符串转换为json
					 
					// Windows.openApp(id,title,url,icon,jsonSonMenu,700,500);
					// 图标状态 不为active 不 open dialog  如果是ie 则不做判断就打开窗口
					// iphone  不支持  impress 
					if( !$("body").hasClass("impress-not-supported") && !_this.hasClass("active")) { 
						return;
					}

					if ( jsonSonMenu.length > 0 ) { 
						// open 子菜单 
						alert("先打开了一些子菜单哦 ");
						return;
					}
				 	var w = parseFloat(_this.attr("w"));
				 	var h =	parseFloat(_this.attr("h"));

					openWindow(id,title,url,icon,jsonSonMenu,w,h); 


					// 让3D 元素失去点击事件   (还需要解除3d 滚轮事件) 
					$("#impress").addClass("noevent")
					return false;
 
				});
			}
	} //self
}();
 

// ie 的呈现方式 
var appIE = function(me) {
	var effect = []
	effect.push({   "data-mode" : "flip"  })
	effect.push({   "data-speed" : "1000"  });
	effect.push({   "data-direction" :"horizontal" });

	return me = {
			init : function(){ 
				this.app = DATA.app; 
				for(a in this.app) {
					this.create(this.app[a]);
				}  
			}, 
			create:function(data){ 
				var box = $("<div class='app live-tile' ></div>"); 
				var idx =  Math.floor(Math.random()*3);
				var delay = (Math.floor(Math.random()*7)+ 3 ) * 1000// 8s  内的随机值
				var s = effect[idx]
				box.attr("data-delay",delay)
 
		   	    box.attr(s);
				box.attr({ 
					id:"icon_app_"+ data.appid,
					// appid:this.app.appid,
					// fileid : this.app.appid, 
					title:data.name,
					url:data.url,
					sonMenu:data.sonMenu,
					w: data.w,
					h: data.h
				});
				
				var iconBox = $("<div class='iconbox' />")
				var infoBox = $("<div class='infobox'/>")
				var img = $("<img>",{
					alt:data.name ,
					src:'img/icon/'+data.icon, 
					"class":"app_img"  
				});
				var name = $("<span class='tile-title'>" + data.name+ "</span>");
				var shadow = $("<img src='img/appShadow.png' class='app_shadow' />");
				var info = $("<p> </p>")
				iconBox.append(img).append(name);
				infoBox.append(info);
				box.append(iconBox).append(infoBox);
				// .append(shadow);
				this.bindEvent(box);
				desk.addPanel(box);
			},
			bindEvent:function(box){//绑定事件 
				box.click(function(e){ 
					// event.preventDefault()
					// 该方法将通知 Web 浏览器不要执行与事件关联的默认动作（如果存在这样的动作）。
					// 例如，如果 type 属性是 "submit"，在事件传播的任意阶段可以调用任意的事件句柄，通过调用该方法，可以阻止提交表单。
					// 注意，如果 Event 对象的 cancelable 属性是 fasle，那么就没有默认动作，或者不能阻止默认动作。无论哪种情况，调用该方法都没有作用。
					 e.preventDefault();
					// event.stopPropagation()
					// 该方法将停止事件的传播，阻止它被分派到其他 Document 节点。在事件传播的任何阶段都可以调用它。
					// 注意，虽然该方法不能阻止同一个 Document 节点上的其他事件句柄被调用，但是它可以阻止把事件分派到其他节点。
					  e.stopPropagation();
					var _this = $(this);
					var id = _this.attr("appid");
					var title = $.trim(_this.text());
					var url =_this.attr("url");
					var icon =_this.find("img").attr("src").split("/")[1];
					var sonMenu =_this.attr("sonMenu");//获取子菜单
					if(sonMenu == undefined){
						sonMenu = "[]"
					}
					var jsonSonMenu = eval("(" + sonMenu + ")");//将json格式的字符串转换为json
					 
					// Windows.openApp(id,title,url,icon,jsonSonMenu,700,500);
					// 图标状态 不为active 不 open dialog  如果是ie 则不做判断就打开窗口 
				

					if ( jsonSonMenu.length > 0 ) { 
						// open 子菜单 
						alert("先打开了一些子菜单哦 ");
						return;
					}
					// artdialog 的 width 和 height 
				 	var w = parseFloat(_this.attr("w"));
				 	var h =	parseFloat(_this.attr("h"));
				 	
					openWindow(id,title,url,icon,jsonSonMenu,w,h);
				});
			}
	} //self 
}();

// 关闭按钮受到影响
function showDialog(id) {
    // 检测 当前窗口 隐藏或者是关闭  
    if(art.dialog.list[id]) { 
        var wrap = art.dialog.list[id].DOM.wrap;
        var $wrap = $(wrap);
        if($wrap.is(":hidden")) {
            art.dialog.list[id].show(); 
            art.dialog.list[id].focus();
            return true; 
        } 
    } else {
        return false; // 不存在该ID 弹出窗
    } 
} 
 function openWindow (id,title,url,icon,jsonSonMenu,w,h) {  
	  if(showDialog(id)) { return; } 
 	  art.dialog.open(url,/** 弹出ART窗体*/
        {   
            id : id,
            title: title,    
            // width:w,//设置窗口宽度自动适应width
            // height:h,
            resize:false,
            lock:true,
            background:'#000', // 背景色
            opacity: 0.8 // 透明度 
            ,close : function () { 
        	   $("#impress").removeClass("noevent")
       		}

        } 

      );    
}
var isIE = (function () {
	if(document.all) {
		return true;
	} else {
		return false
	}
	
})();
var portal = new function(){};
portal.init = function(){
	this.elemEventBind();
}
portal.elemEventBind = function(){
	$(".icon_talk").click(function() { portal.showTalk()});
	$(".icon_set").click(function() {portal.loginout()});

	$("#user_a").click(function() {
		openWindow("000001","个人中心","./app/user.jsp","",[],"","");
	});
	$("#bill_a").click(function() {
		openWindow("000001","个人中心","./app/account.jsp","",[],"","");
	});
	$("#app_a").click(function() {
		openWindow("000001","个人中心","./app/myapp.jsp","",[],"","");
	});
	$("#pwd_a").click(function() {
		openWindow("000001","个人中心","./app/modifyPWD.jsp","",[],"","");
	});
}
portal.loginout = function(){
	if($loginNo=='null')
		openWindow("login","登录","./app/login.jsp?tg=1","",[],"","");
	else{
		if(!confirm("您确定要退出吗？")) return;
		$.ajax({
		    url: './loginservlet.do?action=logout',
		    type:'POST',
		    data: 'loginNo='+$loginNo,
		    dataType: "json",
		    contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		    error: function(msg) {      // 设置表单提交出错 
		    	$.messager.alert('温馨提醒','执行出错：'+msg.responseText,'error');
	           },
		    success: function (resp) {
		    	if(resp.code=='0'){
		    		// $.messager.alert('温馨提醒',resp.msg,'info');
		    		alert("退出成功");
		    		location.reload();
				}else{
		    		$.messager.alert('温馨提醒',resp.msg,'error');
		    	}
		    },
		    cache: false
		});

	}
}
portal.showTalk = function(){
	openWindow("talk_001","在线客服","./app/talk.jsp","",[],"","");
}
portal.toggle = function(loginNo){
	$loginNo = loginNo;
	$('.icon_user').toggle();
}