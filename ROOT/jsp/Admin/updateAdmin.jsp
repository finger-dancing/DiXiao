<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'addAdminForm.jsp' starting page</title>
    
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
    <form action="admin/updateAdmin" method="post">
    	用户ID：<input type="text" name="id"/><br>
    	用户名：<input type="text" name="username"></input><br>
    	密    码：<input type="text" name="password"></input><br>
    	昵    称：<input type="text" name="name"></input><br>
    	邮    箱：<input type="text" name="email"></input><br>
    	提    交：<input type="submit"/>
    	重    置：<input type="reset"/><br>
    	
    </form>
  </body>
</html>
