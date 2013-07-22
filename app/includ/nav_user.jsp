<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="java.util.HashMap"%>
<%@page import="com.ztesoft.zsmart.core.utils.Base"%>
<%@page import="com.ztesoft.zsmart.core.service.DynamicDict" %> 
<%
 DynamicDict sysLoginDto = (DynamicDict)session.getAttribute("SYS_LOGIN_INFO");
 if(sysLoginDto==null){
	return;
 }
 DynamicDict detailsBO = sysLoginDto.getBOByName("UserDetailsDto");
 int roleNum = detailsBO.getCountByName("USER_ROLE");
 boolean havePower = false;
 for(int i=0;i<roleNum;i++){
	HashMap roleDict = (HashMap)detailsBO.getValueByName("USER_ROLE", i);
	String roleId = (String)roleDict.get("ROLE_ID");
	if(roleId.equals("video00001")){
		havePower = true;
		break;
	}
 }
%>
<!-- httpsRemoteClientLogin -->
<script language="javascript" src="cloud_login.js"></script>

<li id="iuser"><a href="user.jsp"><i class="icon-user"></i>个人信息</a></li>
<li id="iaccount"><a href="account.jsp"><i class="icon-bookmark"></i>账户信息 </a></li>
<li id="myapp"><a href="myapp.jsp"><i class="icon-inbox"></i>我的应用</a></li> 
<%if(havePower){%>
<li id="myvideo"><a href="myvideo.jsp"><i class="icon-film"></i>我的视频</a></li>
<%}%>
<li id="modifyPWD"><a href="modifyPWD.jsp"><i class="icon-comment"></i>密码修改</a></li>
<li id="myserver"><a href="cloudShowLinuVm.jsp"><i class="icon-hdd"></i>我的主机</a></li>
<li id="serverVMmot"><a href="cloudMoniterVM.jsp"><i class="icon-eye-open"></i>虚拟机监控</a></li>
<li id="modifyPWD"><a href="javascript:void(0);" onClick="httpsRemoteClientLogin();"><i class="icon-share"></i>我的桌面</a></li>


