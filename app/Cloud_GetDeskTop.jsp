<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="java.util.*"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
<script type="text/javascript" src="../js/jquery-1.8.2.min.js"></script>
	<script type="text/javascript" src="../plugins/jquery.easyui.min.js"></script>
	<script language="javascript" src="../sys/js/request.js"></script>
	<script language="javascript" src="../sys/js/jquery.xml2json.js"></script>
	<script language="javascript" src="../sys/js/dict.js"></script>

<script type="text/javascript">
    $(document).ready(function(){
        $.ajax({
             url:'https://113.247.222.118',
             dataType:"jsonp",
             jsonp:"jsonpcallback",
             success:function(data){
                 var $ul = $("<ul></ul>");
                 $.each(data,function(i,v){
                     $("<li/>").text(v["id"] + " " + v["name"]).appendTo($ul)
                 });
                 $("#res").append($ul);
             }
        });
    });
</script>
</head>


<body>
<p>aaaaa</p>
<% 

 System.out.println("----------response跳转之前-------------"); 

%> 
<%

 response.sendRedirect("https://113.247.222.118/Citrix/CSSP-Cloud/whtest.html?user=demouser&pwd=123456"); 
System.out.println("----------response跳转之前2-------------"); 
%>

<p>bbbb</p>
</body>
</html>
