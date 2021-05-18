const date = new Date();
const info = (...param) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(
      date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
      ':',
      ...param
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
