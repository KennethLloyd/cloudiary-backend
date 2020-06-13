const express = require('express');
require('./db/mongoose'); //no variable because we just want the function to execute

const { userRouter } = require('./routers');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json()); //allows us to parse the request as json
app.use(userRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});