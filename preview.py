"""Preview HTML-only .php files without executing PHP. Use PHP in the course environment."""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import os

class PreviewHandler(SimpleHTTPRequestHandler):
    extensions_map = {**SimpleHTTPRequestHandler.extensions_map, '.php': 'text/html; charset=utf-8'}

if __name__ == '__main__':
    os.chdir(Path(__file__).resolve().parent)
    server = ThreadingHTTPServer(('127.0.0.1', 8000), PreviewHandler)
    print('Local preview: http://127.0.0.1:8000/index.php', flush=True)
    print('Serves HTML-only PHP files; does not execute PHP.', flush=True)
    server.serve_forever()
