<%@ page language="java" import="java.util.*,org.json.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'adminManager.jsp' starting page</title>
    
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
    <%
    	JSONArray jsonArray = (JSONArray)request.getAttribute("json");
    	for(int i=0;i<jsonArray.length();i++)
    	{
    		JSONObject jo = jsonArray.getJSONObject(i);
    		out.print("用户名："+jo.get("username")+"  ");
    		out.print("昵称："+jo.get("name")+"  ");
    		out.print("邮箱："+jo.get("email")+"  ");
    		out.print("<br>");
    	}
    	
     %>
  </body>
</html>
