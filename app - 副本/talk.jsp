<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="java.util.HashMap"%>
<%@page import="com.ztesoft.zsmart.core.utils.Base"%>
<%@page import="com.ztesoft.zsmart.core.service.DynamicDict" %> 
<%
	DynamicDict sysLoginDto = (DynamicDict)session.getAttribute("SYS_LOGIN_INFO");
	String userName = "";
	String userCode = "";
	 if(sysLoginDto==null){
	 	userName = "游客";
	 	userCode = "游客";
	 }else{
	 	userName = sysLoginDto.getString("UserName");
 		userCode = sysLoginDto.getString("UserCode");
	 }
%>
<!DOCTYPE html>
<html >
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>IM</title>
<link rel="stylesheet" type="text/css" href="../plugins/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="../plugins/themes/icon.css">
<link href="../plugins/bootstrap/css/bootstrap.css" rel="stylesheet" >
<link href="../css/page.css" rel="stylesheet" type="text/css" />

</head>
<body oncontextmenu="return false" release="CN" style="width:900px; margin:0 auto;" class="talk_page" onload="appTalk.init();" >
	<div class="section">
		<div class="top_toolbar">
			<div class="btn-group" > 
				<!-- <button class="btn">设置</button> -->
				<button class="btn" onclick="appTalk.logout();">退出IM</button>
				<!-- <button class="btn">反馈</button> -->
			</div>
			<!--下拉菜单-->
			<!-- <div class="btn-group"> 
				<button class="btn"> <i class="icon-user"></i>  隐身</button><button class="btn dropdown-toggle" data-toggle="dropdown"><span class="caret"></span>
				</button>
               
                <ul class="dropdown-menu">
                  <li><a href="#">在线</a></li>
                  <li><a href="#">隐身</a></li>
                  <li><a href="#">离开</a></li> 
                  <li class="divider"></li>
                  <li><a href="#">切换用户</a></li> 
                </ul>
            </div> -->	 

			<span class="user_name" id="userShow"></span> 
			<span class="label label-warning">Pro</span>
 
		</div>
		<div class="row-fluid box-content">
			<div class="span3">
				<div class="sidebar-nav">
					<div  class="well">
						<ul class="nav nav-list" >  
							<li class="nav-header">在线用户</li> 
							<li id="vserviceLI" style="display:none;"><i class="icon-headphones"></i>我服务的用户
								<ul class="nav nav-list" id="vserviceUI"></ul>
							</li>
							<li><i class="icon-headphones"></i>服务客服
								<ul class="nav nav-list" id="serviceUL"></ul>
							</li>
							<li><i class="icon-comment"></i>在线注册用户
								<ul class="nav nav-list" id="userUL"></ul>
							</li> 
							<li><i class="icon-user"></i>在线游客
								<ul class="nav nav-list" id="guestUL"></ul>
							</li>

						</ul>
					</div>
				</div>

				<!-- <div class="left_col sidebar-nav"> 	 
					<ul class="nav nav-tabs">
						<li  class="active"><a data-toggle="tab" href="#TAB1">TAB1</a></li>
						<li><a data-toggle="tab" href="#TAB2">TAB2</a></li> 
					</ul>
					<div class="tab-content" >
						<div id="TAB1" class="tab-pane fade active in">
							<p> TAB1 111111111</p><br><br><br><br><br>
						</div>
						<div id="TAB2" class="tab-pane fade">
							<p> TAB222</p>
						</div> 
					</div> 
				</div>  -->  
			</div>
			<div class="span9"> 
				<ul class="nav nav-tabs">
						<li class="active"><a data-toggle="tab" href="#jstx" id="online_a">即时通讯</a></li>
						<li><a data-toggle="tab" href="#zxjk" id="leave_a">在线留言</a></li> 
						<!-- <li><a data-toggle="tab" href="#khgl">客户管理</a></li> 
						<li><a data-toggle="tab" href="#vip">VIP</a></li> --> 
				</ul>
				<div class="tab-content">
						<div id="jstx" class="tab-pane fade active in">
							<div class="talk_window row_fluid">
								<div class="talk_col span8"> 
									<span id="chatPerson"></span>
									<!-- <span class="btn btn-mini"> 
										<i class="icon-plus"></i>加为好友
									</span> --> 
									<span class="btn btn-mini"><i class="icon-comment"></i><a href="javascript:appTalk.clearMsg();">清空聊天记录</a></span>

									<div class="chat_window" id="acctMsgDiv"></div>
									<div class="comment_tools">
										<div class="btn-group pull-right"> 
												<button class="btn btn-primary" onclick="appTalk.sendMsg();" id="Isend"> 发送</button>
												<button class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
													<span class="caret"></span>
												</button> 
								                <ul class="dropdown-menu">
								                  <li><a href="javascript:appTalk.shortcut('0')">按Ctrl+Enter发送消息</a></li>
								                  <li><a href="javascript:appTalk.shortcut('1')">按Enter发送消息</a></li> 
								                </ul>
								        </div>		
								        <div style="float:right;margin-right:5px;" id="shortDiv">按Ctrl+Enter发送消息</div>
										<div class="btn-group"> 
										    <span class="btn btn-mini"> <i class="icon-font"></i></span>
										     <span class="btn btn-mini"> <i class="icon-picture"></i></span>
										      <span class="btn btn-mini"> <i class="icon-file"></i></span>
										      <span class="btn btn-mini"> <i class="icon-camera"></i></span> 

										</div>
									</div>
									<div class="comment_window">  
										<textarea class="span12" rows="3" id="SEND_MSG"> </textarea>  
									</div>
								</div>
								<div class="info_col span4">
									<div class="inner_tab">
										<ul class="nav nav-tabs">
											<li  class="active"><a data-toggle="tab" href="#user">个人信息</a></li>
											<li><a data-toggle="tab" href="#company">公司信息</a></li> 
										</ul>
										<div class="tab-content" style="height:150px;" >
											<div id="user" class="tab-pane fade active in">
												<table class="table">
													<tr>
														<th>用户名</th><th><%=userName%></th>
													</tr>
													<tr>
														<td>账号</td><td><%=userCode%></td>
													</tr>
													
												</table>  
											</div>
											<div id="company" class="tab-pane fade">
												<p></p>
											</div> 
										</div>
									</div><!-- inner_tab -->
									<div class="inner_tab">
										<ul class="nav nav-tabs">
											<li  class="active"><a data-toggle="tab" href="#t1">短语</a></li>
											<li><a data-toggle="tab" href="#t2">帮助</a></li> 
										</ul>
										<div class="tab-content" style="height:180px;" >
											<div id="t1" class="tab-pane fade active in"></div>
											<div id="t2" class="tab-pane fade">
												<p></p>
											</div> 
										</div>
									</div><!-- inner_tab -->


								</div>
									

							</div>
						</div>
						<div id="zxjk" class="tab-pane fade">
							<p id="zxjk_p"></p>
						</div> 
						<!-- <div id="khgl" class="tab-pane fade">
							<p> 客户管理</p>
						</div> 
						<div id="vip" class="tab-pane fade">
							<p> VIP</p>
						</div>  -->
				</div> 
		    </div> 
		</div>
		 <div class="bottom"> 
		 		<!-- <span class="pull-right"><i class="icon-time"></i>在线时长：12小时</span>
				<span>咨询访客: <span class="badge badge-info">8</span></span>
				<span>在线用户: <span class="badge badge-success">3</span></span>
				<span>留言: <span class="badge badge-important">3</span></span>
				<span>VIP: <span class="badge">3</span></span> -->
		 </div>

	</div>  
<script type="text/javascript"  src="../js/jquery-1.8.2.min.js"></script>
<script type="text/javascript" src="../plugins/jquery.easyui.min.js"></script>
<script type="text/javascript" src="../js/artDialog.js"></script>
<script type="text/javascript" src="../js/iframeTools.js"></script>
<script language="javascript" src="../sys/js/request.js"></script>
<script language="javascript" src="../sys/js/dict.js"></script>
<script language="javascript" src="../js/tools.js"></script>
<script src="../plugins/bootstrap/js/bootstrap.js"></script> 
<script type="text/javascript" src="./js/talk.js"></script>
</body>
</html>