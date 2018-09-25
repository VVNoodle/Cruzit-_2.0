<template>
    <v-container>
        <v-layout>
             <v-flex xs12>
                <profile-info :user="user"></profile-info>
            </v-flex>
        </v-layout>
        <v-layout v-if="isUserLoggedIn">
             <v-flex xs6 class="mr-2">
                <projects-bookmarks/>
            </v-flex>
            <v-flex xs6>
                <recently-viewed-projects/>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import ProjectsBookmarks from './ProjectsBookmarks'
import RecentlyViewedProjects from './RecentlyViewedProjects'
import Profile from './Profile'

import {mapState} from 'vuex'

export default {
  components: {
    ProjectsBookmarks,
    RecentlyViewedProjects,
    'profile-info': Profile
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

</style>
