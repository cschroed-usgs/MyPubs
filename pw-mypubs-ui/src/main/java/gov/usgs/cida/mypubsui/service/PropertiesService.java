package gov.usgs.cida.mypubsui.service;

import gov.usgs.cida.config.DynamicReadOnlyProperties;

import javax.naming.NamingException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Webservice for serving up properties configured on the service
 *
 * @author thongsav-usgs
 */
public class PropertiesService {
	private static final Logger LOG = LoggerFactory.getLogger(PropertiesService.class);

	private static DynamicReadOnlyProperties props;
	static {
		props = new DynamicReadOnlyProperties();
		try {
			props.addJNDIContexts(new String[0]); //enables jndi lookup
		} catch (NamingException e) {
			LOG.error("Error initializing DynamicReadOnlyProperties");
		}
	}

	public static String getServiceEndpoint() {
		return props.getProperty("mypubs/pubsServices");
	}
}
