module.exports = () => async (ctx, next) => {
  console.log('123')
  ctx.body = 'ssr';
  ctx.status = 200;
};
