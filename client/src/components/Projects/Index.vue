<template>
  <div>
    <v-layout light>
      <v-flex offset-xs4 xs4 class="">
        <projects-search-panel class="mb-2"/>
      </v-flex>
    </v-layout>
      <projects-panel />
  </div>
</template>

<script>
import ProjectsSearchPanel from './ProjectsSearchPanel'
import ProjectsPanel from './ProjectsPanel'
import ProjectService from '@/services/ProjectService'

import {mapState} from 'vuex'

export default {
  components: {
    ProjectsPanel,
    ProjectsSearchPanel
  },
  data () {
    return {
      projects: null
    }
  },
  mounted () {
    (async () => {
      // do a request ot the backend for all the projects
      this.projects = (await ProjectService.index()).data
    })()
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  }
}
</script>

<style>
img {
  width: 100%;
  height: 100%;
}
</style>
