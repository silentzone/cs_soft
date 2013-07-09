<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="java.util.HashMap"%>
<%@page import="com.ztesoft.zsmart.core.utils.Base"%>
<%@page import="com.ztesoft.zsmart.core.service.DynamicDict" %> 

<html lang="zh_CN">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
	<link rel="stylesheet" type="text/css" href="../plugins/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="../plugins/themes/icon.css">
	<link href="../css/page.css" rel="stylesheet" type="text/css" />
	<link href="../plugins/bootstrap/css/bootstrap.css" rel="stylesheet" >
	<link href="../css/validform.css" rel="stylesheet" type="text/css" />

	<script type="text/javascript" src="../js/jquery-1.8.2.min.js"></script>
	<script type="text/javascript" src="../plugins/jquery.easyui.min.js"></script>
	<script language="javascript" src="../sys/js/request.js"></script>
	<script language="javascript" src="../sys/js/jquery.xml2json.js"></script>
	<script language="javascript" src="../sys/js/dict.js"></script>
   <script language="javascript" src="cloud_login.js"></script>

</head>
<script> 
function openwind(){
	//https://113.247.222.118/Citrix/XenApp/site/default.aspx","newWindow
	//http://localhost:8080/XenApp/site/default.aspx
	//得到
	//var myiframe  = document.getElementById("myiframe");
	/*var myiframe  =  document.frames["myiframe"].document;
	myiframe.getElementById("user").value ='demouser';
	myiframe.getElementById("password").value ='123456';
	myiframe.document.forms[0].submit();
	*/
//	var win = window.open ('https://113.247.222.118/Citrix/CSSP-Cloud/auth/login.aspx', 'newwindow', 'height=0, width=0, top=10000,left=10000, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no,alwaysLowered=yes') 
	var dict = new DynamicDict("UBOSS_USERMGR_001");
	dict.setValue("ANSYC_FLAG","7");
	dict.setValue("INST_ID","");
	if(!dict.callService()){
		$.messager.defaults = { ok: "确定"};
		$.messager.alert('温馨提醒','保存失败：'+dict.error.Desc,'error'); 
		return;
	}else{
		var resource = dict.getValue("HTMLRESULT");
		//
		//resource = resource.replace('login.aspx','Cloud_GetDeskTop.jsp');
		//使用div 来发送请求 成功
		
		resource = resource.replace('login.aspx','https://113.247.222.118/Citrix/CSSP-Cloud/auth/login.aspx');
		var iDiv = document.createElement("div");
		iDiv.id="myXenAppdiv";
		//iDiv.style.display="none";
		iDiv.innerHTML = resource;
		//iDiv.style.display="none";
		document.body.appendChild(iDiv);
		document.getElementById("user").value ="demouser";
		document.getElementById("password").value ="123456";
		document.forms["CitrixForm"].target="_blank";
		document.forms["CitrixForm"].submit();
		//setTimeout("document.forms['CitrixForm'].submit();",3000);
		
		
		//使用 iframe发送请求
		/*resource = resource.replace('login.aspx','https://113.247.222.118/Citrix/CSSP-Cloud/whtest.html?user=demouser&pwd=123456');
		var doc = document.frames["loginform"].document;
		doc.write(resource);
		doc.getElementById("user").value ="demouser";
		doc.getElementById("password").value ="123456";
		doc.forms["CitrixForm"].target="_blank";
		doc.forms["CitrixForm"].mithod ='GET';
		//doc.forms["CitrixForm"].target="_blank"
		doc.forms["CitrixForm"].submit();
		setTimeout("submitFrameAgain()",3000);
		*/
		
	}
	
}
    function submitFrameAgain(){
		//document.frames["loginform"].document.location.replace("https://113.247.222.118/Citrix/CSSP-Cloud/whtest.html?user=demouser&pwd=123456");
		
		var doc = document.frames["loginform"].document;
		doc.forms["CitrixForm"].target="_self"
		doc.forms["CitrixForm"].submit();
	}

function ss(){
	//var myFrame = document.getElementById("myiframe");
	//myFrame.src = "https://113.247.222.118/Citrix/CSSP-Cloud/whtest.html?user=demouser&pwd=123456";
	var mywins = myPopupWindow;
	
	//mywin.location ="https://113.247.222.118/Citrix/CSSP-Cloud/whtest.html?user=demouser&pwd=123456";
	

}
function submitForm() {
        document.forms[0].submit();
}

