const userRouter = require('./user');
const moodRouter = require('./mood');
const activityRouter = require('./activity');
const entryRouter = require('./entry');

module.exports = (app) => {
  app.use(userRouter);
  app.use(moodRouter);
  app.use(activityRouter);
  app.use(entryRouter);
};
