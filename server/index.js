const express = require('express');
const app = express();
const { alpaca } = require('./alpaca');

const morgan = require('morgan');
const path = require('path');

const { syncAndSeed } = require('./db');

app.use(morgan('dev'));
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use(express.json());

const router = require('./routes');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) =>
  res.sendFile(path.join(__dirname, '../index.html'), null)
);

app.use('/api', router);

app.use((err, req, res, next) => {
  console.log('500 handler just ran.', 'err:', err);
  res.status(500).send({ error: err });
  next(err);
});

const init = async () => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on PORT: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

init();

module.exports = app;
