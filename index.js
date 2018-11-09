const express = require('express');
const app = express();

app.use('/', express.static(`${__dirname}/dist`));
app.listen(9003, () => {
  console.log('http://localhost:9003');
});