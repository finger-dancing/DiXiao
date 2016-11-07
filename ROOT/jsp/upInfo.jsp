<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'test.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<meta http-equiv="Content-type" content="text/html;charset=UTF-8">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

  </head>
  
  <body>
    <form action="company/updateCompanyInfo" method="post">
  		公司名称：<input type="text" name="name"/><br/>
  		公司创办人：<input type="text" name="founder"/><br/>
  		公司创立日期：<input type="text" name="founddate"/><br/>
  		公司简介：<input type="text" name="introduction"/><br/>
  		公司理念：<input type="text" name="philosophy"/><br/>
  		公司发展历程：<input type="text" name="history"/><br/>
  		<input type="submit" name="提交"/><br/>
  		<input type="reset" name="重置"/><br/>
  	</form>
  </body>
</html>
