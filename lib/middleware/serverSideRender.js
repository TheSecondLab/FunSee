module.exports = () => async (ctx, next) => {
  console.log(ctx.request.path)

  if(ctx.request.path === '/testView') {
    await ctx.render('default', {});
    
    return;
  }

  ctx.body = 'ssr';
  ctx.status = 200;
};
