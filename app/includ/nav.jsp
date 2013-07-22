<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="java.util.HashMap"%>
<%@page import="com.ztesoft.zsmart.core.utils.Base"%>
<%@page import="com.ztesoft.zsmart.core.service.DynamicDict" %> 
<%
String strWebRoot = "";
if(strWebRoot==null||strWebRoot.length()==0){
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
// if(sysLoginDto==null){
// 	request.getSession().setAttribute("OLD_URL",strWebRoot+"app/cloud.jsp");
// 	response.sendRedirect(strWebRoot+"app/login.jsp");
// 	return;
// }
%>

 					<li id="newserver" ><a href="cloud.jsp"><i class="icon-plus"></i>新建服务</a></li>
					<li id="buyserver1"><a href="cloud_buy.jsp?buttype=1"><i class="icon-shopping-cart"></i>已购服务</a></li>
                    <!-- <li id="buyserver2"><a href="cloud_buy.jsp?buttype=2"><i class="icon-shopping-cart"></i>人才服务已购服务</a></li> -->
                   
                   <!--  <li id="mydesktop" ><a onClick="openConsole();" ><i class="icon-share"></i>我的桌面</a></li>  -->
                    <!-- <li id="myserver"><a href="cloudShowLinuVm.jsp"><i class="icon-hdd"></i>我的主机</a></li> -->
                  <!--   <li id="talentService"><a href="cloud_talentService.jsp"><i class="icon-user"></i>人才服务</a></li>  -->
                     <!-- <li id="cloudShowAccount"><a href="cloudShowAccount.jsp"><i class="icon-folder-close"></i>帐号管理</a></li>  -->
                    
                     <%
						//判断用户id是否是管理员
						
						String theUserId = "";
						if(sysLoginDto!=null){
							   theUserId= sysLoginDto.getString("UserId");
						 }
						boolean havePower = false;
						DynamicDict detailsBO = sysLoginDto.getBOByName("UserDetailsDto");
					 	int roleNum = detailsBO.getCountByName("USER_ROLE");
						for(int i=0;i<roleNum;i++){
							HashMap roleDict = (HashMap)detailsBO.getValueByName("USER_ROLE", i);
							String roleId = (String)roleDict.get("ROLE_ID");
							if(roleId.equals("sys00001")){
								havePower = true;
								break;
							}
						}
					 if(havePower){ %>
					<li id="adminchk"><a href="cloudCheck.jsp"><i class="icon-lock"></i>服务管理</a></li> 
                    <li id="servermot"><a href="cloudMoniter.jsp"><i class="icon-tasks"></i>服务器监控</a></li>  
                   <!--  <li id="serverVMmot"><a href="cloudMoniterVM.jsp"><i class="icon-eye-open"></i>虚拟机监控</a></li> --> 
                    <% }%>