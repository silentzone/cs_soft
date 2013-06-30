<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="java.util.HashMap"%>
<%@page import="com.ztesoft.zsmart.core.utils.Base"%>
<%@page import="com.ztesoft.zsmart.core.service.DynamicDict" %> 
<%
 String strWebRoot = "";
 if(strWebRoot==null||strWebRoot.length()==0)
 {
	strWebRoot = request.getScheme();
	strWebRoot += "://";
	strWebRoot += request.getServerName();
 	int port = request.getServerPort();
 	if (port != 80){
 		strWebRoot += ":" + port;
 	}
 	strWebRoot +=  request.getContextPath()+"/";
 }
 DynamicDict sysLoginDto = (DynamicDict)session.getAttribute("SYS_LOGIN_INFO");
 if(sysLoginDto==null){
 	request.getSession().setAttribute("OLD_URL",strWebRoot+"app/myapp.jsp");
	response.sendRedirect(strWebRoot+"app/login.jsp");
	return;
 }
 String userId = sysLoginDto.getString("UserId");
 String userCode = sysLoginDto.getString("UserCode");
 String loginNo = sysLoginDto.getString("LoginNo");
%>

<!DOCTYPE html> 
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>个人中心-上传应用 </title>
	
<link href="../../plugins/bootstrap/css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="../../css/page.css" rel="stylesheet" type="text/css">
<link href="../../plugins/themes/icon.css" rel="stylesheet" type="text/css">
<link href="../../plugins/editor/themes/default/default.css" rel="stylesheet" type="text/css">
</head>

<body style="width:800px; margin:0 auto;">
<div class="section"> 
	<ul class="breadcrumb">
	  <li><a href="../myapp.jsp">我的应用</a> <span class="divider">/</span></li> 
	  <li class="active">上传应用</li>
	</ul>
	<div class="row-fluid">
		<div class="span8">
			<div class="alert alert-info" style="display:none;">
				<span id="result_msg">我的应用上传/修改成功！</span><spna class="close" data-dismiss="alert">&times;</span>
			</div>
				
			<div class="form-horizontal">
				<form action="/upload" enctype="multipart/form-data" method="post"> 
					<div class="control-group">
				    	<label class="control-label" for="inputEmail"> 
				    		上传应用  
				    	</label>
					    <div class="controls">
							<input type="text" id="url" value="" readOnly/> <input type="button" id="insertfile" value="选择应用" />
					    </div>
				    </div> 
		    	</form> 
		    	<form action="/upload2" enctype="multipart/form-data" method="post"> 
					<div class="control-group">
				    	<label class="control-label" for="inputEmail"> 
				    		上传应用图片
				    	</label>
					    <div class="controls">
							<input type="text" id="url3" value="" readOnly/> <input type="button" id="image3" value="选择图片" />
					    </div>
				    </div> 
		    	</form>
		    	<div class="control-group"> 
					    <div class="controls">
					    	<label>上传图片预览</label>
					    	<img class="img-polaroid" src="../../img/myapp_default.png" />
					    </div>
				</div> 
				<div class="control-group">
				    	 
					    <div class="controls">
					    	 <form method="post" id="fileForm" name="fileForm" >
					    	 	<input type="hidden" name="fileId" id="fileId" value="">
					    	 	<input type="hidden" name="imgUrl" id="imgUrl" value="">
					    	 </form>
					    	 <input type="button" value="下一步" class="btn" onclick="appUpload.nextBtn();">
					    </div>
				</div> 
			</div>	    
			
		</div>
		<div class="span4">

				<div class="silder_right well">
					<ul class="nav nav-list" id="tablist"> 
			          <li class="nav-header">上传步骤</li> 
			          <li class="active"><a href="#plan1"><i class="icon-arrow-up"></i>1 上传应用</a></li>
			          <li><a href="#plan2"><i class="icon-pencil"></i>2 填写应用信息</a></li>  
			          <li><a href="#plan3" class="cookie-delete"><i class=" icon-ok"></i>3 上传成功</a></li>

			          <li class="nav-header">获取帮助</li>
			          <li><a href="#"><i class="icon-question-sign"></i> 上传遇到问题?</a></li>
			    </ul>
				</div>
		
		</div>
	</div>
</div>	
<script type="text/javascript" src="../../js/jquery-1.8.2.min.js"></script>
<script type="text/javascript" src="../../plugins/jquery.easyui.min.js"></script>
<script type="text/javascript" src="../../plugins/bootstrap/js/bootstrap.js"></script>  
<script type="text/javascript" src="../../plugins/editor/kindeditor.js"></script>
<script type="text/javascript" src="../../plugins/editor/lang/zh_CN.js"></script>
<script language="javascript" src="../../sys/js/request.js"></script>
<script language="javascript" src="../../sys/js/jquery.xml2json.js"></script>
<script language="javascript" src="../../sys/js/dict.js"></script>
<script type="text/javascript" src="../js/public.js"></script>
<script type="text/javascript" src="../js/myapp.js"></script>
<script>
KindEditor.ready(function(K) {
	var editor = K.editor({
		allowFileManager : false,
		uploadJson : "${pageContext.request.contextPath}/uploadFile.do"
	});
	K('#insertfile').click(function() {
		editor.loadPlugin('insertappfile', function() {
			editor.plugin.fileAppDialog({
				showRemote : false,
				fileUrl : K('#url').val(),
				clickFn : function(url, title,fileEname,extFileValue,fileId) {
					if(extFileValue!=""&&extFileValue!=null)
						K('#url').val(extFileValue);
					else
						K('#url').val(fileEname);
					$("#fileId").val(fileId);
					editor.hideDialog();
				}
			});
		});
	});
	K('#image3').click(function() {
		editor.loadPlugin('image', function() {
			editor.plugin.imageDialog({
				showRemote : false,
				imageUrl : K('#url3').val(),
				clickFn : function(url, title, width, height, border, align) {
					K('#url3').val(url);
					$("#imgUrl").val(url);
					$(".img-polaroid").attr("src",url); 
					editor.hideDialog();
				}
			});
		});
	});
});
</script>
</body>

</html>