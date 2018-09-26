<template>
    <panel title="Profile">
        <h1>{{user.username}}</h1>
        
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
        <div class = "profile-pic">
          <img src="https://via.placeholder.com/300x300">
          <div class="edit"><a href="#"><i class="fa fa-pencil fa-lg"></i></a></div>
        </div>
        
        <h2>{{user.email}}</h2>
        <h2>{{user.affiliation}}</h2>
        <div class="img">
          <img src="" alt="profile image">
        </div>

        <image id="profileImage" src="http://lorempixel.com/100/100" />
        <input id="imageUpload" type="file" 
        name="profile_photo" placeholder="Photo" required="" capture>

    </panel>
</template>

<script>

export default {
  props: ['user'],
  data () {
    return {
    }
  },
  methods: {
    test () {
      alert("HI")
    }
  }
}

</script>

<style>
#imageUpload
{
    display: none;
}

#profileImage
{
    cursor: pointer;
}

.profile-pic {
	position: relative;
	display: inline-block;
}

.profile-pic:hover .edit{
  display: block;
}

.edit {
	padding-top: 7px;	
	padding-right: 7px;
	position: absolute;
	right: 0;
	top: 0;
	display: none;
}

.edit a {
	color: black;
}

</style>
