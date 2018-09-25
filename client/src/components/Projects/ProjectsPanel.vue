<template>
  <div>
    <v-layout v-for="(cluster, clusterIdx) in projects"
      class="mb-2"
      :key="clusterIdx">
      <v-flex v-for="(project, index) in cluster"
        :key="project.id"
        :xs3="$vuetify.breakpoint.width >= 885"
        :xs4="$vuetify.breakpoint.width < 885"
        :xs6="$vuetify.breakpoint.width < 612"
        :xs12="$vuetify.breakpoint.width < 500">
        <!-- <panel :title="project.title" :class="{'project-card':  index !== cluster.length-1}"> -->
        <!-- <v-btn slot="action"  to="/projects/create" fab light medium absolute right class="yellow">
            <v-icon>fas fa-plus</v-icon>
          </v-btn> -->
        <!-- <div slot> -->
        <v-layout column>
          <project-display :index="index"
            :project="project"
            :cluster="cluster"></project-display>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import ProjectService from '@/services/ProjectService'
import ProjectDisplay from './ProjectDisplay'

import { mapState } from 'vuex'

export default {
  components: {
    ProjectDisplay
  },
  data () {
    return {
      projects: null,
      noCluster: null,
      exists: false
    }
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (val) {
        this.projects = (await ProjectService.index(val)).data
        this.noCluster = this.projects
        this.updateCluster()
      }
    },
    breakpoint: 'updateCluster'

  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ]),
    breakpoint () { return this.$vuetify.breakpoint }
  },
  methods: {
    updateCluster () {
      let group = []
      let limit = 0
      let cluster = 0
      let clusters = []
      if (!this.$vuetify.breakpoint) {
        limit = 1
      } else {
        this.exists = true
        if (this.$vuetify.breakpoint.width < 500) {
          limit = 1
        } else if (this.$vuetify.breakpoint.width < 612) {
          limit = 2
        } else if (this.$vuetify.breakpoint.width < 885) {
          limit = 3
        } else {
          limit = 4
        }
      }
      this.projects = this.noCluster
      if (this.projects && this.projects.length) {
        this.projects.forEach((project, index) => {
          group.push(project)
          cluster++
          if (cluster === limit || this.projects.length - 1 === index) {
            clusters.push(group)
            group = []
            cluster = 0
          }
        })
        this.projects = clusters
      }
    },
    getDate (date) {
      let finalDate = ''
      for (let index = 0; index < 10; index++) {
        finalDate += date[index]
      }
      return finalDate
    }
  }
}
</script>

<style>
img {
  width: 100%;
  height: auto;
}
.project-card {
  margin-right: 10px;
  padding: 0px;
}

.detail-info {
  font-size: 15px;
  margin: 0;
  padding: 0;
}

.small-info {
  font-size: 0.8em;
  overflow: hidden;
}
</style>
