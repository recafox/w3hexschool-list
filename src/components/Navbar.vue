<template>
  <div>
    <nav class="navbar navbar-expand-lg">
      <router-link to="/" class="navbar-brand"><span style='color:#69F0AE'>H</span>ex post</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click='openBar'
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item"> <router-link class="nav-link p-3 text-white" to="/articles">
            <span class='nav-link-text'>文章</span>
          </router-link></li>
          <li class="nav-item "> <router-link class="nav-link p-3 text-white" to="/authors">
            <span class='nav-link-text'>參加作者</span>
          </router-link></li>
          <li class="nav-item ">
            <router-link class="nav-item nav-link p-3 text-white" to="/about">
            <span class='nav-link-text'>關於</span>
          </router-link>
          </li>
          <li class="nav-item ">
            <a href="https://www.hexschool.com/?adsource=gssearch&utm_source=google&utm_medium=cpc&utm_campaign=googleKeyword&gclid=CjwKCAiA7t3yBRADEiwA4GFlI5a8QS0RMw224q9T9INa2NAx5RWxrePxETk_1bY8l9dHrqV6yWLFnRoCdAcQAvD_BwE" target="_blank" class="nav-item nav-link p-3 text-white"><span class='nav-link-text'>六角學院</span></a>

          </li>
        </ul>
      </div>
    </nav>
   
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name:'Navbar',
  methods:{
    openBar(){
      $('.navbar-toggler').toggleClass('show');
    }
  }
}
</script>



<style lang="scss" scoped>
.container{
  padding:none;
  margin:none;
}
button:focus{
  outline:none;
}
.navbar {
  background-color: black;
  .navbar-brand {
    color: white;
    font-size: 40px;
    font-weight: bolder;
  }

  .navbar-toggler{
    border:2px solid white;
    padding:0;
    width:65px;
    height:50px;
    position:relative;

      .navbar-toggler-icon{
        background-color: white;
        width: 25px;
        height: 3px;
        position: absolute;
        right:0;
        transform: translateX(-50%);
        transition:0.2s all ease;

      }&::before{
        content: '';
        display: block;
        position: absolute;
        top: 20%;
        -webkit-transform: translateX(25%);
        transform: translateX(25%);
        background-color: white;
        width: 40px;
        height: 3px;
        transition:0.2s all ease;
       }
      &::after{
        content:'';
        display: block;
        position:absolute;
        bottom: 20%;
        transform: translateX(25%);
        background-color: white;
        width: 40px;
        height: 3px;
        transition:0.2s all ease;
      }
  
  }

  .navbar-toggler.show{
    .navbar-toggler-icon{
    left: 25px;
    width: 40px;

  }&::before{
    width:20px;
  }&::after{
    width:20px;
  }
  
  }


  .nav-item {
    letter-spacing: 0.25rem;
    position:relative;
    width:130px;
    font-size: 20px;

    .nav-link{
      position:relative;
      text-align: center;
    }

    .nav-link::after {
      content: "";
      width: 0%;
      position: absolute;
      top: 39px;
      height: 10px;
      display: block;
      transform:translateX(-100%);
      border-bottom: 0.5rem solid #69F0AE;
      transition:all 0.2s ease;
    }
    .nav-link:hover::after{
       width:80%;
       transform:translateX(-5%);
    }
  }
}

@media(max-width:415px){
  .navbar .nav-item .nav-link{
    text-align: left;
  }

}
</style>