
	//滚动条
	var api;
	function jScroll () {
		var $body = $('body'); 
		$body.jScrollPane();
		return $body.data('jsp'); 	
	}
	var refresh =  function () {
		api.reinitialise(); 
	}
	// tab 
	// 滚动条 需要在内部元素高度确定之后再创建 比较合适  
	opt= {}; 
	opt.feedback =  function () { api = jScroll();   }; 
	opt.tabclick = refresh // tab 点击刷新高度 
	$("#tablist").sildeTab(opt);

	$(".replay").bind("click",function(){
		appDetail.replayCommentHtml(this,$(this).attr("commId"));
	});

 	// 编辑
 	// var $textarea = $("<textarea />");
 	// $(".edit").toggle(function () {
 	// 	var $content = $(this).parent().next("p");
 	// 	var str = $content.html();
 	// 	$textarea.val(str)
 		 
 	// 	$content.html("");
 	// 	$content.append($textarea);
 	// 	//刷新页面
 	// 	refresh();

 	// },function () {
 	// 	var $content = $(this).parent().next("p");
 	// 	$content.html($textarea.val());
 	// 	$textarea.remove();
 	// });


var appDetail = new function(){};
appDetail.init = function(){
	this.elemEventBind();
	this.appCountInfo();
}
appDetail.elemEventBind = function(){
	$("#modify_btn").bind("click",function () {appDetail.gotoModify();});
	$("#send_btn").bind("click",function () {appDetail.sendComment();});
}
appDetail.gotoModify = function(){
	var form = document.getElementById("postForm");
	var url = "";
	if($appModel=='02'){
		url = "./mid.jsp";
	}else{
		url = "./detail.jsp";
	}	
	form.action = url;
	form.submit();
}
appDetail.sendComment = function(){
	var comment = $("#comment").trimval();
	if(comment==""||comment.length<5){
		alert("评论不能少于5个字符！");
		$("#comment").focus();
		return;
	}
	var dict = new DynamicDict("UBOSS_DESKTOP_APP_002");
	dict.setValue("OP_TYPE","2");
	dict.setValue("APP_ID",$("#appId").val());
	dict.setValue("APP_VERSIONS",$("#appVersions").val());
	dict.setValue("COMMENT",comment);
	if(!dict.callService()){
		alert("评论发表失败："+dict.error.Desc);
		return;
	}
	var upId = dict.getValue("UP_COMMENT_ID");
	var commId = dict.getValue("COMMENT_ID");
	var sendTime = dict.getValue("SEND_TIME");
	$(".post_list").prepend(this.commentHtml(upId,commId,comment,sendTime));
	$("#comment").val("");
	refresh();
}
appDetail.commentHtml = function(upId,commId,comment,sendTime){
	var html = "";
	html+='<div class="post_item" commId="'+commId+'" upId="'+upId+'">';
	html+='<img class="avatar" src="../../img/avatar92.jpg" />';	
	html+='<div class="post_content">';
	html+='<div class="about">';
	html+='<span class="time">'+sendTime+'</span><span>'+$userName+'</span>'; 
	html+='<input type="button" class="btn btn-mini replay" commId="'+commId+'" onclick="appDetail.replayCommentHtml(this,\''+commId+'\');" value="回复">'; 
	// html+='<button class="btn btn-mini edit">编辑</button>';   
	html+='</div>'; 
	html+='<p>'+comment+'</p>';
	html+='</div>';
	html+='<div class="comment_list" ></div>';
	html+='</div>';
	return html;
}
appDetail.replayHtml = function(commId){
	var html = "";
	//html+='<div class="replay_box" >';
	html+='<div class="post_item" commId="-1" upId="'+commId+'">';
	html+='<img class="avatar" src="../../img/avatar92.jpg" /> ';
	html+='<div class="post_content">';
	html+='<div class="about">';
	html+='<span class="time"></span><span>'+$userName+'</span>'; 
	html+='<input type="button" class="btn btn-mini" value="发表回复" onclick="appDetail.replayComment(this,\''+commId+'\')">'
	html+='</div>';
	html+='<textarea rows="3"></textarea>';
	html+='</div>';
	html+='<div class="comment_list"></div>';
	html+='</div>';
	//html+='</div>';
	return html;
}
appDetail.replayCommentHtml = function(obj,commId){
	var $comments = $(obj).parent().parent(".post_content").next(".comment_list"); 
	
	var last = $comments.children().last();
	if(!last.attr("upId")){// no children
		$comments.append(this.replayHtml(commId));
	}else{
		if(last.attr("upId")==commId&&last.attr("commId")!='-1'){
			$comments.append(this.replayHtml(commId));
		}else{
			last.remove();
		}	
	}
	refresh();
}
appDetail.replayComment = function(obj,commId){
	if(!commId) return;
	var $comments = $(obj).parent().next(); 
	var comment = $comments.trimval();
	if(comment==""||comment.length<5){
		alert("回复不能少于5个字符！");
		$comments.focus();
		return;
	}

	var dict = new DynamicDict("UBOSS_DESKTOP_APP_002");
	dict.setValue("OP_TYPE","2");
	dict.setValue("APP_ID",$("#appId").val());
	dict.setValue("APP_VERSIONS",$("#appVersions").val());
	dict.setValue("COMMENT",comment);
	dict.setValue("UP_ID",commId);
	if(!dict.callService()){
		alert("回复发表失败："+dict.error.Desc);
		return;
	}
	alert("回复发表成功");

	$comments.val("");
	var retCommId = dict.getValue("COMMENT_ID");
	var sendTime = dict.getValue("SEND_TIME");
	var pdiv = $(obj).parent().parent().parent(".post_item");
	pdiv.attr("commId",dict.getValue("COMMENT_ID"));
	$comments.remove();
	$(obj).parent().append("<p>"+comment+"</p>");
	var span = $(obj).parent().children().first();
	span.append(sendTime);
	$(obj).val("回复");
	$(obj).removeAttr("onclick");
	$(obj).attr("commId",retCommId);
	$(obj).bind("click",function(){
		appDetail.replayCommentHtml(this,$(this).attr("commId"));
	});
	// $(obj).append("<span class='btn btn-mini edit' id='edit_"+retCommId+"'>编辑</span>");
	// $("#edit_"+retCommId).toggle(function () {
 // 		var $content = $(this).parent().next("p");
 // 		var str = $content.html();
 // 		$textarea.val(str)
 		 
 // 		$content.html("");
 // 		$content.append($textarea);
 // 		//刷新页面
 // 		refresh();

 // 	},function () {
 // 		var $content = $(this).parent().next("p");
 // 		$content.html($textarea.val());
 // 		$textarea.remove();
 // 		appDetail.updateComment();
 // 	});
}
appDetail.updateComment = function(){

}
appDetail.appScore = function(scoreLevel){
	var dict = new DynamicDict("UBOSS_DESKTOP_APP_002");
	dict.setValue("OP_TYPE","1");
	dict.setValue("APP_ID",$("#appId").val());
	dict.setValue("APP_VERSIONS",$("#appVersions").val());
	dict.setValue("SCORE_RANGE","01");// 整体评分
	dict.setValue("SCORE_LEVEL",scoreLevel);
	if(!dict.callService()){
		alert("评分失败："+dict.error.Desc);
		return;
	}
	alert("评分成功，感谢您的参与");
	return;
}
/* the app good up or down sale 
 * param: flag:2 up sale / 3 down sale
 */
