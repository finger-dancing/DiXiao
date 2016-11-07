<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'addNew.jsp' starting page</title>
    
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
    <form action="news/addNew" method="post">
    	新闻标题：<input type="text" name="title"/><br/>
    	新闻列表：<input type="text" name="tid"/><br/>
    	发表日期：<input type="text" name="publishtime"/><br/>
    	作者：<input type="text" name="author"/><br/>
    	内容：<input type="text" name="content"/><br/>
    	图片：<input type="text" name="picture"/><br/>
    	视频：<input type="text" name="video"/><br/>
  		<input type="submit" name="提交"/><br/>
  		<input type="reset" name="重置"/><br/>
  	</form>
  </body>
</html>
