<template>
  <div slot>
      <v-text-field prepend-icon="search" hide-details single-line
      label="Search by project name, owners"
      v-model="search"
      ></v-text-field>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data () {
    return {
      search: ''
    }
  },
  watch: {
    search: _.debounce(async function (val) {
      const route = {
        name: 'projects'
      }
      if (this.search !== '') {
        route.query = {
          search: this.search
        }
      }
      this.$router.push(route)
    }, 700),
    '$route.query.search': {
      immediate: true,
      handler (val) {
        this.search = val
      }
    }
  }
}
</script>

<style>

</style>
