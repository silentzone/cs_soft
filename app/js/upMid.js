var midUpload = new function(){};
midUpload.init = function(){

}
midUpload.nextBtn = function(){
	var fileId = $("#fileId").val();
	if(fileId==""){
		alert("请上传视频文件");
		return;
	}
	var imgUrl = $("#imgUrl").val();
	if(imgUrl==""){
		alert("请上传视频图片");
		return;
	}
	var form = document.getElementById("fileForm");
	form.method="post";
	form.action = "./mid.jsp";
	form.submit();

}
