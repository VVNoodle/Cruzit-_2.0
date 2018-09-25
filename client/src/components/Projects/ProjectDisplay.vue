<template>
  <v-card light
    :class="{'project-card':index !== cluster.length-1}">
    <template v-if="project.type=='image'">
      <img :src="project.links[0]"
        alt="image">
    </template>
    <template v-else-if="project.type=='video'">
      <iframe v-if="JSON.parse(project.links[0]).site='yt'"
        :src="JSON.parse(project.links[0]).embedded"
        width="100%"
        height="auto"
        frameborder="0"
        allowfullscreen></iframe>
      <iframe v-else
        :src="JSON.parse(project.links[0]).embedded"
        width="640"
        height="360"
        frameborder="0"
        webkitallowfullscreen
        mozallowfullscreen
        allowfullscreen></iframe>
    </template>
    <template v-else>
      <iframe v-if="JSON.parse(project.links[0]).site =='sp'"
        :src="JSON.parse(project.links[0]).embedded"
        width="100%"
        height="80"
        frameborder="0"
        allowtransparency="true"
        allow="encrypted-media" />
      <iframe v-else
        width="100%"
        height="80"
        scrolling="no"
        frameborder="no"
        :src="JSON.parse(project.links[0]).embedded"></iframe>
    </template>
    <v-card-title>
      <p class="text-sm-left">
        <strong>{{checkLong(project.title)}}</strong>
      </p>
    </v-card-title>
    <v-card-text>
      <p v-for="(owner,index) in project.owners"
        :key="index"
        class="text-sm-left">{{owner}}</p>
    </v-card-text>
    <v-card-actions>
      <v-btn small
        dark
        color="accent"
        :to='{name: "project", params: {projectId: project.id}}'>
        View
      </v-btn>
      <v-icon>favorite</v-icon>
      <p class="small-info">{{project.likes}}</p>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['index', 'project', 'cluster'],
  methods: {
    checkLong (title) {
      if (this.$vuetify.breakpoint.width >= 665 && title.length > 24) {
        return title.substring(0, 24) + ' ...'
      }
      return title.substring(0, 28) + ' ...'
    }
  }
}
</script>

<style>
</style>
