package gov.cida.net;


import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.InetSocketAddress;
import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;


public class HTTP {

	public static final int    PORT = 8080;
	public static final String PATHS[] = {"src/main/webapp", "src/test"};
	
	private static final Queue<String> logMsgs = new ConcurrentLinkedQueue<String>();
	
	private static boolean running = true;
	
	public static void startLogging() {
		
		new Thread(new Runnable() {
			@Override
			public void run() {
				while (running) {
					while ( !logMsgs.isEmpty() ) {
						String msg = logMsgs.poll();
						if (null != msg) {
							System.out.println(msg);
						}
					}
					try {
						Thread.sleep(500);
					} catch (InterruptedException e){}
				}
			}
		}).run();
	}

	public static void log (Object ... msgs) {
		StringBuilder finalMsg = new StringBuilder();
    	finalMsg.append( System.currentTimeMillis() ).append('\t');
		for (Object msg : msgs) {
			finalMsg.append(msg);
		}
		logMsgs.add(finalMsg.toString());
	}	
	
	public static String getContentType(String path) {
		String contentType = "text/plain";
		
		// TEXT types

		if (path.endsWith(".txt")) {
			// default type
		} else if (path.endsWith(".html")) {
			contentType = "text/html";
			if (path.contains("index")) {
				log("");
			}
		} else if (path.endsWith(".css")) {
			contentType = "text/css";
		} else if (path.endsWith(".js")) {
			contentType = "application/javascript";
		} else if (path.endsWith(".json")) {
			contentType = "application/json";
		} else if (path.endsWith(".xml")) {
			contentType = "application/xml";

		// BINARY types

			// image types

		} else if (path.endsWith(".gif")) {
			contentType = "image/gif";
		} else if (path.endsWith(".jpg")) {
			contentType = "image/jpeg";
		} else if (path.endsWith(".png")) {
			contentType = "image/png";
		} else if (path.endsWith(".ico")) {
			contentType = "image/x-icon";

			// other binary

		} else if (path.endsWith(".pdf")) {
			contentType = "application/pdf";
		}

		return contentType;
	}
	
	
	public static void main (String...args) throws Exception {
		log("server started");
		
		InetSocketAddress address = new InetSocketAddress(PORT);
		HttpServer server = HttpServer.create(address, 0);

		HttpHandler handler = new HttpHandler() {

	        public void handle(HttpExchange exchange) throws IOException {
	        	String req = exchange.getRequestURI().getPath();
	        	
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
		
		log("server running");
		
		startLogging();
	}
}
