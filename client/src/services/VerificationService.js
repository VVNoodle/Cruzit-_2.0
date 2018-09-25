import API from '@/services/API'

export default {
  verify (secretToken) {
    return API().post(`verify/${secretToken}`)
  }
}
