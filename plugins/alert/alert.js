$.extend({  
	alert : function (msg,type,callback) { 
		var api = { that : this }
		var tmp = '<div class="alert">' +
				  	'<span class="close" data-dismiss="alert">&times;</span>' +
					'<i class="icon-' + type + '"></i>' + msg +
				  '</div>';
		api.dom = $(tmp);
		$close = api.dom.find(".close");
		api.close = function () {
			if(callback) { callback(); } ;
			$close = null;
			api.dom.remove();	
		}
		api.clear = function () {
			$(".alert").each( function () {  	 
				$(this).remove();
			})
		}
		$close.click( function () { api.close();  });
		//清空之前的弹出消息
		api.clear();
	 	// 添加弹出消息至页面或div
	    $("#tip").length > 0 ? $("#tip").append(api.dom) : $("body").before(api.dom); 
		
		return api;
	}
});  