<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="com.ztesoft.zsmart.web.handler.BusiFacadeServlet"%>
<% 
	session.setAttribute("SP_ID","0"); 
	session.setAttribute("SP_URL","");
%>
<%!
  String UserName = "";
  public String getCookieValue(HttpServletRequest request,String cName)
  {
      Cookie[] cookies = request.getCookies();
      Cookie sCookie = null;
      if(cookies!=null)
      {
          for (int i = 0; i < cookies.length; i++) {
              sCookie = cookies[i];
              if(sCookie.getName().equals(cName))
              {
                  return sCookie.getValue();
              }
          }
      }
      return "";
  }
%>
<%
	UserName = getCookieValue(request,"UserName");
%>
<!DOCTYPE html>
<html>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link href="frm/style/zh_CN/pagecss/login_cmic.css" rel="stylesheet" type="text/css">
	<title>登录调用</title>
	<script language="javascript" src="js/jquery-1.8.2.min.js"></script>
	<script language="javascript" src="sys/js/Security.js"></script>
	<script language="javascript" src="sys/js/request.js"></script>
	<script language="javascript" src="sys/js/dict.js"></script>
	<script language="javascript" src="sys/js/old/tools.js"></script>
	<script language="javascript" src="sys/js/old/jdo.js"></script>
</head>
<body>
<div class="body_wrap"> 
	<form id="fm_login" action="loginservlet.do?action=login" METHOD="POST" onSubmit="return encrypt();">
	<input class="ipt" id="edt_username" type="text" maxlength="22" size="20" name="edt_username" value="<%=UserName%>" />				
	<input class="ipt icon_pwd" id="edt_pwd" type="password"  NAME="edt_pwd" size="20" />
	 <input type="hidden" id="md5Password" NAME="md5Password">							
	<input type="submit" id="imgLoginBt"  NAME="imgLoginBt" class="imgLoginBt" value="登录" />
	<input type="button" onclick="ck();" class="imgLoginBt" value="test" />
	</form>
</div>
</body>
<script language="javascript" >
function encrypt()
{ 

alert("1")
	// 验证用户名
	var userName = $("#edt_username").val();
alert(userName)
	if( !userName && userName == "") {
		/* $tip.html("用户名不能为空"); */
		return false
	} else {
		/* $tip.html(""); */
	}

	//验证密码
	var password = $('#edt_pwd').val();
	alert("1="+password)
	if(password != null && password !="")
	{
		var base64Password = Base64.base64encode(Base64.utf16to8(password));
		var md5Password = MD5.toMD5(base64Password);
		alert(md5Password)
		$('#md5Password').val(md5Password);
		/* $tip.html(""); */
	} else {
		/* $tip.html("密码不能为空"); */
		return false
	}

	
	return true;
}
function ck(){
	/* var dict = new DynamicDict("UBOSS_DESKTOP_USER_001");
	dict.setValue("OP_TYPE","4");
	dict.setValue("USER_CODE","admin");
	
	if(!dict.callService()){
		alert("调用出错");
	}else{
		var user = dict.getValue("USER");
		alert(user.getValue("USER_CODE"));
	} */
	
	var dict = new DynamicDict("UBOSS_DESKTOP_USER_001");
	dict.setValue("OP_TYPE","1");
	var userObj = new DynamicDictBo(dict.dataBO,"USER");
	userObj.setValue("INPUT_PWD","11");
	userObj.setValue("USER_NAME","长沙软件园");
	userObj.setValue("USER_CODE","cssoft");
	userObj.setValue("USER_REG_TYPE","1");
	userObj.setValue("USER_TYPE","01");
	userObj.setValue("IS_LOCKED","0");
	var billObj = new DynamicDictBo(userObj.dataBO,"USER_BILL");
	billObj.setValue("BILL_NAME","第一账户");
	var bankObj1 = new DynamicDictBo(billObj.dataBO,"BILL_BANK");
	bankObj1.setValue("BANK_NAME","中国银行");
	bankObj1.setValue("BANK_USER","长沙软件园");
	bankObj1.setValue("BANK_CODE","01234576");
	bankObj1.setValue("CARD_TYPE","0");
	bankObj1.setValue("NOTES","主卡片");
	var bankObj2 = new DynamicDictBo(billObj.dataBO,"BILL_BANK");
	bankObj2.setValue("BANK_NAME","工商银行");
	bankObj2.setValue("BANK_USER","长沙软件园财务部");
	bankObj2.setValue("BANK_CODE","8888888");
	bankObj2.setValue("CARD_TYPE","1");
	bankObj2.setValue("NOTES","附卡片");

	// var dict = new DynamicDict("UBOSS_DESKTOP_IM_001");
	// dict.setValue("OP_TYPE","1");
	
	alert(dict.getXml());
	if(!dict.callService()){
		alert(dict.error.Desc);
	}else{
		var userId = dict.getValue("USER_ID");
		alert(userId);
	}
}
</script>
</html>