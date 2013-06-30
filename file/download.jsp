<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="java.io.File" %>
<%@page import="com.ztesoft.uboss.desktop.fl.FileManage" %>
<%
// FileManage fm = new FileManage();
// String webPath = request.getSession().getServletContext().getRealPath("/");
// String separator = File.separator;
// System.out.println("==="+webPath+"portal.jsp");
// // fm.download(webPath+separator+"portal.jsp",response);
// fm.download("\\soft\\portal.jsp",response);
// out.clear();  
// out = pageContext.pushBody();  

%>
<form action="/soft/uploadFile.do?action=download" method="post">

 <input type="text" value="6" name="fileId" >
 <input type="submit" value="提交">

</form>