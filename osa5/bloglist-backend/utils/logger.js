const date = new Date();
const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(
      date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
      ':',
      ...params
    );
  }
};

const error = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(...params);
  }
};

module.exports = {
  info,
  error,
};
