<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.HashMap"%>
<%@page import="com.ztesoft.zsmart.core.utils.Base"%>
<%@page import="com.ztesoft.zsmart.core.service.DynamicDict" %> 
<%@page import="com.ztesoft.uboss.desktop.DesktopPublic" %> 
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
 String fileId = request.getParameter("fileId")==null?"":(String)request.getParameter("fileId");
 if(fileId.equals("")) return;
 String imgUrl = request.getParameter("imgUrl")==null?"":(String)request.getParameter("imgUrl");
 DynamicDict dict = new DynamicDict();
 dict.setServiceName("UBOSS_DESKTOP_FL_001");
 dict.setValueByName("OP_TYPE","4");
 dict.setValueByName("FILE_ID",fileId);
 dict.setValueByName("USER_ID",userId);
 dict.setValueByName("STATE","1");
 DesktopPublic.webCallExternal(dict);
 long fileCount = dict.getLong("FILE_COUNT");
 // ArrayList fileList = (ArrayList)dict.getCountByName("FILE");
 if(fileCount!=1) return;
 HashMap map = (HashMap)dict.getValueByName("FILE", 0);
 dict.destroy();
 java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
 java.util.Date currentTime = new java.util.Date();//得到当前系统时间 
 String eff_date = formatter.format(currentTime); //将日期时间格式化 
%>

<!DOCTYPE html> 
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>个人中心-上传应用 </title>
<link rel="stylesheet" type="text/css" href="../../plugins/themes/default/easyui.css">	
<link href="../../plugins/bootstrap/css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="../../css/page.css" rel="stylesheet" rel="stylesheet" type="text/css">
<link type="text/css" href="../../plugins/jscroll/jscroll.css" rel="stylesheet" media="all" /> 
<link href="../../plugins/themes/icon.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="../../plugins/editor/themes/default/default.css" />
</head>

<body class="page" style="width:800px; height:600px;" onload="appDetail.init();">
	<div class="section"> 
		<ul class="breadcrumb">
			<li><a href="../myapp.jsp">我的应用</a> <span class="divider">/</span></li> 
			<li class="active">填写应用信息</li>
		</ul>

		<div class="row-fluid">
			<div class="span8">
				<div class="silder_left">
					<div class="alert alert-info" style="display:none;">
						我的应用上传/修改成功！<spna class="close" data-dismiss="alert">&times;</span>
					</div>
					<div class="form-horizontal">
						<div class="myapp_item control-group">
							<span class="control-label">
								<img src="<%=imgUrl%>" /> 
							</span>
							<div  class="controls">
								<ul>
									<li>文件大小：<%=map.get("FILE_SIZE")%> kb</li>
									<li>文件类型：<%=map.get("EXT_NAME")%></li>
									<li>上传时间: <%=map.get("CREATE_TIME")%>  </li> 
								</ul> 
							</div> 

						</div> 
						<div class="control-group">
							<label class="control-label"> 
								版本号:
							</label>
							<div class="controls"> 
								<input type="text" id="app_versions"/>  
							</div>
						</div> 
						<div class="control-group">
							<label class="control-label"> 
								应用名称:
							</label>
							<div class="controls">
								<input type="text"  id="app_name" value=""/>  
							</div>
						</div> 
						<div class="control-group">
							<label class="control-label"> 
								有效期:
							</label>
							<div class="controls">
									<label class="color_gray"> 
										生效日期
									</label>
								    <span class="input-append" >
									    <input class="text Wdate" type="text" id="eff_date" onClick="WdatePicker({dateFmt: 'yyyy-MM-dd HH:mm:ss'})" value="<%=eff_date%>"> 
									</span>  
									<label class="color_gray"> 
										失效日期
									</label>
									<div class="input-append" > 
									    <input class="text Wdate" type="text" id="exp_date" onClick="WdatePicker({dateFmt: 'yyyy-MM-dd HH:mm:ss',minDate:'#F{$dp.$D(\'eff_date\')}'})">
									</div>  

							</div>
						</div>
						<div class="control-group">
							<label class="control-label"> 
								应用级别
							</label>
							<div class="controls"> 
								<label class="radio inline">
									<input type="radio" checked="true" value="00" name="app_level">
									系统级应用
								</label>
								<label class="radio inline">
									<input type="radio" value="01" name="app_level">
									企业级应用
								</label>
								<label class="radio inline">
									<input type="radio" value="02" name="app_level">
									个人应用
								</label>     
							</div>
						</div> 
						<div class="control-group">
							<label class="control-label"> 
								应用编码 			    	
							</label>
							<div class="controls"> 
								 <input  type="text" value="" id="app_code">
							</div>
						</div> 
						<div class="control-group">
							<label class="control-label"> 
								应用条码		    	
							</label>
							<div class="controls"> 
								<input  type="text" value="" id="app_bar_code">
							</div>
						</div> 
						<div class="control-group">
							<label class="control-label"> 
								计费方式	    	
							</label>
								<div class="controls" id="t_radio"  > 
									<label class="radio inline"> 
										<input type="radio"  value="0"  name="charge_mode"  checked="true" >
										免费
									</label>
									<label class="radio inline">
										<input type="radio"  value="1"  name="charge_mode">
										收费
									</label> 

								</div>
						</div>
						<div class="control-group" id="charge_value"> 
							<label class="control-label"> 
								价格    	
							</label>
							<div class="controls" id="tab_radion">
								<div class=" input-append">
									<input type="text" class="span5" id="price"/>
									<span class="add-on">元</span>
								</div>
							</div>

						</div> 
						<div class="control-group" > 
							<label class="control-label"> 
								应用标签    	
							</label>
							<div class="controls" > 
								<!-- 这里要改一下，改成checkbox list class=" input-append" -->
								<div id="chkbox_list">
									<div class="ipt span7" name="typelist" ></div>
									<span class="btn"> 添加 <span class="caret"></span></span>
								</div> 

							</div>
							<div class="controls" id="tab_radion"> 
								 
							</div> 
						</div> 


						<div class="control-group" > 
							<label class="control-label"> 
								简介    	
							</label>
							<div class="controls"> 
								<textarea rows="3" id="remark"></textarea> 
							</div> 
						</div>
						<div class="control-group" >

							<label class="control-label"> 
								应用描述   	
							</label>
							<div class="controls"> 
								<textarea style="width:500px;height:200px;" id="app_desc" name="app_desc"></textarea> 
							</div>

						</div> 

						<div class="control-group"> 
							<div class="controls">
							 	<input type="button" value="保存" class="btn" onclick="appDetail.saveApp();">
							</div>
						</div> 
					</div>
				</div>	     
			</div> <!-- span 8-->
			<div class="span4"> 
				<div class="silder_right well">
					<ul class="nav nav-list" id="tablist"> 
						<li class="nav-header">上传步骤</li> 
						<li><a href="#plan1"><i class="icon-arrow-up"></i> 1 上传应用</a></li>
						<li class="active"><a href="#plan2"><i class="icon-pencil"></i>2 填写应用信息</a></li> 
						<li><a href="#plan3" class="cookie-delete"><i class=" icon-ok"></i>3 上传成功</a></li> 
						<li class="nav-header">获取帮助</li>
						<li><a href="#"><i class="icon-question-sign"></i> 上传遇到问题?</a></li>
					</ul>
				</div>

			</div>
		</div> <!--row-fluid--> 
	</div>	
