const express = require('express');
const app = express();
const { alpaca } = require('./alpaca');

const morgan = require('morgan');
const path = require('path');

app.use(morgan('dev'));
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use(express.json());

const router = require('./routes');

//use express.static() MAKE SURE THE PATH TO YOUR PUBLIC FOLDER IS RIGHT!
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) =>
  res.sendFile(path.join(__dirname, '../index.html'), null)
);
//require in your routes and use them on your api path
app.use('/api', router);
//404 handler: when I uncomment this, it throws off my "can't add new student helper message"
// app.use((err, req, res, next) => {
//   console.log('404 handler. err:', err);
//   res.status(404).send('404: Page Not Found');
//   next(err);
// });
//500 handler
app.use((err, req, res, next) => {
  console.log('500 handler just ran.', 'err:', err);
  res.status(500).send({ error: err });
  next(err);
});

const init = async () => {
  try {
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on PORT: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

init();

module.exports = app;
