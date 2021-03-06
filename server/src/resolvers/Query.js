const { getUserId } = require('../utils')

const Query = {
  posts(parent, args, ctx, info) {
    return ctx.db.query.posts({ where: { isPublished: true } }, info)
  },


  myposts(parent, args, ctx, info) {
    const id = getUserId(ctx)

    const where = {
      isPublished: true,
      author: {
        id
      }
    }

    return ctx.db.query.posts({ where }, info)
  },


  mydrafts(parent, args, ctx, info) {
    const id = getUserId(ctx)

    const where = {
      isPublished: false,
      author: {
        id
      }
    }

    return ctx.db.query.posts({ where }, info)
  },

  post(parent, { id }, ctx, info) {
    return ctx.db.query.post({ where: { id } }, info)
  },

  me(parent, args, ctx, info) {
    const id = getUserId(ctx)
    return ctx.db.query.user({ where: { id } }, info)
  },
}

module.exports = { Query }
