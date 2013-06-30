// 输出图标
 
$(function() { 
	desk.init();  
	bottomBar.init();
	// alert($("#bottomBar"));
    // 判断浏览器的支持 
    if(isIE) { 
    	appIE.init();
    	//  切换成IE 视图
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

var win = function (me) {
	return me = {
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

			bottomBar.addCurrent(id);	
		},
		openApp : function (id,title,url,icon,jsonSonMenu,w,h) {  
			  // if(showDialog(id)) { return; } 
			  var taskItem = bottomBar.getItem(id);
			
			  if(taskItem.length == 1 ) {
			  	// 已存在 
			  	win.showApp(id)
				return; 
			  } else {
			  	//创建状态栏中的 ICON 
			  	var o = { 
			  		id:id,title:title,url:url,icon:icon,jsonSonMenu:jsonSonMenu,w:w,h:h
			  	}; 
			  	var box = bottomBar.create(o);
			  	bottomBar.addItem(box);
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

			       		}
			       		
			        }  
			    );
			  }
		 	      
		},
		hideAll : function () {},
		closeAll : function () {},
		closeElse : function () {}

	}
}();
// impress 窗口
var desk = function () { 
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
					h: data.h,
					appid : data.appid
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
				me.bindEvent(box);
				desk.addPanel(box);
			},
			bindEvent:function(box){//绑定事件  
				box.click(function(e){   
					var _this = $(this);
					var id = _this.attr("appid");
					var title = $.trim(_this.text());
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
 














































var isIE = (function () {
	if(document.all) {
		return true;
	} else {
		return false
	}
	
})();

























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
				var info = $("<p> 这里写一些APP 相关描述</p>")
				iconBox.append(img).append(name);
				infoBox.append(info);
				box.append(iconBox).append(infoBox);
				// .append(shadow);
				this.bindEvent(box);
				desk.addPanel(box);
			},
			bindEvent:function(box){//绑定事件 
				app.bindEvent(box);
				// box.click(function(e){ 
				// 	// event.preventDefault()
				// 	// 该方法将通知 Web 浏览器不要执行与事件关联的默认动作（如果存在这样的动作）。
				// 	// 例如，如果 type 属性是 "submit"，在事件传播的任意阶段可以调用任意的事件句柄，通过调用该方法，可以阻止提交表单。
				// 	// 注意，如果 Event 对象的 cancelable 属性是 fasle，那么就没有默认动作，或者不能阻止默认动作。无论哪种情况，调用该方法都没有作用。
				 	 // e.preventDefault();
				// 	// event.stopPropagation()
				// 	// 该方法将停止事件的传播，阻止它被分派到其他 Document 节点。在事件传播的任何阶段都可以调用它。
				// 	// 注意，虽然该方法不能阻止同一个 Document 节点上的其他事件句柄被调用，但是它可以阻止把事件分派到其他节点。
		             // e.stopPropagation();
				// 	var _this = $(this);
				// 	var id = _this.attr("appid");
				// 	var title = $.trim(_this.text());
				// 	var url =_this.attr("url");
				// 	var icon =_this.find("img").attr("src").split("/")[1];
				// 	var sonMenu =_this.attr("sonMenu");//获取子菜单
				// 	if(sonMenu == undefined){
				// 		sonMenu = "[]"
				// 	}
				// 	var jsonSonMenu = eval("(" + sonMenu + ")");//将json格式的字符串转换为json
					 
				// 	// Windows.openApp(id,title,url,icon,jsonSonMenu,700,500);
				// 	// 图标状态 不为active 不 open dialog  如果是ie 则不做判断就打开窗口 
				

				// 	if ( jsonSonMenu.length > 0 ) { 
				// 		// open 子菜单 
				// 		// alert("先打开了一些子菜单哦 ");
				// 		// return;
				// 	}
				// 	// artdialog 的 width 和 height 
				//  	var w = parseFloat(_this.attr("w"));
				//  	var h =	parseFloat(_this.attr("h"));
				 	
				// 	win.openApp(id,title,url,icon,jsonSonMenu,w,h);
				// });
			}
	} //self 
}();
