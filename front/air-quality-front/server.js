const express = require('express');
const path = require('path');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('App is running on port ' + port);
})

app.use('/api', createProxyMiddleware({
    target: 'https://ijqgadkkn8.execute-api.us-east-1.amazonaws.com/dev/',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
}));

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'build', 'static')));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})