const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.ttf': 'font/ttf',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2'
};

// Create a simple HTTP server
const server = http.createServer((req, res) => {
    // Parse the URL and get the pathname
    let url = req.url;
    
    // Default to index.html if requesting the root
    if (url === '/') {
        url = '/index.html';
    }
    
    // Normalize the filepath to prevent directory traversal attacks
    const filePath = path.normalize(path.join(__dirname, url.replace(/^\//, '')));
    
    // Get the file extension
    const ext = path.extname(filePath);
    
    // Read the file
    fs.readFile(filePath, (err, data) => {
        if (err) {
            // If file not found or error reading file
            if (err.code === 'ENOENT') {
                // File not found - serve 404 page
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1><p>The requested resource was not found on this server.</p>');
            } else {
                // Server error
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>500 Internal Server Error</h1>');
                console.error(err);
            }
            return;
        }
        
        // Set the content type based on file extension
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        
        // Serve the file
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`Open your browser and navigate to http://localhost:${PORT}/ to view the RuralConnect website`);
}); 