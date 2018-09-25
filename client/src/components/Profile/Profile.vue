<template>
    <panel title="Profile">
        <h1>{{user.username}}</h1>
        <h2>{{user.email}}</h2>
        <h2>{{user.affiliation}}</h2>
        <div class="img">
          <img src="" alt="profile image">
        </div>
    </panel>
</template>

<script>
export default {
  props: ['user'],
  data () {
    return {

    }
  }
}
</script>

<style>

</style>
