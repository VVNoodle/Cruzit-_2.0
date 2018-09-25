<template>
    <div>
        <v-layout>
            <v-flex xs6>
                <project-metadata :project="this.project"></project-metadata>
            </v-flex>
            <v-flex xs6>
                <project-details :project="this.project" />
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs6>
                <images :project="this.project" />
            </v-flex>
            <v-flex xs6>
                <achievements :project="this.project" />
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs12>
                <comments :project="this.project" />
            </v-flex>
        </v-layout>
        <div v-if="isUserLoggedIn && byUser">
            <v-btn v-if="!yousure" class="red" dark @click="yousure = true">
                Delete
            </v-btn>
            <div v-else>
                <h2>Are you sure?</h2>
                <v-btn class="red accent-4" dark @click="deleteproject">
                    Yes
                </v-btn>
                <v-btn class="green darken-1" dark @click="yousure = false">
                    No
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import ProjectService from '@/services/ProjectService'
import ProjectHistoryService from '@/services/ProjectHistoryService'
import ProjectMetadata from './ProjectMetadata'
import Achievements from './Achievements'
import Comments from './Comments'
import ProjectDetails from './ProjectDetails'
import Images from './Images'
import {mapState} from 'vuex'

export default {
  data () {
    return {
      project: {},
      yousure: false
    }
  },
  methods: {
    deleteproject () {
      try {
        ProjectService.delete(this.project.id)
          .then(() => {
            this.$router.go(-1)
          })
      } catch (err) {
        console.log(err)
      }
    }
  },
  async mounted () {
    const projectId = this.route.params.projectId
    this.project = (await ProjectService.show(projectId)).data
    if (this.isUserLoggedIn) {
      await ProjectHistoryService.post({
        projectId
      })
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user',
      'route'
    ]),
    byUser () {
      return this.user.id === this.project.uploaderId
    }
  },
  components: {
    ProjectMetadata,
    Achievements,
    Comments,
    ProjectDetails,
    Images
  }
}
</script>

<style scoped>
</style>
