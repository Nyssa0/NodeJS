
<template>
  <div class="hello">
    <h1>Posts</h1>
    <hr>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="posts-container">
      <form @submit.prevent="insertPost">
        <h1>Create a post</h1>
        <div>
          <label htmlFor="title">
            Title
          </label>
          <input
              id="title"
              type="text"
              placeholder="Your title"
              v-model="title"
          />
        </div>
        <div>
          <label htmlFor="text">
            Text
          </label>
          <input
              id="text"
              type="text"
              placeholder="Your text"
              v-model="text"
          />
        </div>
        <div>
          <label htmlFor="author">
            Author
          </label>
          <input
              id="author"
              type="text"
              placeholder="Author"
              v-model="author"
          />
        </div>
        <div>
          <button>
            Create Post
          </button>
        </div>
      </form>
      <button v-on:click="getPosts">Get posts</button>
      <div class="post"
           v-for="post in posts"
           v-bind:key="post._id"
      >
        <p class="text">{{post}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'HelloWorld',
  data(){
    return {
      title : '',
      text : '',
      author : '',
      posts:["Cliquez sur le bouton 👆"],
      url:'http://localhost:3000/test/'
    }
  },

  methods: {

    getPosts(){
      const url = 'http://localhost:3000/test/'
      axios.get(url)
          .then( response => {
            this.posts = response.data
            console.log(this.posts)
          })
    },

    insertPost(){
      console.log("does it xork ?")
      axios.post('http://localhost:3000/test/',{
        title: this.title,
        text: this.text,
        author: this.author
      }).then(response =>{
        console.log(response)
      }).catch(error=>{
        console.log(error)
      })
    },

    checkForm: function (e) {
      if (this.name && this.age) {
        return true;
      }

      this.errors = [];

      if (!this.titre) {
        this.errors.push('titre required.');
      }
      if (!this.author) {
        this.errors.push('author required.');
      }

      e.preventDefault();
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>