<script type="text/javascript" src="../../js/jquery-1.8.2.min.js"></script>
<script type="text/javascript" src="../../plugins/jquery.easyui.min.js"></script>
<script type="text/javascript" src="../../plugins/bootstrap/js/bootstrap.js"></script>  
<script type="text/javascript" src="../../plugins/jscroll/jquery.mousewheel.js"></script>
<script type="text/javascript" src="../../plugins/jscroll/mwheelIntent.js"></script>
<script type="text/javascript" src="../../plugins/jscroll/jscroll.js"></script>
<script type="text/javascript" src="../../plugins/chklist/chklist.js"></script>
<script type="text/javascript" src="../../plugins/editor/kindeditor.js"></script>
<script type="text/javascript" src="../../plugins/editor/lang/zh_CN.js"></script>
<script type="text/javascript" src="../../plugins/datetimepicker/WdatePicker.js"></script>
<script type="text/javascript" src="../../sys/js/request.js"></script>
<script type="text/javascript" src="../../sys/js/jquery.xml2json.js"></script>
<script type="text/javascript" src="../../sys/js/dict.js"></script>
<script type="text/javascript" src="../js/public.js"></script>
<script type="text/javascript" src="../js/myapp.js"></script>
</body>
<script type="text/javascript">
var $userId = "<%=userId%>";
var $fileId = "<%=fileId%>";
var $imgUrl = "<%=imgUrl%>";

$('body').jScrollPane();
var $editor;
KindEditor.ready(function(K) {
	$editor = K.create('textarea[name="app_desc"]', {
		resizeType : 0,
		allowPreviewEmoticons : false,
		uploadJson : "${pageContext.request.contextPath}/uploadFile.do",
		allowImageUpload : true,
		items : [
			'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
			'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
			'insertunorderedlist', '|', 'emoticons', 'image', 'link']
	});
});
</script>
</html>