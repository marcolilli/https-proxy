const https = require('https');
const httpProxy = require('http-proxy');
const fs = require('fs');

const proxy = httpProxy.createProxyServer({
    target: { protocol: 'http:', host: 'localhost', port: 3000 }, // Change the target to your non-http local service
    changeOrigin: true
});

const options = {
    key: fs.readFileSync('/Users/ml/localhost-key.pem'), // Path to your SSL private key
    cert: fs.readFileSync('/Users/ml/localhost.pem') // Path to your SSL certificate
};

const server = https.createServer(options, (req, res) => {
    proxy.web(req, res, {}, (err) => {
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });
        res.end('Something went wrong.');
    });
});

server.listen(443, () => {
    console.log('HTTPS Proxy server listening on port 443');
});
