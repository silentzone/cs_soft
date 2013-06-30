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
 // if(fileId.equals("")) return;
 // DynamicDict dict = new DynamicDict();
 // dict.setServiceName("UBOSS_DESKTOP_FL_001");
 // dict.setValueByName("OP_TYPE","4");
 // dict.setValueByName("FILE_ID",fileId);
 // dict.setValueByName("USER_ID",userId);
 // dict.setValueByName("STATE","1");
 // DesktopPublic.webCallExternal(dict);
 // long fileCount = dict.getLong("FILE_COUNT");
 // // ArrayList fileList = (ArrayList)dict.getCountByName("FILE");
 // if(fileCount!=1) return;
 // HashMap map = (HashMap)dict.getValueByName("FILE", 0);
 // dict.destroy();
%>

<!DOCTYPE html> 
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>应用中心-查看应用 </title>
<link rel="stylesheet" type="text/css" href="../../plugins/themes/default/easyui.css">	
<link href="../../plugins/bootstrap/css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="../../css/page.css" rel="stylesheet" rel="stylesheet" type="text/css">
<link type="text/css" href="../../plugins/jscroll/jscroll.css" rel="stylesheet" media="all" /> 
<link href="../../plugins/themes/icon.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="../../plugins/editor/themes/default/default.css" />
</head>