appDetail.appUpDownSale = function(flag,obj){
	var desc = "";
	if(flag=='2') desc = "上架销售";
	else if (flag=='3') desc = "下架停售";

	$.messager.defaults = { ok: desc,cancel:"取消"};
	$.messager.confirm("温馨提醒","您确定要对应用"+desc+"吗？", function (data) {
        if (data) {
            var dict = new DynamicDict("UBOSS_DESKTOP_APP_001");
			dict.setValue("OP_TYPE","8");
			dict.setValue("FLAG",flag);
			dict.setValue("APP_ID",$("#appId").val());
			dict.setValue("APP_VERSIONS",$("#appVersions").val());
			if(!dict.callService()){
				alert(dict.error.Desc);
			}else{
				alert(desc+"成功");
				$("#stateSpan").html(desc);
				$(obj).attr("disabled","disabled");
			}
        }
    });
}
/* tab4 app count information*/
appDetail.appCountInfo = function(){
	var dict = new DynamicDict("UBOSS_DESKTOP_APP_002");
	dict.setValue("OP_TYPE","6");
	dict.setValue("APP_ID",$("#appId").val());
	dict.setValue("APP_VERSIONS",$("#appVersions").val());
	if(!dict.callService()){
		alert("统计失败："+dict.error.Desc);
		return;
	}
	$("#download_td").html(dict.getValue("DOWNLOAD_COUNT"));
	$("#amount_td").html(dict.getValue("AMOUNT")+" 云币");
	var good = "0", normal = "0", bad = "0";
	var count = dict.getValue("SCORE_COUNT");
	for(var i=0;i<count;i++){
		var bo = dict.getBOValue("SCORE",i);
		var level = bo.getValue("SCORE_LEVEL");
		var scoreCount = bo.getValue("SCORE_COUNT");
		if(level=='01') good = scoreCount;
		else if(level=='02') normal = scoreCount;
		else if(level=='03') bad = scoreCount;
	}
	var scoreHtml = "好评:"+good+"  中评:"+normal+"  差评:"+bad;
	$("#score_td").html(scoreHtml);
}