var DATA = {};

var bindwheel = function () {
 			$(window).unbind('mousewheel');
 			var blocker = 0; // display block 状态的dialog
			var array = art.dialog.list; 
			for( a in array) {  
				  if( "block" == array[a].DOM.wrap[0].style.display ) {  
				  	 blocker++; // 统计所有 block 状态的dialog 
				  } 
			}
			// 显示窗口数量大于1 则不绑定滚轮事件  
	        if(blocker > 1) { return; } 
			if(!impressAPI) { return; }
		    // 滚轮事件 
	        $(window).bind('mousewheel', function(event, delta) {  
	             // 上滚
	             if(delta > 0) { 
	             	// mac 中会出现 delta 值不断累加的情况 
	                impressAPI.next();
	             } else if (delta < 0) {
	                // --1 
	                impressAPI.prev();
	             }
	        });  
} 
var unbindwheel  = function () { 

	$(window).unbind('mousewheel');
} 
function portalInit(){ 
	//任务栏 
	bottomBar.init();
   //消息 和 开始菜单 
    bottomMenu.init(); 
    // bind 滚轮   
	dataInit(); 
	win.setView(win.viewstatus); 
}
var impressAPI = null;
function dataInit(){
	startMenu.init();

    if(isIE) { 
    	$(".impress").hide();
    	$("#view").hide();
    	
    	appIE.init();
    	//  切换成IE 视图
      //已存在 清空 
      $(".live-tile").liveTile("destroy");
      
      $(".live-tile").liveTile({  
      		playOnHover:true,
		    repeatCount: 0,
		    delay: 0,
		    startNow:false 
      });
      return;
    } else { 
    	// 初始化 3D 视图
    	// 载入3D 试图中 的 APP 层
        var _idx = app.idx
    	app.init(); 
    	 // 启动 3D 视图
    	impressAPI = impress("impress_" + _idx ); 
		impressAPI.init();
		
		
		// unbindwheel();// 防止登录时候 portalInit  bindwheel 运行两次
		var dialoglist = art.dialog.list; 
		for( a in dialoglist) {  
			if( "block" == dialoglist[a].DOM.wrap[0].style.display ) {
				return ;//以存在dialog 不在绑定滚动事件 
			} 
		}
		bindwheel();
		
    } 
} 
// 任务栏 me 作用是 使用 正确 对象作用域 
var bottomBar = function (me) { 
	return me = {
		box : $("<div id='bottomBar' class='bottomBar'></div>"),
		init:function(){ 
			win.body.append(me.box);
		},
		create:function(o){
			// o = (id,title,url,icon,jsonSonMenu,w,h)
			var $item =  $("<div class='taskItem' />");
			$item.attr({"id" : o.id });
			var $img = $("<img />"); 
			$img.attr({
				// "src" : "img/icon/min/" + o.icon
				"src" : "img/icon/" + o.icon
			})
			return $item.append($img); 
	 		// 升级时可以考虑添加一些任务条效果		
		},
		addItem:function(item){//像底部任务栏添加任务项
			me.bindEvent(item);
			me.box.append(item);	 
			id = item.attr("id");
			me.addCurrent(id);
			// // 绑定事件
			// 事件可以直接绑定在 item 上面 
			// bindEvent(me.box);
		},
		removeItem:function (id) {
			me.getItem(id).remove();	

		},
		getItem:function(id){//根据ID查询底部任务栏
			 return me.box.find("#"+id);
		},
		getItemNum:function(){//得到当前任务数
			// return me.innerbox.children().size();
		},
		setCurrent:function(id){			
			// me.addCurrent(id);
			//  // Sibling(id); 
		},		
		addCurrent:function(id){//设置当前任务栏样式			
			me.box.find("#"+id).addClass("active").siblings().removeClass("active");				
		},
		removeItemSibling:function(id){//移除当前任务同类样式
		// 	me.innerbox
		// 	.find("#"+id)
		// 	.siblings()
		// 	.removeClass("taskCurrent");		
		  },
		getALLItemID :function(){//得到当前任务栏所有任务ID
			var items = me.box.children(); 
			var idArray =[];
			items.each(function(){
				var id = $(this).attr("id"); 			
				idArray.push(id);
			})
			return idArray ; 
		},
		bindEvent : function (item) {
			var id =  item[0].id
			item.bind("click", function () { 
				win.showApp(id);
				bottomBar.addCurrent(id); 
			}) 
		} 
 	
	}	
}();

