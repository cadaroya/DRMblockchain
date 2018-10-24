<template>
  <section id='signup'>
    <h1>Sign up</h1>
    <div class="form">
      <div class="entry">
        <!--
        <button @click="signup" name="signup">Sign up</button>
        <input name="pseudo" v-model="form.pseudo">
        <label for="pseudo">Pseudo</label>
        -->
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'signup',
    data () {
      return {
        form: {
          pseudo: undefined
        }
      }
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>

  #signup {
    text-align: center;
    
    .form {
      display: flex;
      flex-direction: column;
      margin: auto;
      
      .entry {
        display: flex;
        flex-direction: row-reverse;
        justify-content: center;
        
        label {
          margin-right: 20px
        }
        
        button {
          margin-left: 20px
        }  
        
      }
        
    }
    
  }

</style>
