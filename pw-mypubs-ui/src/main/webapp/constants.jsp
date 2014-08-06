<%@page contentType="text/html" pageEncoding="UTF-8" import="gov.usgs.cida.mypubsui.service.PropertiesService"%>
	<script type="text/javascript">
		PUBS = {
			constants: {
				endpoint: '<%=PropertiesService.getServiceEndpoint()%>'
			}
		};
	</script>