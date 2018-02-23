/**
 * 服务器端渲染中间件
 *
 * 该方法返回koa中间件，中间件作用是根据ctx.request来判断
 * 是否需要做服务器端渲染
 * TODO 待补充注释：实际实现逻辑， 目前仅为测试
 *
 * @param    void
 * @returns  async(ctx, next) 
 *
 * @date     2018-02-17
 * @author   yanzhenggang<robinyzg@hotmail.com>
 */
module.exports = () => async (ctx, next) => {
  console.log(ctx.request.path)

  if(ctx.request.path === '/testView') {
    await ctx.render('index', {});
    
    return;
  }
};
