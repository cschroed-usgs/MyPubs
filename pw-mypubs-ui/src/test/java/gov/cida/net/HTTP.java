package gov.cida.net;


import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.InetSocketAddress;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;


public class HTTP {

	public static final int    PORT = 8080;
	public static final String PATH = "src/main/webapp";

	public static void main (String...args) throws Exception {
		InetSocketAddress address = new InetSocketAddress(PORT);
		HttpServer server = HttpServer.create(address, 0);

		HttpHandler handler = new HttpHandler() {

	        public void handle(HttpExchange exchange) throws IOException {
	        	String path = exchange.getRequestURI().getPath();
	        	File file = new File(PATH+path);
	        	if ( file.exists() ) {
	        		FileInputStream fis = new FileInputStream(file);
		            BufferedInputStream bis = new BufferedInputStream(fis);
		            exchange.sendResponseHeaders(HttpURLConnection.HTTP_OK, file.length());
		            System.out.print(file.length());
		            System.out.print('\t');
		            System.out.println(path);
	            	OutputStream os = exchange.getResponseBody();
	            	byte buffer[] = new byte[4096];
	            	int len = 0;
		            while ( (len=bis.read(buffer)) !=0 ) {
		            	os.write(buffer,0,len);
		            }
		            os.close();
		            fis.close();
	        	} else {
		            exchange.sendResponseHeaders(HttpURLConnection.HTTP_NOT_FOUND, 0);
	        	}
	            exchange.close();
	        }
	    };

	    server.createContext("/", handler);
	    server.setExecutor(null);
		server.start();
	}
}
