#!/usr/bin/env python3
"""
Teaching Management System - Static File Server
A simple HTTP server to serve the HTML/CSS/JavaScript frontend
Created by: TUNU KUMAR, PUSHKAR KUMAR, RITESH KUMAR, CHITRANJAN KUMAR, SHUBHAM KUMAR
"""

import os
import http.server
import socketserver
from urllib.parse import urlparse
import mimetypes

class TMSHandler(http.server.SimpleHTTPRequestHandler):
    """Custom handler for Teaching Management System static files"""
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)
    
    def do_GET(self):
        """Handle GET requests"""
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        # Handle root path - serve index.html
        if path == '/':
            self.path = '/index.html'
        
        # Handle paths without extensions - assume .html
        elif not os.path.splitext(path)[1] and not path.endswith('/'):
            self.path = path + '.html'
        
        # Serve the file
        try:
            return super().do_GET()
        except FileNotFoundError:
            # If file not found, serve 404 page or redirect to index
            self.send_error(404, "Page not found")
    
    def guess_type(self, path):
        """Guess the MIME type of a file"""
        mimetype, _ = mimetypes.guess_type(path)
        
        # Handle common web file types
        if path.endswith('.js'):
            return 'application/javascript'
        elif path.endswith('.css'):
            return 'text/css'
        elif path.endswith('.html'):
            return 'text/html'
        elif path.endswith('.json'):
            return 'application/json'
        elif path.endswith('.svg'):
            return 'image/svg+xml'
        
        return mimetype or 'application/octet-stream'

class TMSServer:
    """Teaching Management System HTTP Server"""
    
    def __init__(self, port=5000, host='0.0.0.0'):
        self.port = port
        self.host = host
        self.httpd = None
    
    def start(self):
        """Start the HTTP server"""
        try:
            # Ensure we're in the correct directory
            os.chdir(os.path.dirname(os.path.abspath(__file__)))
            
            # Create server
            self.httpd = socketserver.TCPServer((self.host, self.port), TMSHandler)
            
            print(f"""
╔══════════════════════════════════════════════════════════════╗
║              Teaching Management System (TMS)                ║
║                        BCA Project                           ║
║──────────────────────────────────────────────────────────────║
║  Team: TUNU KUMAR, PUSHKAR KUMAR, RITESH KUMAR,             ║
║        CHITRANJAN KUMAR, SHUBHAM KUMAR                      ║
║──────────────────────────────────────────────────────────────║
║  Server: http://{self.host}:{self.port}                                     ║
║  Status: Running                                             ║
║  Ready for XAMPP MySQL Integration                           ║
╚══════════════════════════════════════════════════════════════╝
            """)
            
            # Start serving
            self.httpd.serve_forever()
            
        except KeyboardInterrupt:
            print("\n\nShutting down server...")
            self.stop()
        except Exception as e:
            print(f"Error starting server: {e}")
            raise
    
    def stop(self):
        """Stop the HTTP server"""
        if self.httpd:
            self.httpd.shutdown()
            self.httpd.server_close()
            print("Server stopped.")

# Create an app object for gunicorn compatibility
from wsgiref.simple_server import make_server
from wsgiref.util import FileWrapper
import io

def application(environ, start_response):
    """WSGI application for serving static files"""
    path = environ.get('PATH_INFO', '/')
    
    # Handle root path
    if path == '/':
        path = '/index.html'
    
    # Remove leading slash
    if path.startswith('/'):
        path = path[1:]
    
    # Check if file exists
    if os.path.exists(path):
        # Determine content type
        content_type = 'text/html'
        if path.endswith('.css'):
            content_type = 'text/css'
        elif path.endswith('.js'):
            content_type = 'application/javascript'
        elif path.endswith('.json'):
            content_type = 'application/json'
        elif path.endswith('.svg'):
            content_type = 'image/svg+xml'
        elif path.endswith(('.jpg', '.jpeg', '.png', '.gif')):
            content_type = 'image/' + path.split('.')[-1]
        
        # Read and serve file
        try:
            with open(path, 'rb') as f:
                content = f.read()
            
            start_response('200 OK', [
                ('Content-Type', content_type),
                ('Content-Length', str(len(content)))
            ])
            return [content]
        except Exception as e:
            # File read error
            error_msg = f'Error reading file: {str(e)}'
            start_response('500 Internal Server Error', [
                ('Content-Type', 'text/plain'),
                ('Content-Length', str(len(error_msg)))
            ])
            return [error_msg.encode()]
    else:
        # File not found
        error_msg = '404 - Page Not Found'
        start_response('404 Not Found', [
            ('Content-Type', 'text/plain'),
            ('Content-Length', str(len(error_msg)))
        ])
        return [error_msg.encode()]

# Create app alias for gunicorn
app = application

def main():
    """Main function to start the server"""
    # Get port from environment or use default
    port = int(os.environ.get('PORT', 5000))
    host = os.environ.get('HOST', '0.0.0.0')
    
    # Create and start server
    server = TMSServer(port=port, host=host)
    server.start()

if __name__ == '__main__':
    main()