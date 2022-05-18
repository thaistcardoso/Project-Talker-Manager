const express = require('express');
const bodyParser = require('body-parser');
const { readFile } = require('./utils');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_req, res) => {
  const talker = await readFile();

  return res.status(200).json(talker);
});

app.listen(PORT, () => {
  console.log(`Listen on port: ${PORT}`);
});