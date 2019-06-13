<%@page import="com.liferay.portal.kernel.security.auth.AuthTokenUtil"%>
<%@ include file="./init.jsp" %>

<%
	String companyId = String.valueOf(themeDisplay.getCompanyId());
	String authToken = AuthTokenUtil.getToken(request);
%>

<div id="<portlet:namespace />-root"></div>

<aui:script require="<%= mainRequire %>">
	main.default('<portlet:namespace />-root', '<%= companyId %>', '<%= authToken %>');
</aui:script>