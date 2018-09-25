import API from '@/services/API'

export default {
  addOwner (username, projectId) {
    return API().post('addowner', [projectId, username])
  }
}
