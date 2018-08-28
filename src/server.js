import App from './App';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
import DocumentTitle from 'react-document-title'
import compression from 'compression';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server.use(compression());
server
  .disable('x-powered-by')
  .use(express.static('public'))  //todo process.env.RAZZLE_PUBLIC_DIR打包的是本地的路徑
  .get('/*', (req, res) => {
    const context = {};
    const markup = renderToString(
      <StaticRouter context={context} location={req.url}>
        <App />
      </StaticRouter>
    );
	  const _title = DocumentTitle.rewind();

	  if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
        `<!doctype html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>${_title}</title>
        <meta name="description" content="2018年终奖,个人所得税, 五险一金计算器" />
        <meta name="keywords" content="2018个人所得税,个人所得税,个人所得税计算器,个税,个税计算器,个税计算器2018,年终奖,年终奖计算器,五险一金,五险一金计算器,工资税后,税后工资" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">	
        <meta name="google-site-verification" content="aubmWPKp-VGVnbwolvDoCPKI7raIstBzrWK9-JRXBrM" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ''
        }
        ${
          process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
    </head>
    <body>
        <div id="root">${markup}</div>
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-121488426-1"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'UA-121488426-1');
        </script>
    </body>
</html>`
      );
    }
  });

export default server;
