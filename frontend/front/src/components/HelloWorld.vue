<template>
  <div class="hello">
    <h1>Posts</h1>
    <hr>
    <p class="error">

    </p>
<!--    form create post
    <form
        id="app"
        @submit="checkForm"
        action="http://localhost:3000/test/"
        method="post"
    >

      &lt;!&ndash;      <p v-if="errors.length">&ndash;&gt;
      &lt;!&ndash;        <b>Please correct the following error(s):</b>&ndash;&gt;
      &lt;!&ndash;      <ul>&ndash;&gt;
      &lt;!&ndash;        <li v-for="error in errors">{{ error }}</li>&ndash;&gt;
      &lt;!&ndash;      </ul>&ndash;&gt;
      &lt;!&ndash;      </p>&ndash;&gt;


      <p>
        <label for="titre">Titre</label>
        <input
            id="titre"
            v-model="titre"
            type="text"
            name="titre"
        >
      </p>

      <p>
        <label for="author">Author</label>
        <input
            id="author"
            v-model="author"
            type="text"
            name="author"
        >
      </p>

      <p>
        <label for="text">Text</label>
        <input
            id="text"
            v-model="text"
            type="text"
            name="text"
        >
      </p>

      <p>
        <input
            type="submit"
            value="Submit"
        >
      </p>

    </form>-->

  </div>
</template>

<script>
import postService from '../postService'
export default {
  name: 'HelloWorld',
  data(){
    return {
      posts: [],
      error: '',
      text: ''
    }
  },

  async created() {
    try {
      this.posts = await postService.getPosts()
    } catch (err) {
      this.error = err.message
    }
  },

  methods: {

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