<body class="page" style="width:800px; height:600px;"> 
<div class="section"> 
	<ul class="breadcrumb">
	  <li><a href="../myapp.html">我的应用</a> ( 应用中心 ) <span class="divider">/</span></li> 
	  <li class="active">查看</li>
	</ul>

	<div class="row-fluid">
		<div class="span3">
			<ul class="list silder_left"> 
				<li><img class="img-polaroid" src="../../img/myapp_default.png" /></li>
				<li><h5>app 应用名称</h5></li>
				<li>
					<a href="pay.html" class="btn btn-success"> 购买 </a> 
					<br />
					( 开发者显示修改)
					<br />
					<a href="updata.html" class="btn"> 修改 </a> 
					<br />
					 (非开发的已购买者显示平分)
					<div class="btn-group">
		                <span class="btn">评分</span>
		                <span data-toggle="dropdown" class="btn dropdown-toggle"><span class="caret"></span></span>
		                <ul class="dropdown-menu">
		                  <li><a href="#good">好评</a></li>
		                  <li><a href="#normal">一般</a></li>
		                  <li><a href="#bad">差评</a></li> 
		                </ul>
		            </div>
		            
		        </li> 
				<li class="color_gray">文件大小：12.5 kb</li>
				<li class="color_gray">文件类型：.exe</li>
				<li class="color_gray">上传时间: 2012.01.12 </li> 
			</ul>   
		</div> 
		<div class="span9">
			<div class="silder_right">
				<ul class="nav nav-tabs" id="tablist">
				  <li class="active"><a href="#tab1">详细</a></li>
				  <li><a href="#tab2"><i class="icon-comment"></i> 评论</a></li>
				  <li><a href="#tab3">状态</a></li>
				  <li><a href="#tab4">统计</a></li>
				</ul> 
				<div class="tab_content">
					<div id="tab1">
					    <div class="guide_box">
					    	<h4>简介</h4>
					    	<p>这里由富文本提交内容</p>
					    	<h4>版本1.0说明</h4>
					    	<p>使用指南/说明/API</p>
					    	<h4>描述</h4>
					    	<p>描述.....</p>
					    	
					    </div>
						<table class="table">
							<tr>
								<td>版本号</td>
								<td>1.0</td>
							</tr>
							<tr>
								<td>有效期</td>
								<td>
									    <span class="span5"> 
											生效日期 : 2012-01-20 
										</span>
									    
										<span class="span5"> 
											失效日期 : 2012-03-20 
										</span>
								</td>
							</tr>
							<tr>
								<td>应用级别</td>
								<td> 系统级应用</td>
							</tr>
							<tr>
								<td>应用编码</td>
								<td>000011</td>
							</tr>
							<tr>
								<td>二维码</td>
								<td>(暂无)</td>
							</tr>
							<tr>
								<td>类别</td>
								<td><span class='label label-info'>热门</span> <span class='label label-info'>高级</span></td>
							</tr>
							 
						</table>
						<a href="detail.html" class="btn"> 编辑</a> (开发者显示) 
					</div><!-- tab 1 -->
					<div id="tab2"> 
						<div class="replay_box" >
							<div class="post_item">
								<img class="avatar" src="../../img/avatar92.jpg" /> 
								<div class="post_content">
									<form action=""> 
										<div class="about">
										开发者A <input type="submit" class="btn btn-mini" value="评论" >
										</div>
										<textarea rows="3"></textarea>
									</form>
								</div>
							</div>
						</div>

						<div class="post_list">
							<!-- 第一条回复 -->
							<div class="post_item" id="post-001">
								<img class="avatar" src="../../img/avatar92.jpg" /> 
								<div class="post_content">
									<div class="about"> 
										<span class="time">2012-01-11</span><span>管理员</span> 
										<span class="btn btn-mini replay"> 回复</span> <span class="btn btn-mini edit">编辑</span>(回复者/管理员显示编辑)   
									</div> 
									<p>回复的内容。。。</p>
									
								</div>
								<div class="comment_list">
									<!-- 第一条回复 的回复 -->
									<div class="post_item" id="post-001-1">
									    <img class="avatar" src="../../img/avatar92.jpg" />
									 
										<div class="post_content">
											<div class="about">
												<span class="time">2012-01-11</span><span>游客</span><span class="btn btn-mini replay"> 回复</span>   
											</div> 
											<p>@管理员  大师兄说的对啊</p>
											  
										</div>
										<div class="comment_list"> 
											<!--回复的回复-->	
										</div>
									</div>	
								</div><!--comment_list-->
							</div>
						</div>
						
						<!--评论-->  
					</div>
					<div id="tab3">
						应用开发者才有权限查看状态

						<table class="table">

							<tr>
								<td>
									审核状态
								</td>
								<td><span class="label">审核中</span></td>
							</tr>
							<tr>
								<td>
									 上架时间
								</td>
								<td> 未知 </td>
							</tr>
							<td>
									 下架时间
								</td>
								<td>2012-01-11</td>
						</table>

					  </div>
					<div id="tab4"> 
						应用开发者才有权限查看统计

						<table class="table"> 
							<tr>
								<td>
									下载量
								</td>
								<td>10</td>
							</tr>
							<tr>
								<td>
									收益
								</td>
								<td>10云豆 </td>
							</tr>
							<td>
								评价
							</td>
								<td> 好评:1  中评:2  差评:3</td>
						</table></div> 
				</div>
			</div><!--silder_right-->
			
			</div>



		</div>
	</div> 



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
<script src="../../plugins/tab/tab.js" type="text/javascript"></script>
<script type="text/javascript" src="../../sys/js/request.js"></script>
<script type="text/javascript" src="../../sys/js/jquery.xml2json.js"></script>
<script type="text/javascript" src="../../sys/js/dict.js"></script>
<script type="text/javascript" src="../js/public.js"></script>
<script type="text/javascript" src="../js/myapp.js"></script>
</body>
<script>

$(function () {

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

 	// 回复 
 	var $replay_tmp = $(".replay_box").clone(); 
 	$(".replay").toggle(function () {
 		var $comments = $(this).parent().parent(".post_content").next(".comment_list"); 
 		$comments.append($replay_tmp);
 		//刷新页面
 		refresh();
 	},function () { 
 		$replay_tmp.remove();	
 	});
 	// 编辑
 	var $textarea = $("<textarea />");
 	$(".edit").toggle(function () {
 		var $content = $(this).parent().next("p");
 		var str = $content.html();
 		$textarea.val(str)
 		 
 		$content.html("");
 		$content.append($textarea);
 		//刷新页面
 		refresh();

 	},function () {
 		var $content = $(this).parent().next("p");
 		$content.html($textarea.val());
 		$textarea.remove;
 	});

})
</script>
</html>