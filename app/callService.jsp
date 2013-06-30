<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
  String path = request.getContextPath();
%>
<html>
<title>Call Service Test</title>
<head>
<SCRIPT language=javascript>
function testCall() {
	var URL= "<%=path%>/callservice.do";
	var xmlHttp = new ActiveXObject("Microsoft.XmlHttp");

	xmlHttp.open("POST", URL, false);

	xmlHttp.send(inputXml.value);

	if(xmlHttp.status != 200) {
    	return -1;
	}

	outputXml.value = xmlHttp.responseText;
}
</SCRIPT>
</head>
<table>
<tr>
<td>Input</td>
<td>Output</td>
</tr>
<tr>
<td>
<TEXTAREA name=inputXml rows=20 cols=80></TEXTAREA>
</td>
<td>
<TEXTAREA name=outputXml rows=20 cols=80></TEXTAREA>
</td>
</tr>
</table>
<INPUT onclick="testCall()" type=button value="Call"> 
<html>