const date = new Date();
const info = (...param) => {
  console.log(
    date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
    ':',
    ...param
  );
};

const error = (...params) => {
  console.error(...params);
};

module.exports = {
  info,
  error,
};
