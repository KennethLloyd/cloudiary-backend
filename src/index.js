const express = require('express');
const cors = require('cors');
require('./db/mongoose'); //no variable because we just want the function to execute

const { userRouter } = require('./routers');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json()); //allows us to parse the request as json
app.use(cors());
app.use(userRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
