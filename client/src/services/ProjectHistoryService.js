import API from '@/services/API'

export default {
  index (params) {
    return API().get('history')
  },
  post (history) {
    return API().post('history', history)
  }
}