// 开始菜单
var startMenu = function (me) {
	return me = {
		init: function () { me.create() ;},
		create: function () {
			var $ul = $("<ul class='multi_menu' />"); 
			var data = DATA.app;
			for(a in data ) {
				var $li = $("<li />"); 
				// $li.html(data[a].name);
				$li.attr({ 
					url:data[a].url, 
					appid : data[a].appid,
					icon: data[a].icon,
					alt: data[a].name
				});
				var $a = $("<a />").html(data[a].name);
				var $icon = $("<span class='icon-chevron-right' />")
				$li.append($a); 
				var  sonMenu = data[a].sonMenu;
				if(sonMenu == undefined){
					  sonMenu = "[]";
				}
				var jsonSonMenu = eval("(" + sonMenu + ")");//将json格式的字符串转换为json 
				if(jsonSonMenu.length > 0 ) {
					var $innerUl =  $("<ul class='sub_menu' />");
					for(var i=0; i <jsonSonMenu.length; i++) {
						var $innerli = $("<li class='sub_menu_item' />"); 
						// $innerli.html(jsonSonMenu[i].name);
						$innerli.attr({ 
							url:jsonSonMenu[i].url,
							icon: jsonSonMenu[i].icon,
							appid : jsonSonMenu[i].appid,
							alt: jsonSonMenu[i].name
						});
						var $innera = $("<a />").html(jsonSonMenu[i].name);
						$innerli.append($innera); 
						$innerUl.append($innerli);		 
					}
					$a.append($icon)
					$li.append($innerUl).addClass("hasSon");

				};
				$ul.append($li);
			} 
			// 生成一个可点击的遮罩层 
			$("body").append($("<div class='muMenu_blank' />"))
			$("#muMenu").append($ul);
			//bind event 
			$ul.find("li").each(function () {
				me.bindEvent($(this));
				if($(this).hasClass("hasSon")) { 
                    $(this).hover( 
                        function () { 
                            // alert($(this).children(".sub_menu").html());
                            $(this).children(".sub_menu").show(); 
                        }, function () {
                            $(this).children(".sub_menu").hide(); 
                        }
                    );
            	} 
			}); 
			// 包括子菜单
		},
		//var title = $this.attr("alt"); (id,title,url,icon,jsonSonMenu,w,h)
		bindEvent: function (box) {
			box.click(function () {
				var $this = $(this);
				var id= $this.attr("appid");
				var title = $this.attr("alt");
				var url = $this.attr("url");
				var icon = $this.attr("icon");
				win.openApp(id,title,url,icon);
				return false;
			});
			
		}
	}
}(); 
// im菜单
// im菜单调用在talk.js控制写入和隐藏   
var bottomMenu = function (me) {
	return me = {
		init: function (){
			me.im = win.body.find("#im_item");		 
			me.bindEvent(me.im);
			me.num = me.im.find(".badge");
			me.msg = me.im.find(".im_msg"); 
		},
		bindEvent: function (box) {
			box.click(function(e){  
					var _this = $(this);
					var id = _this.attr("appid");
					var title = _this.attr("title");
					var url =_this.attr("url");
					var icon =_this.find("img").attr("src").split("/")[2];
					// var sonMenu =_this.attr("sonMenu");//获取子菜单 
					var jsonSonMenu;
				 	var w = parseFloat(_this.attr("w"));
				 	var h =	parseFloat(_this.attr("h")); 
					// win.openApp(id,title,url,icon,jsonSonMenu,w,h);  
					var dialoglist = art.dialog.list; 
					if(dialoglist[id]) {
						dialoglist[id].show();
					} else { 
						// 取消滚轮
						 unbindwheel();
						art.dialog.open(url,{   
					            id : id,
					            title: title,     
					            resize:false,
					            // lock:true,
					            // background:'#000', // 背景色
					            // opacity: 0.8, // 透明度 
					            close : function () { 
									for (var i =0; i <window.frames.length;i++ ) {
										 if(window.frames[i].appTalk) {  
										 	// talk 窗口退出时 需要调用 
				            				window.frames[i].appTalk.logout('1');
				            				break;
				            			  }  
				            		}
				            		bindwheel();
					            },
					            hide_feedback: function () {
					            	bindwheel();
					            }
					           	
						}); 
					}
						 
			});
		}
	}
}();
// 窗口视图
var win = function (me) { 
	return me = {
		viewstatus : "3d",
		body: $("body"),
		showApp : function(id){//art弹出  
			var array = art.dialog.list;
			var taskIds = bottomBar.getALLItemID();
			var taskLen = taskIds.length;
			var api = array[id];
			var wrap = api.DOM.wrap;
			var $wrap = $(wrap[0]);			
			if(taskLen >1){
				//判断任务个数 显示切换和焦点切换
				if($wrap.is(":hidden")){	
					 api.zIndex();	 // 置顶			
					 api.show();

				}else{
					if(!$wrap.hasClass("aui_state_focus")){
						api.zIndex(); // 置顶 

						// api.focus();
					}else{
						api.hide();
					}
				}
			}else{				
				if($wrap.is(":visible")){
					api.hide();
				}else{
					api.show();
				}
			}
				//打开窗口后 锁定 背景滚轮
			  	 unbindwheel();

			bottomBar.addCurrent(id);	
		},
		openApp : function (id,title,url,icon,jsonSonMenu,w,h) {  
			  // if(showDialog(id)) { return; } 
			  // 窗口缩略图的唯一id 
			  var taskItem = bottomBar.getItem(id);

			  if(taskItem.length == 1 ) {
			  	// 已存在 切换 
			  	win.showApp(id)
				return; 
			  } else {
			  	//创建状态栏中的 ICON 
			  	var o = { 
			  		id:id,title:title,url:url,icon:icon,jsonSonMenu:jsonSonMenu,w:w,h:h
			  	}; 
			  	var box = bottomBar.create(o);
			  	bottomBar.addItem(box);
			  	//打开窗口后 锁定 背景滚轮
			  	 unbindwheel();
			  	 
			  	// 不存在 新开窗口
			  	art.dialog.open(url,/** 弹出ART窗体*/
			        {   
			            id : id,
			            title: title,    
			            // width:100,//设置窗口宽度自动适应width // 测试用 正式取消高度
			            // height:100, // 测试用 正式取消高度
			            resize:false,
			            // lock:true,
			            // background:'#000', // 背景色
			            // opacity: 0.8, // 透明度 
			            close : function () { 
			        	   // 清除任务栏 的target 
			        	   bottomBar.removeItem(id);
			        	    // rebind 滚轮事件
					        bindwheel();
			       		},
			       		hide_feedback : function () {
			       			 // rebind 滚轮事件
					         bindwheel();
			       		}
			       		
			        }  
			    );
			  }
		 	      
		},
		hideAll : function () {
			for(a in art.dialog.list) {
				art.dialog.list[a].hide();
			}	
		},
		showAll : function () {
			for(a in art.dialog.list) {
				art.dialog.list[a].show();
			}		
		},
		closeAll : function () {},
		closeElse : function () {},
		changeView : function () {
			// change view 方法需要 在用户切换之后保存下来 
			if(me.viewstatus == "3d") {
				me.setView();  	
			} else {
				me.setView("3d"); 
			}
			 	
			 

		},
		setView : function (status) {
			if(isIE) { return; } // ie 只有唯一视图 
			if(status == "3d") {
				//设置3d 状态显示
				// 销毁绑定 IE
				 $(".live-tile").liveTile("destroy");
				 
				 $("#view").removeClass("icon-3dview");
				  me.body.removeClass();
        		  me.body.addClass("desktop impress-supported impress-enabled");
        		// $("#impress").html("");
        		// $("#impress").remove(); 
        		// $("body").append($("<div id='impress' />"));
        		// $("#impress").attr("style",style);
        		// $("#impress").attr("style","position: absolute; transform-origin: left top 0px; transition: all 0ms ease-in-out 0ms; transform-style: preserve-3d; top: 45%; left: 52%; transform: perspective(1244.73px) scale(0.803385);");
        		 
        		 $(".impress").show();
        		 $("#impress_ie").hide();
        		 // app.init();
        		 // impress().init();
        		 me.viewstatus = "3d";

			} else { 
				//设置为ie 状态显示
				// 切换成IE 状态
				me.body.removeClass();
            	me.body.addClass("desktop impress-not-supported");
        	    //ie 背景
        		 $("#view").addClass("icon-3dview");
        		 // 3d 状态隐藏
        		 $(".impress").hide();
        		 // 载入IE 视图
        		 $("#impress_ie").html("");
        		 $("#impress_ie").show(); 
        		 appIE.init();
        		 $(".live-tile").liveTile({ 
        		 	playOnHover:true,
				    repeatCount: 0,
				    delay: 0,
				    startNow:false 
        		 }); 
        		 me.viewstatus = "ie";
			}
		},
		chkUserStatus : function (username) {
    
        	var $loginBtn = $("#userStatus").find(".btn");
         	// 绑定点击弹出登录框
         	$("#userName").unbind("click");
         	$("#userName").click(function () { 
	            win.openApp('001','个人中心','app/user.jsp','grzx.png');   
	         });
	        // alert(<%=userName%>);

	         if(username  ==  "") {  
	                $("#userName").html("请登录");
	                $loginBtn.each(function () {
	                    $(this).addClass("disabled");
	                }); 
	         }else { 
	                $("#userName").html("欢迎您," + username );
	                $loginBtn.each(function () {
	                    $(this).removeClass("disabled");
	                });     
	        } 
	    }

	}
}();
 
