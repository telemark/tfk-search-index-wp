const path = require('path')
const addIndex = require('./lib/add-index')
const getPosts = require('./lib/get-posts')
const deleteIndex = require('./lib/delete-index')
const repackPost = require('./lib/repack-post')
const prepareForIndex = require('./lib/prepare-for-index')
const logger = require('./lib/logger')
const env = process.argv[2]

if (env) {
  const envFilePath = path.resolve(process.cwd(), env)
  logger('info', ['index', 'loading environment', env])
  require('dotenv').config({ path: envFilePath })
} else if (process.env.NODE_ENV !== 'production') {
  logger('info', ['index', 'loading environment', '.env'])
  require('dotenv').config()
} else {
  logger('warn', ['index', 'no environment loaded'])
}

async function indexPosts () {
  const posts = await getPosts()
  if (!process.env.NO_DELETE_INDEX && posts.length > 0) {
    const msg = await deleteIndex()
    logger('info', ['index', 'indexPosts', 'index deleted', JSON.stringify(msg)])
  } else {
    logger('info', ['index', 'indexPosts', 'no delete index'])
  }
  const indexes = posts.map(repackPost).map(prepareForIndex)
  logger('info', ['index', 'indexPosts', 'posts to index', indexes.length])
  let success = 0
  let fail = 0
  const next = async () => {
    if (indexes.length === 0) {
      logger('info', ['index', 'indexPosts', 'finished', 'success', success, 'fail', fail])
    } else {
      const index = indexes.pop()
      try {
        await addIndex(index)
        success++
      } catch (error) {
        fail++
        logger('error', ['index', 'indexPosts', error])
      }
      await next()
    }
  }
  await next()
}

indexPosts()
