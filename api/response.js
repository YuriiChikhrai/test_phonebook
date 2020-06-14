module.exports = (res, data, ...params) => {
  res.json({
    data: data,
    ...params,
  });
};
