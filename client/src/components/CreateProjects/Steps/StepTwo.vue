<template>
    <div>
        <template v-if="project.type =='image'">
             <div v-for="(link, index) in project.links" :key="index" >
                <img :src="link" alt="image">
            </div>
            <v-select
                id="linkform"
                v-model="project.links"
                label="Image Link"
                chips
                tags
                required
                :rules='[required]'
                @keyup.enter.native="submitImage"
                append-icon="fas fa-link"
                hint="press enter to submit link"
            ></v-select>
        </template>
       <template v-else-if="project.type =='audio'">
           <div v-for="(audio, index) in embedLinks" :key="index">
               <iframe v-if="audio.site =='sp'" :src="audio.embedded" width="500" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media" />
                <iframe v-else width="500" height="80" scrolling="no" frameborder="no" :src="audio.embedded"></iframe>
            </div>
             <v-select
                id="linkform"
                v-model="audioLink"
                label="Audio Link (SoundCloud, Spotify)"
                chips
                tags
                required
                :rules='[required]'
                @keyup.enter.native="submitAudio"
                @keyup.delete.native="deleteAudio"
                append-icon="fas fa-link"
                hint="press enter to submit link"
            ></v-select>
       </template>
        <template v-else>
            <div v-for="(video,index) in embedLinks" :key="index">
                <iframe v-if="video.site='yt'" :src="video.embedded"
                width="560" height="315" frameborder="0" allowfullscreen></iframe>
                <iframe v-else :src="video.link" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
            </div>
            <v-select
                id="linkform"
                v-model="project.links"
                label="Video Link"
                chips
                tags
                @keyup.enter.native="submitVideo"
                @keyup.delete.native="deleteVideo"
                append-icon="fas fa-users"
                hint="press enter to submit link"
            ></v-select>
        </template>
        <template v-if="project.links.length">
            <v-btn color="primary" @click="nextStep(2);convert()">Continue</v-btn>
        </template>
        <v-btn color="primary" @click="clearAll();nextStep(3)">back</v-btn>
    </div>
</template>

<script>
export default {
  props: ['project', 'nextStep', 'required'],
  data () {
    return {
      embedLinks: [],
      audioLink: []
    }
  },
  methods: {
    submitImage (event) {
      this.project.links.push(event.target.value)
    },
    submitAudio (event) {
      const link = this.audioLink[this.audioLink.length - 1]
      const checkSpotifyURI = new RegExp('spotify:track:.+')
      const checkSpotifyURL = new RegExp('(https://|http://)?open.spotify.com/.+')
      const checkSoundcloudURL = new RegExp('(https://|http://)?soundcloud.com/.+')

      if (checkSpotifyURI.test(link)) { //   If Spotify URI
        this.embedLinks.push({
          embedded: `https://open.spotify.com/embed?uri=${link}`,
          link,
          site: 'sp'
        })
      } else if (checkSpotifyURL.test(link)) { // If Spotify URL
        const code = link.match('[_*&0-9A-Za-z]{22}')[0]
        this.embedLinks.push({
          embedded: `https://open.spotify.com/embed/track/${code}`,
          link,
          site: 'sp'
        })
      } else if (checkSoundcloudURL.test(link)) { // If SoundCloud URL
        this.embedLinks.push({
          embedded: `https://w.soundcloud.com/player/?url=${link}&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true`,
          link,
          site: 'sc'
        })
      } else {
        return
      }
      this.project.links.push(link)
    },
    deleteAudio () {
      this.embedLinks = this.embedLinks.filter((oneEmbedLink) => {
        return this.audioLink.includes(oneEmbedLink.link)
      })
    },
    submitVideo () {
      const checkYoutubeURL = new RegExp('[A-Za-z0-9-*#_^@#!%$;]{11}')
      const checkVimeoURL = new RegExp('\\d+')

      const link = this.project.links[this.project.links.length - 1]
      if (this.project.links.slice(0, this.project.links.length - 1).includes(link)) {
        return
      }

      if (checkYoutubeURL.test(link)) {
        const id = link.match(checkYoutubeURL)[0]
        this.embedLinks.push({
          embedded: `http://www.youtube.com/embed/${id}`,
          link,
          site: 'yt'
        })
      } else if (checkVimeoURL.test(link)) {
        const id = link.match(checkVimeoURL)[0]
        this.embedLinks.push({
          embedded: `https://player.vimeo.com/video/${id}`,
          link,
          site: 'vm'
        })
      } else {

      }
    },
    deleteVideo () {
      this.embedLinks = this.embedLinks.filter((oneEmbedLink) => {
        return this.project.links.includes(oneEmbedLink.link)
      })
    },
    clearAll () {
      this.project.links = []
      this.embedLinks = []
    },
    convert () {
      this.project.links = this.embedLinks.map((link) => {
        return JSON.stringify(link)
      })
    }
  }
}
</script>

<style>
  #linkform{
    font-size: 8px;
  }
</style>
