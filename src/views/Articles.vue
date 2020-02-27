<template>
  <div class="container-fluid d-flex flex-column">
    <Navbar></Navbar>
    <div class="container col-lg-12 articles-container mt-4">
    <div class='tabs-container d-flex'>
      <!-- 頁籤 -->
      <div class='tab' :class='{activate:currentTab===index}' v-for='(tab,index) in tabs' :key='index' @click='currentTab = index, changeView(index)'>{{tab.name}} </div>

    </div >
    <div class='articles'>
      <allArticles v-if='view === "allArticles"'></allArticles>
      <likedArticles v-if='view === "likedArticles"'></likedArticles>
    
    </div>
    </div>


      <Footer/>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import allArticles from '../components/allArticles'
import likedArticles from '../components/likedArticles'

export default {
   name: "Articles",
  components: {
    Navbar,
    Footer,
    allArticles,
    likedArticles,
  },
  data(){
    return{
      view:'allArticles',
      tabs:[{name:'全部文章'},{name:'收藏文章'}],
      currentTab:0

    }
  },
  methods:{
    changeView(index){
      const vm = this;
      if(index === 0){
        vm.view = 'allArticles';
      }else if(index === 1){
        vm.view = 'likedArticles'
      }
    },
    

  },
  computed:{
    
  },
  mounted(){
 
   }
  
}
</script>

<style lang="scss" scoped>
.container-fluid {
  padding: 0px;
  margin: 0px;
}

.articles-container{

  .tab{
    background-color: black;
    color:white;
    padding:0.7rem 2rem;
    font-size: 20px;
    border-radius: 0.5rem 0.5rem 0 0;
    border-top:2px solid black;
    border-left:2px solid black;
    border-right:2px solid black;
    font-weight: bold;
  }

  .tab:hover{
    cursor: pointer;
  }

  .articles{
    border:2px solid black;
    padding:1rem;
    border-radius: 0 0.25rem 0.25rem 0.25rem;
  }
  .activate{
    background: white;
    color:black;
    
  }
}
  
</style>