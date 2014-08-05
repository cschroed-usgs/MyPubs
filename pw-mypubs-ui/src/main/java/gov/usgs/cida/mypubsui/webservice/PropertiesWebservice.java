package gov.usgs.cida.mypubsui.webservice;

import gov.usgs.cida.config.DynamicReadOnlyProperties;

import javax.naming.NamingException;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Webservice for serving up properties configured on the service
 *
 * @author thongsav-usgs
 */
@Path("/configuration")
public class PropertiesWebservice {
	private static final Logger LOG = LoggerFactory.getLogger(PropertiesWebservice.class);

	/**
	 * May want to move this section into a service layer, it's pretty lightweight for now though
	 */
	private static DynamicReadOnlyProperties props;
	static {
		props = new DynamicReadOnlyProperties();
		try {
			props.addJNDIContexts(new String[0]); //enables jndi lookup
		} catch (NamingException e) {
			LOG.error("Error initializing DynamicReadOnlyProperties");
		}
	}

	/**
	 * @return
	 */
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/props")
	public String getConfProperties() {
		//TODO may want to extract into POJO
		return "{" +
		" \"endpoint\" : \"" + props.getProperty("mypubs/pubsServices") + "\" " +
		"}";
	}
}
