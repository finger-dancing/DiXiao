<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'loginsuccess.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

  </head>
  
  <body>
   <a href="admin/adminManager" method="get">用户管理</a> <br>
   <a href="">公司信息</a> <br>
   <a href="">新闻类别管理</a> <br>
   <a href="">新闻管理</a> <br>
   <a href="">技术类别管理</a> <br>
   <a href="">技术管理</a> <br>
   <a href="">业务类别管理</a> <br>
   <a href="">业务管理</a> <br>
  </body>
</html>
