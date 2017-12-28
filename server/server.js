const Koa = require('koa');
const route = require('koa-route');
const serve = require('koa-static');
const fs = require('fs');
const path = require('path');

const app = new Koa();
const port = 3000;

const assets = serve(path.join(__dirname, '../'));

const index = ctx => {
  ctx.type = 'html';
  ctx.body = fs.createReadStream(path.join(__dirname, '../1.ajax.html'), 'utf8');
}

const main = async ctx => {
  await delay(3000);
  ctx.response.type = 'html';
  ctx.body = {name: 'koa', id: 24};
}

app.use(assets);
app.use(route.get('/', index));
app.use(route.get('/data', main));

app.listen(port, () => console.log(`The server is listening to port ${port}`));

const delay = async time => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  })
}
