<template>
    <panel title="Bookmarks">
        <v-data-table
        :headers="headers"
        :pagination.sync="pagination"
        :items="bookmarks">
            <template slot="items" slot-scope="props">
                <td class="text-xs-left">
                    {{props.item.title}}
                </td>
                <td class="text-xs-left">
                    <!-- {{props.item.uploader}} -->
                </td>
            </template>
        </v-data-table>
    </panel>
</template>

<script>
import {mapState} from 'vuex'
import BookmarksService from '@/services/BookmarksService'

export default {
  data () {
    return {
      headers: [
        {
          text: 'Title',
          value: 'title'
        },
        {
          text: 'uploaderId',
          value: 'uploaderId'
        }
      ],
      pagination: {
        sortBy: 'date',
        descending: true
      },
      bookmarks: []
    }
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      this.bookmarks = (await BookmarksService.index()).data
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
