<%@page import="com.liferay.portal.kernel.security.auth.AuthTokenUtil"%>
<%@ include file="/init.jsp" %>

<%
	String companyId = String.valueOf(themeDisplay.getCompanyId());
	String authToken = AuthTokenUtil.getToken(request);

%>

<div id="<portlet:namespace />"></div>

<aui:script require="<%= bootstrapRequire %>">
	bootstrapRequire.default('<portlet:namespace />', '<%= companyId %>', '<%= authToken%>');
</aui:script>