var mywin ;
var myPopupWindow;  //弹出窗口
function openw(){
	
	//var win1=window.open("https://113.247.222.118/Citrix/CSSP-Cloud/whtest.html?user=demouser&pwd=123456","mywindow",'height=0,width=0,top=-1000,left=-1000,toolbar=no,menubar=no,scrollbars=no, resizable=yes,location=no, status=no');
	//win1.location ="https://113.247.222.118/Citrix/CSSP-Cloud/whtest.html?user=demouser&pwd=123456";
	//setTimeout("openw()",3000);
	//window.open("https://113.247.222.118/Citrix/CSSP-Cloud/whtest.html?user=demouser&pwd=123456","mywindow",'height=400,width=400,display=none,toolbar=no,menubar=no,scrollbars=no, resizable=yes,location=no, status=no');
	var playerUrl = 'https://113.247.222.118/Citrix/CSSP-Cloud/whtest.html?user=demouser&pwd=123456';
	var popupPlayer= window.open('', 'popupPlayer', 'width=150,height=100') ;
	if(popupPlayer.location == 'about:blank' ){
	    popupPlayer.location = playerUrl ;	
	}
	popupPlayer.focus();
	//window.open('cloudConsole.jsp','_blank');
}

//用ajax来提交表单
function ajaxformsubmit (){
	//调用
		$('#CitrixForm').ajaxForm();   
		$('#CitrixForm').submit(function() {
	    // 提交表单
	    $(this).ajaxSubmit();
	    // 为了防止普通浏览器进行表单提交和产生页面导航（防止页面刷新？）返回false
	    	return false;
	   });
	   
}

function GETRRDBYHTTP(){
var dict = new DynamicDict("UBOSS_USERMGR_001");
	dict.setValue("ANSYC_FLAG","10");
	dict.setValue("INST_ID","");
	if(!dict.callService()){
		$.messager.defaults = { ok: "确定"};
		$.messager.alert('温馨提醒','保存失败：'+dict.error.Desc,'error'); 
		return;
	}else{
		var resource = dict.getValue("HTMLRESULT");

		resource = resource.replace('login.aspx','https://113.247.222.118/Citrix/CSSP-Cloud/auth/login.aspx');
		var iDiv = document.createElement("div");
		iDiv.id="myhttprrd";
		//iDiv.style.display="none";
		iDiv.innerHTML = resource;
		//iDiv.style.display="none";
		document.body.appendChild(iDiv);
	}
}

</script>
<script language="vbscript">
	//mywin=window.open("https://113.247.222.118/Citrix/CSSP-Cloud/whtest.html?user=demouser&pwd=123456","mywin","width=400,height=100")
	//mywin.close

</script>
<body onLoad="">
<p>console界面</p>
<!--<iframe src="https://113.247.222.118/Citrix/XenApp/site/default.aspx" width="100%" height="60%" id="myiframe" > web interface Frame </iframe> -->
<!--<iframe src="https://113.247.222.118/Citrix/CSSP-Cloud/site/default.aspx" width="100%" height="1000" id="myiframe" > web interface Frame </iframe> -->

<!--<iframe src="http://localhost:8080/XenApp" width="100%" height="60%" id="myiframe" > web interface Frame </iframe> -->
<!--<div id="iDiv"></div> -->
<iframe src="#" width="100%" height="400" id="loginform"> </iframe> 
<input type="button" name="aa" id="aa" value="提交" onClick="openwind();" />
<input type="button" name="aa" id="aa" value="再次提交" onClick="submitFrameAgain();" />
<input type="button" name="aa" id="aa" value="打开窗口" onClick="openw();" />
<input type="button" name="aa" id="aa" value="检测弹出窗口" onClick="ss();" />
<input type="button" name="aa" id="aa" value="ajaxform提交" onClick="ajaxformsubmit();" />
<input type="button" name="aa" id="aa" value="实际环境中的登录" onClick="httpsRemoteClientLogin();" />
<input type="button" name="aa" id="aa" value="测试RRD页面获取" onClick="GETRRDBYHTTP();" />
<div id="ak">
</div>
<p>&nbsp;</p>
</body>
</html>