// html5 窗口菜单项                         
var app = function(me) {
	var o = { "data-x" :0, "data-y" :0, "data-z" :0 } 
	return me = { 
		    idx : 0,
		    iconIdx :0,
			init : function(id){ 
				// alert(id)
				me.data = DATA.app;
				win.body.find(".impress").each(function () { $(this).remove();  })
				var $impress = $("<div id='impress_"+ me.idx + "' class='impress' />");
				me.idx++;
				win.body.append($impress);
				for(a in me.data) { 
					$impress.append(me.create(me.data[a]));  
				}  
			}, 
			create:function(data){ 

				var box = $("<div class='app step slide'></div>");  
					 
				 	if ( (me.iconIdx + 2) % 2 !=  0) {
	             	 	// 单数  
	 					o["data-x"] = 300;
	             	 	o["data-z"] -= 1000;
					 } else {
	 					// 复数 
	 					o["data-x"] = 0;
	             	 	o["data-z"] -= 1000;
		            }
		         	
 			 	
				box.attr({
					id:"app_"+ data.appid,
					// appid:this.app.appid,
					// fileid : this.app.appid, 
					// idx : data.idx,
					title:data.name,
					url:data.url,
					sonMenu:data.sonMenu,
					w: data.w,
					h: data.h,
					appid : data.appid
				});
				// alert(o["data-x"]);
				box.attr(o);
				
				var img = $("<img>",{
					alt:data.name ,
					src:'img/icon/'+data.icon, 
					"class":"app_img"  
				});
				var name = $("<span class='app_name'>" + data.name+ "</span>");
				var shadow = $("<img src='img/appShadow.png' class='app_shadow' />");
				box.append(img).append(name).append(shadow);
				me.bindEvent(box);
				me.iconIdx++;
				return box;
				
			},
			bindEvent:function(box){//绑定事件  

				box.click(function(e){ 
					var _this = $(this);
					var id = _this.attr("appid");
					var title =   _this.attr("title"); 
					var url =_this.attr("url");
					var icon =_this.find("img").attr("src").split("/")[2];
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
						// alert("先打开了一些子菜单哦 ");
						// return;
					}
				 	var w = parseFloat(_this.attr("w"));
				 	var h =	parseFloat(_this.attr("h")); 
				 	
					win.openApp(id,title,url,icon,jsonSonMenu,w,h); 
					//  #impress  隐藏 让3D 元素失去点击事件   (还需要解除3d 滚轮事件) 
					// $("#impress").addClass("noevent")
					return false;
 
				});
			}
	} //self
}();  
// ie 窗口菜单项
var appIE = function(me) {
	var effect = []
	effect.push({   "data-mode" : "flip"  })
	effect.push({   "data-speed" : "900"  });
	effect.push({   "data-direction" :"horizontal" }); 
	return me = {
			init : function(){ 
				this.app = DATA.app;
				$("#impress_ie").html("");
				for(a in this.app) {
					this.create(this.app[a]);
				}  
			}, 
			create:function(data){ 
				var box = $("<div class='app live-tile' ></div>"); 
				var idx =  Math.floor(Math.random()*3);
				var delay = (Math.floor(Math.random()*7)+ 3 ) * 1000// 8s  内的随机值
				var s = effect[idx]
				// box.attr("data-delay",delay); // 不直接执行
 
		   	    box.attr(s);
				box.attr({ 
					id:"icon_app_"+ data.appid, 
					title:data.name,
					url:data.url,
					sonMenu:data.sonMenu,
					w: data.w,
					h: data.h,
					appid : data.appid
				});
				
				var iconBox = $("<div class='iconbox' />")
				var infoBox = $("<div class='infobox'/>")
				// icon_ie
				var img = $("<img>",{
					alt:data.name ,
					src:'img/icon_ie/'+data.icon, 
					"class":"app_img"  
				});
				var name = $("<span class='app_name tile-title'>" + data.name+ "</span>");
				var shadow = $("<img src='img/appShadow.png' class='app_shadow' />");
				var info = $("<p> " + data.desc +"</p>")
				iconBox.append(img).append(name);
				infoBox.append(info);
				box.append(iconBox).append(infoBox);
				// .append(shadow);
				this.bindEvent(box);
				$("#impress_ie").append(box);
			},
			bindEvent:function(box){//绑定事件 
				app.bindEvent(box);  
			}
	} //self 
}();
// 判断 浏览器类型
var isIE = (function () {
	if(document.all) {
		return true;
	} else {
		return false
	} 
})(); 

