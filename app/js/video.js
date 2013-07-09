var midStore = new function(){}
midStore.init = function(){
	$(".btn-mini").bind("click",function () {midStore.showDetail(this);});	
}
midStore.queryApp = function(flag,obj){
	$("#result_ul").empty();
	var brother = $(obj).parent().siblings();
	for(var i=0;i<brother.length;i++){
		$(brother[i]).removeClass("active");
	}
	$(obj).parent().addClass("active");
	$("#type_title").html($(obj).html());
	// 0 all 1 new 2 free 001 game 002 music 003 tools 004 others
	var dict = new DynamicDict("UBOSS_DESKTOP_APP_001");
	dict.setValue("OP_TYPE","4");
	dict.setValue("QRY_TYPE","1");
	dict.setValue("APP_MODEL","02");
	if(flag!='0'){
		dict.setValue("QRY_ORDER",flag);
		if(flag=='1'||flag=='2'){
			dict.setValue("LIMIT_NUM","8");
		}
	}
	if(!dict.callService()){
		alert("应用查询失败："+dict.error.Desc);
		return;
	}
	var count = dict.getValue("APP_COUNT");
	for(var i=0;i<count;i++){
		var bo = dict.getBOValue("APP",i);
		var html = '<li class="text-center">'; 
			html+='<img src="'+bo.getValue("APP_PIC")+'" />';
			html+='<p><a href="javascript:void(0)" class="btn btn-mini" ';
			html+='fileUrl="'+bo.getValue("FILE_URL")+'" newFileName="'+bo.getValue("NEW_FILE_NAME")+'">'+bo.getValue("APP_NAME")+'</a></p>'; 
			html+='</li>';

		$("#result_ul").append(html);
	}
	
}
midStore.showDetail = function(obj){
	var fileUrl = $(obj).attr("fileUrl");
	var newFileName = $(obj).attr("newFileName");
	// $("#appId").val(appId);
	// $("#appVersions").val(appVersions);
	// var form = document.getElementById("detailForm");
	// form.action = "./myapp/app_detail.jsp";
	// form.submit();

	var url = $webRoot+"app/playvideo.jsp?fileUrl="+fileUrl+"&newFileName="+newFileName;
	window.open(url,"视频播放","height=450px,width=640px,toolbar=no,menubar=no,resizable=yes,scrollbars=no,directories=no,alwaysRaised=yes,location=no,status=no")
	
}