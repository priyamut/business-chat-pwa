import fs from 'fs';
import path from 'path';
import express from 'express';
import morgan from 'morgan';
import favicon from 'serve-favicon';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import httpProxy from 'http-proxy';
import PrettyError from 'pretty-error';
import http from 'http';
import config from 'config';
import moment from 'moment';


const chunksPath = path.join(__dirname, '..', 'static', 'dist', 'loadable-chunks.json');

process.on('unhandledRejection', error => console.error(error));

let AppCloudConfig = {};
const yelpKey=`ZytkjkLJCyu1st-Tv8V0DMj7IOWw5cx8AXNqX9_eHOdSNja-7auZy8JeyBiJPV3dnq0eY0Zqovau6PGr_ba89SkwB--7Xj2oDgL2OszXoYo8lRRzHM7FNcOtdZqIXHYx`;
const pretty = new PrettyError();
const app = express();
const server = new http.Server(app);
const serverStartTime =config.version ? config.version : moment().unix();
const proxy = httpProxy.createProxyServer({
  target: AppCloudConfig.targetUrl,
  changeOrigin: true,
  ws: true
});

app
  .use(morgan('dev', { skip: req => req.originalUrl.indexOf('/ws') !== -1 }))
  .use(cookieParser())
  .use(compression())
  .use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')))
  .use('/manifest.json', (req, res) => res.sendFile(path.join(__dirname, '..', 'static', 'manifest.json')));


app.use('/dist/service-worker.js', (req, res, next) => {
  res.setHeader('Service-Worker-Allowed', '/');
  return next();
});



app.use('/dist/dlls/:dllName.js', (req, res, next) => {
  fs.access(path.join(__dirname, '..', 'static', 'dist', 'dlls', `${req.params.dllName}.js`), fs.constants.R_OK, err =>
    err ? res.send(`console.log('No dll file found (${req.originalUrl})')`) : next());
});



app.use(express.static(path.join(__dirname, '..', 'static')));

app.use((req, res, next) => {
  res.setHeader('X-Forwarded-For', req.ip);
  return next();
});


//  Proxy to API server
app.use('/api', (req, res) => {
  if(req.headers["Authorization"] == null){
    req.headers["Authorization"]= AppCloudConfig.serviceToken;
  }
  proxy.web(req, res, { target: AppCloudConfig.targetUrl });
});

app.use('/version', (req, res) => {
  res.send({ time: serverStartTime });
});

app.use('/envInfo', (req, res) => {
  res.send({
    agentChatbotTargetUrl: AppCloudConfig.agentChatbotTargetUrl,
    websocketUrl: AppCloudConfig.websocketUrl
  });
});

app.use('/business', (req, res) => {
  // businessbot
  proxy.web(req, res, { target: AppCloudConfig.agentChatbotTargetUrl });
});


app.use('/gauth', (req, res) => {
  proxy.web(req, res, { target: AppCloudConfig.googleAuthTargetUrl });
});

app.use('/ws', (req, res) => {
  proxy.web(req, res, { target: AppCloudConfig.websocketUrl });
});

server.on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head);
});

function onProxyRes(proxyRes, req, res) {
  delete proxyRes.headers['Authorization'];
}

// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', (error, req, res) => {
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, { 'content-type': 'application/json' });
  }

  const json = { error: 'proxy_error', reason: error.message };
  res.end(JSON.stringify(json));
});

