package gov.usgs.cida.mypubsui.webservice;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;


import java.util.HashSet;
import java.util.Set;

/**
 * (Stanadard Jersey JAX-RS application).
 *
 * Wire up all configuration classes. Includes webservice, format, and error
 * handling provides.
 *
 * @author thongsav-usgs
 */
@ApplicationPath("/service")
// NOTE: this matches web.xml
public class MyPubsServicesEntryPoint extends Application {

	@Override
	public Set<Class<?>> getClasses() {
		final Set<Class<?>> classes = new HashSet<Class<?>>();

		// webservices
		classes.add(PropertiesWebservice.class);

		return classes;
	}
}
