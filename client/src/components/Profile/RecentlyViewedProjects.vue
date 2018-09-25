<template>
    <panel title="Recently Viewed Projects">
        <v-data-table
        :headers="headers"
        :pagination.sync="pagination"
        :items="projects">
            <template slot="items" slot-scope="props">
                <td class="text-xs-left">
                    {{props.item.title}}
                </td>
                <td class="text-xs-left">
                    {{props.item.uploader}}
                </td>
            </template>
        </v-data-table>
    </panel>
</template>

<script>
import {mapState} from 'vuex'
import ProjectHistoryService from '@/services/ProjectHistoryService'

export default {
  data () {
    return {
      headers: [
        {
          text: 'Title',
          value: 'title'
        },
        {
          text: 'uploader',
          value: 'uploader'
        }
      ],
      pagination: {
        sortBy: 'createdAt',
        descending: true
      },
      projects: []
    }
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      this.projects = (await ProjectHistoryService.index()).data
    }
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
