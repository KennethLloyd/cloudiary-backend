const express = require('express');
require('./db/mongoose'); //no variable because we just want the function to execute

const { userRouter, taskRouter } = require('./routers');

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//   if (req.method === 'GET') {
//     res.send('GET requests are disabled');
//   } else {
//     next();
//   }
// });

// app.use((req, res, next) => {
//   res.status(503).send('Site is under maintenance');
// });

app.use(express.json()); //allows us to parse the request as json
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
