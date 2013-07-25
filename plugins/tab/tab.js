 
$.fn.extend({  
	sildeTab : function (opt) {

		var _opt = {
			 tabclick: null, 
			 feedback: null
		};
		// api  extend 
		$.extend(_opt,opt)
		
		 // 定义一个滑动的动作

		var _this = this; 

		// if(typeof opt == "object") {
		// 	for (var a in _opt ) {
		// 		if(opt[a]) {  
		// 			_opt[a] = opt[a] } 
		// 	}
		// }
		var init = function () {  
			var $tab = _this.find("a"); 
			$tab.each(function (idx) {
				var id = $(this).attr("href");
				// $(this).attr("href","javascript:void(0);") 
				if(idx !== 0) {
					$(id).hide();
				}
				//bind event
				$(this).bind('click', function() {
					// 淡入 // 淡出
					 $(this).parent("li").addClass("active").siblings().removeClass("active");
					 $(id).fadeIn().siblings().hide();
					 if(_opt.tabclick) _opt.tabclick();  
					 return false; 
				}); 
			})

			// 回调
			if(_opt.feedback) _opt.feedback();  
		}();
		// // dom ready 
		// $(function () { 
		// 	init(); 
		// })
	}
});