//判断 顶层窗口中是否 重复
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

var portal = new function(){};
portal.init = function(){
	this.elemEventBind();
}
portal.elemEventBind = function(){
	// $(".icon_talk").click(function() { portal.showTalk()});
	// 登出
	$("#loginOut").click(function() {portal.loginout()}); 
	// $("#user_a").click(function() {
	// 	win.openApp("000001","个人中心","./app/user.jsp","",[],"","");
	// });
	// $("#bill_a").click(function() {
	// 	win.openApp("000001","个人中心","./app/account.jsp","",[],"","");
	// });
	// $("#app_a").click(function() {
	// 	win.openApp("000001","个人中心","./app/myapp.jsp","",[],"","");
	// });
	// $("#pwd_a").click(function() {
	// 	win.openApp("000001","个人中心","./app/modifyPWD.jsp","",[],"","");
	// });
}
portal.loginout = function(){
	if($loginNo=='null') {
		win.openApp("login","登录","./app/login.jsp?tg=1","",[],"","");
	} else{ 
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
		    		// alert("退出成功");
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
	win.openApp("talk_001","在线客服","./app/talk.jsp","",[],"","");
}
portal.toggle = function(obj){
	$loginNo = obj.loginNo;
	win.chkUserStatus(obj.userName); 
	portal.refreshAppData(); 
	portalInit();
}
portal.refreshAppData = function(){
	var dict = new DynamicDict("UBOSS_DESKTOP_USER_003");
    dict.setValue("OP_TYPE","3");
    if(!dict.callService()){
        alert(dict.error.Desc);
        return;
    }
    var count = dict.getDataObjCnt("ATOM_DATA");
    var app = {};
    if(count>0){
    	var atomData = {};
    	for(var i=0;i<count;i++){
    		var obj = {};
    		var bo = dict.getBOValue("ATOM_DATA",i);
    		obj.appid = bo.getValue("APP_ID");
    		obj.icon = bo.getValue("APP_ICON");
    		obj.name = bo.getValue("APP_NAME");
    		obj.url = bo.getValue("APP_ACTION");
    		obj.idx = bo.getValue("APP_SORT");
    		obj.desc = bo.getValue("APP_NOTE");
    		app[bo.getValue("APP_CODE")] = obj;
    	}
    }
    DATA.app = app;
}
portal.refreshAppData();
portalInit();

