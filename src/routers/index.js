const userRouter = require('./user');
const moodRouter = require('./mood');
const activityRouter = require('./activity');

module.exports = (app) => {
  app.use(userRouter);
  app.use(moodRouter);
  app.use(activityRouter);
};
