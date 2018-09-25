<template>
  <div>
    <panel title="Verification">
        <div slot>
            <template v-if="!user.error">
                <h1>Thanks for verifying your email, {{user.username}}! You can now log in.</h1>
                <h2>We hope you enjoy our site!</h2>
            </template>
            <template v-else-if="user.error">
                <h1 color="red">user.error</h1>
            </template>
            <template v-else>
                Loading...
            </template>
        </div>
    </panel>
  </div>
</template>

<script>
import VerificationService from '@/services/VerificationService.js'

export default {
  name: 'verify',
  data () {
    return {
      user: {}
    }
  },
  async beforeCreate () {
    this.user = (await VerificationService.verify(this.$route.params.secretToken)).data
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
