import Router from 'next/router';

export const redirectUser = (ctx, location) => {
  if (ctx.req) {
    // it means user on server side
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    // user on client side
    Router.push(location);
  }
};
