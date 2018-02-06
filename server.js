const express = require('express');
const nunjucks = require('nunjucks')
const path = require('path')
nunjucks.configure({ noCache: true })
const app = express();
const favicon = require('serve-favicon');

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use(favicon(path.join(__dirname, '/views', 'favicon.ico')));

app.use((req, res, next) => {
  res.locals.path = req.url;
  next();
});

app.use(require('method-override')('_method'));
app.use(require('body-parser').urlencoded());

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.get('/', (req,res,next)=>{
  res.render('index', {title: 'Home'})
})

const db = require('./db');

const User = db.models.User;

app.use('/users', require('./routes/users'))

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening on port ${port}`))

db.sync()
  .then(()=> db.seed())