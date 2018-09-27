import API from '@/services/API'

export default {
  index (upvote) {
    return API().get('upvotes', {
      params: upvote
    })
  },
  post (upvote) {
    return API().post('upvotes', upvote)
  }
}
