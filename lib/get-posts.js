const axios = require('axios')
const logger = require('./logger')

module.exports = () => {
  return new Promise(async (resolve, reject) => {
    let page = 0
    let posts = []
    const next = async () => {
      page++
      const url = `${process.env.SOURCE_URL}?page=${page}`
      logger('info', ['get-posts', 'url', url, 'start'])
      try {
        const { data } = await axios.get(url)
        logger('info', ['get-posts', 'url', url, 'posts', data.length, 'success'])
        posts = posts.concat(data)
        await next()
      } catch (error) {
        if (error.response.data.code === 'rest_post_invalid_page_number') {
          logger('info', ['get-posts', 'all posts retreived', 'finished'])
          resolve(posts)
        } else {
          logger('error', ['get-posts', error])
          reject(error)
        }
      }
    }
    await next()
  })
}
