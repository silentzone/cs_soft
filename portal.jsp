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
  String loginNo = null;
  String userId = null;
  String userName = null;
 if(sysLoginDto!= null){
    loginNo = sysLoginDto.getString("LoginNo"); 
    userId = sysLoginDto.getString("UserId");
    userName = sysLoginDto.getString("UserName");
 }
  

%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=1024" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <title> 软件园  </title>
      <link rel="shortcut icon" href="favicon.ico" type="image/x-icon"> 
    <link href="css/impress.css" rel="stylesheet" /> 
    <!-- jquery -->
    <script type="text/javascript"  src="js/jquery-1.8.2.min.js"></script>  
    <!-- art dialog -->
    <script type="text/javascript" src="js/artDialog.js"></script>
    <script type="text/javascript" src="js/iframeTools.js"></script>
    <link rel="stylesheet" type="text/css" href="css/skins/black.css" /> 
    <!-- app showcase -->
   <!--  <link rel="stylesheet" type="text/css" href="plugins/showCase/css/default.css" />
    <link rel="stylesheet" type="text/css" href="plugins/showCase/css/component.css" /> -->

    <!-- 浏览器能力检测  -->
    <!-- <script src="plugins/showCase/js/modernizr.custom.js"></script>  -->
    <!-- smart menu --> 
    <link href="css/smartMenu.css" rel="stylesheet"  type="text/css" />
    <script type="text/javascript" src="js/jquery-smartMenu-min.js"></script>
    
    <!-- Bootstrap -->
    <link href="plugins/bootstrap/css/bootstrap.css" rel="stylesheet" >
    <!-- <link href="plugins/bootstrap/css/bootstrap-responsive.css" rel="stylesheet" > -->
    <script src="plugins/bootstrap/js/bootstrap.js"></script>   
    <!-- the mousewheel plugin - optional to provide mousewheel support -->
    <script type="text/javascript" src="plugins/jscroll/jquery.mousewheel.js"></script>

    <!-- ///////// IE  视图//////////////  --> 
    <!--ie 10 不支持 if IE hack  --> 
    <link href="plugins/metro/metroJs.min.css" rel="stylesheet" type="text/css" /> 
    <script src="plugins/metro/metroJs.js" type="text/javascript"></script>
    <!-- live tile 启动方法 在appjs 中 --> 
    <!-- 弹出 pop菜单 -->
    <!--  <script src="plugins/tool/jquery.toolbar.js"></script>  -->
    <link href="plugins/tool/jquery.toolbars.css" rel="stylesheet" />  

    <link href="plugins/lightbox/lightbox.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="css/page.css">  
    <script language="javascript" src="sys/js/request.js"></script>
    <script language="javascript" src="sys/js/dict.js"></script>
    <script type="text/javascript" src="plugins/alert/alert.js"></script> 
   
</head>

<body class="desktop"> 
<a class="desktop_logo"></a> 
<div class="os_option"> 
    <span class="icon-home icon-white" id="hide_all"><!-- 首页 --></span> 
    <span class="icon-th-large icon-white" id="view" ><!-- 视图 --></span> 
</div>

<div id="impress" class="impress"> 
    <!-- 云背景效果 -->
    <!-- <div class="cloud_icon01" > <img src="img/cloud_bg_01.png" /></div>
    <div class="cloud_icon02" > <img src="img/cloud_bg_01.png" /></div>
    <div class="cloud_icon03" > <img src="img/cloud_bg_01.png" /></div>
    <div class="cloud_icon04" > <img src="img/cloud_bg_01.png" /></div>
    <div class="cloud_icon05" > <img src="img/cloud_bg_02.png" /></div>     -->
</div>
<div id="impress_ie"></div> 
<div class="bottomMenu">
    <div class="item">
        <img id="menu_start"  src="img/min_menu/settings.png" />
        <div id="muMenu"><!-- 开始菜单 --></div>
    </div>
    <div id="im_item" class="item" appid="talk_001" title="IM通信平台" url="app/talk.jsp">
        <img src="img/min_menu/talk.png" />
        <span class="badge badge-warning">2</span>
        <div class="im_msg" >
             消息...
        </div>
    </div>
</div>

 

 <div id="userStatus" class="btn-group"> 
    <span class="btn disabled">
        <i class="icon-user"></i><span  id="userName">请登录</span>
    </span> 
    <span class="btn dropdown-toggle disabled" data-toggle="dropdown">
        <span class="caret"></span>
    </span>
    <ul class="dropdown-menu">
         <!-- <li ><a href="#" >个人中心</a></li>
         <li ><a href="#" >账户信息</a></li>
         <li ><a href="#" >我的应用</a></li>
         <li class="divider" role="presentation"></li> -->
         <li><a id="loginOut" href="#" >登出</a></li>
    </ul>
    </div>


 <div id="hide_menu" class="tool-container gradient tool-bottom tool-rounded" style=" display:none; left: auto; top: 40px; right: 20px; position: absolute; z-index:0;">
    <div class="tool-items">
        <a href="app/user.html" class="tool-item gradient"> <i class="icon-user"> </i> 用户资料 </a>
        <a href="app/account.html" class="tool-item gradient"><i class="icon-shopping-cart"></i> 账户信息</a>
        <a href="app/myapp.html" class="tool-item gradient"> <i class="icon-inbox"></i>我的应用</a>
        <a href="#loginout" class="tool-item gradient"> <i class="icon-off"></i>注销</a>
    </div>
    <!-- <div class="arrow" style="left: auto; right: 81.15px;"></div> -->
</div>

</body>
 
<!-- impress -->
<script src="js/impress.js"></script>
<!-- 处理 app数据 -->
<!-- <script type="text/javascript"  src="js/data.js"></script>  -->
<script type="text/javascript"  src="js/app.js"></script>
<script type="text/javascript"> 

    <%if(userName!= null){%>
        var userName = "<%=userName%>";
        var $loginNo = "<%=loginNo%>";
        win.chkUserStatus(userName);
    <%}else {%>
         win.chkUserStatus("");
    <%}%>  

    //退出
    $("#loginOut").click(function () {
        portal.loginout();
    });
   

    // 开始菜单
    // $("#menu_start").click(function () {
    //     // alert(" #menu_start  click ")
    //     $(".multi_menu").toggle();   
    // });
    // $("#menu_start img").click(function (event) {
    //      alert("  img  click ");
    //      // event.stopPropagation();
    //      // return false
         
    // });


    //
    $("#hide_all").click(function () {
        location.hash = "/app_001";
        win.hideAll();
    });
    $("#view").click(function () {
       win.changeView();     
    });
    // 点击其他地方关闭 

    $("body").click(function(e) {
        if($(e.target).is("#menu_start")) {
                 $(".multi_menu").toggle(); 
                 $(".muMenu_blank").toggle();
            }else if ($(".multi_menu").is(":visible")) {
                $(".multi_menu").hide()
                $(".muMenu_blank").hide();
            }
    })

    // $(document).bind("click",function (event) {
          
    //         // if(e.target.id == "menu_start") {
    //         //     // alert("show"); 
    //         //     $(".multi_menu").show(); 
    //         //     e.stopPropagation();   
               
    //         // } else {
    //         //      // alert("hide");
    //         //     $(".multi_menu").hide();     
    //         // }

    //         // if($(".multi_menu").is(":visible")) {
    //         //     alert($(".multi_menu").is(":visible"))
    //         //     if(e.target.className != "multi_menu" ) { 
    //         //         $(".multi_menu").hide();      
    //         //     };   
    //         // }
            
    //     })  
 
    
</script>  
</html>