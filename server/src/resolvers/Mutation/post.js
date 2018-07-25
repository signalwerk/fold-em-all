const { getUserId } = require('../../utils')

const post = {
  async createPost(parent, { title, isPublished, sections }, ctx, info) {
    const userId = getUserId(ctx)
    return ctx.db.mutation.createPost(
      {
        data: {
          title,
          isPublished,
          sections: { set: sections },
          author: {
            connect: { id: userId },
          },
        },
      },
      info
    )
  },

  async updatePost(parent, { id, isPublished, title, sections}, ctx, info) {
    const userId = getUserId(ctx)
    const eventExists = await ctx.db.exists.Post({
      id,
      author: { id: userId },
    })
    if (!eventExists) {
      throw new Error(`Post not found or you don't have permission`)
    }

    return ctx.db.mutation.updatePost(
      {
        where: { id },
        data: {
          isPublished,
          title,
          sections: { set: sections },
        },
      },
      info,
    )
  },


  async deletePost(parent, { id }, ctx, info) {
    const userId = getUserId(ctx)
    const postExists = await ctx.db.exists.Post({
      id,
      author: { id: userId },
    })
    if (!postExists) {
      throw new Error(`Post not found or you're not the author`)
    }

    return ctx.db.mutation.deletePost({ where: { id } })
  },
}

module.exports = { post }
