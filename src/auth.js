const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());

app.post('/', async (req, res) => {
  try {
    const response = await axios.post(
      'http://assignment.cyberboxer.com/auth/login',
      req.body
    );
    res.status(response.status).send(response.data);
    console.log(response.data);
  } catch (error) {
    res.status(error.response.status).send(error.response.data);
  }
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
