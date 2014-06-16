package gov.cida.net;


import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.InetSocketAddress;
import java.util.concurrent.Executors;
import java.util.concurrent.ExecutorService;

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;


public class HTTP {

	public static final int    PORT = 8080;
	public static final String PATHS[] = {"src/main/webapp", "src/test"};

	public static void log (Object ... msgs) {
    	System.out.print( System.currentTimeMillis() );
    	System.out.print('\t');
		for (Object msg : msgs) {
            System.out.print(msg);
		}
        System.out.println();
	}
	
	
	public static String getContentType(String path) {
		String contentType = "text/plain";
		if (path.endsWith(".pdf")) {
			contentType = "application/pdf";
		} else if (path.endsWith(".html")) {
			contentType = "text/html";
		} else if (path.endsWith(".css")) {
			contentType = "text/css";
		} else if (path.endsWith(".js")) {
			contentType = "application/javascript";
		} else if (path.endsWith(".json")) {
			contentType = "application/json";
		} else if (path.endsWith(".gif")) {
			contentType = "image/gif";
		} else if (path.endsWith(".jpg")) {
			contentType = "image/jpeg";
		} else if (path.endsWith(".png")) {
			contentType = "image/png";
		} else if (path.endsWith(".xml")) {
			contentType = "application/xml";
		}
		return contentType;
	}
	
	
	public static void main (String...args) throws Exception {
		InetSocketAddress address = new InetSocketAddress(PORT);
		HttpServer server = HttpServer.create(address, 0);

		HttpHandler handler = new HttpHandler() {

	        public void handle(HttpExchange exchange) throws IOException {
	        	String req = exchange.getRequestURI().getPath();
	        	log(req);
        		// java 7 try-with-resources
	        	try ( OutputStream os = exchange.getResponseBody(); ) {
        			File file = new File("doesnotexist");
	        		for (String path : PATHS) {
	        			file = new File(path+req);
			        	if ( file.exists() ) break;
	        		}
		        	if ( file.exists() ) {
		        		try (   FileInputStream fis = new FileInputStream(file) ) {
		        			Headers headers = exchange.getResponseHeaders();
		        			headers.add("Content-Type", getContentType(req));
		        			
				            exchange.sendResponseHeaders(HttpURLConnection.HTTP_OK, file.length());
				            log(file.length(),'\t',req);
			            	byte buffer[] = new byte[4096*2];
			            	int len = 0;
				            while ( (len=fis.read(buffer)) >0 ) {
				            	os.write(buffer,0,len);
				            }
				            fis.close();
		        		}
		        	} else {
		        		String msg = "404";
			            log(0,'\t',req,'\t',msg);
			            exchange.sendResponseHeaders(HttpURLConnection.HTTP_NOT_FOUND, msg.length());
		            	os.write( msg.getBytes() );
		        	}
		            os.flush();
		            os.close();
	        	} catch (Exception e) {
	        		e.printStackTrace();
	        		String msg = "500 "+e.getClass().getName()+':'+e.getMessage();
		            log(0,'\t',req,'\t',msg);
		            exchange.sendResponseHeaders(HttpURLConnection.HTTP_INTERNAL_ERROR, msg.length());
	            	try ( OutputStream os = exchange.getResponseBody(); ) {
	            		os.write( msg.getBytes() );
			            os.flush();
			            os.close();
	            	}
	        	}
	        	exchange.close();
	        }
	    };

	    server.createContext("/", handler);

		ExecutorService   executors;
	    executors = Executors.newFixedThreadPool(20);
	    server.setExecutor(executors);

		server.start();
	}
}
