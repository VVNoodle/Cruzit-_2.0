import API from '@/services/API'

export default {
  index (search) {
    return API().get('projects', {
      params: {
        search
      }
    })
  },
  post (project) {
    return API().post('projects', project)
  },
  show (projectId) {
    return API().get(`projects/${projectId}`)
  },
  edit (project) {
    return API().put(`projects/${project.id}`, project)
  },
  delete (projectId) {
    return API().delete(`projects/${projectId}`)
  }
}
