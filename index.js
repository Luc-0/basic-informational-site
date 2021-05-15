const http = require('http');
const url = require('url');
const fs = require('fs');

http
  .createServer((req, res) => {
    const baseUrl = 'http://localhost:8080/';
    const reqUrl = new URL(req.url, baseUrl);

    const filepath =
      reqUrl.pathname == '/' ? './index.html' : `./${reqUrl.pathname}`;

    fs.readFile(filepath, (err, data) => {
      if (err) {
        fs.readFile('./404.html', (err, errorPage) => {
          if (err) throw err;

          res.writeHead(404, { 'Content-type': 'text/html' });
          res.write(errorPage);
          return res.end();
        });
        return;
      }

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    });
  })
  .listen(8080);
