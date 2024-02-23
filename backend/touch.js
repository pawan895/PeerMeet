const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('<h1>hahah World!</h1>');
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log('Press Ctrl+C to quit.');
});