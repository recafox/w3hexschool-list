<template>
  <div class='d-flex flex-column'>
    <div class="d-flex justify-content-center mb-2 mt-2">
      
    </div>
    <ul v-if='showCurrentPage.length!==0'>
     <li v-for='(item, index) in showCurrentPage' :key='index'>
       
       <a :href='item.url' target='_blank'>
         <h5>{{item.title}}</h5>
         <p>{{item.name}}</p>     
       </a>
        <button @click='removeFromLikes(item)' class='remove-btn ml-auto'><i class="fas fa-times-circle"></i>
       </button>
       


     </li>
      
    </ul>

    <h5 v-else class='text-center text-muted mb-4'>還沒有收藏文章喔</h5>
    <Pagination :pageSize='pageSize' :totalPages='totalPages' @gotoPage='go'></Pagination>
  </div>
</template>

<script>
import $ from 'jquery';
import SearchBar from "../components/Searchbar";
import Pagination from "../components/Pagination";
import { mapGetters, mapActions } from 'vuex';
import { countTotalPages } from '../commonMethods.js';

export default {
  name:'LikedArticles',
  components: {
    SearchBar,
    Pagination
  },
  data(){
    return{
      pageSize: 10, //每頁顯示10條
      currentPage: 1, //目前頁碼
      totalPages: 0, //全部頁數
      displayPosts: [],
    }
  },
  
  computed: {
    showCurrentPage: function() {
      /*currentPage = 1 1~12 
        currentPage = 2 13~25
        currentPage = 3 26~38
        [(page-1)*12]+1 ~ [(page-1)*12]+12                
      */
      const vm = this;
      let display = [];
      for (let i = 0; i < vm.pageSize; i++) {
        if (
          vm.displayPosts[(vm.currentPage - 1) * vm.pageSize + i] !== undefined
        ) {
          display.push(vm.displayPosts[(vm.currentPage - 1) * vm.pageSize + i]);
        }
      }
      return display;
    },
    ...mapGetters([
      'likedPosts'
    ])
  },
  watch:{
    likedPost:{
      deep:true,
      handler(newVal){
        const vm = this;
        if(newVal.length>0){
          vm.displayPosts = vm.likedPosts;
          vm.totalPages = countTotalPages(vm.displayPosts, vm.pageSize);
        }
      }
    }
  },
  methods:{
    ...mapActions([
      'removeFromLikes'
    ]),   
    go(page) {
      this.currentPage = page;
    },    
  },
  mounted(){
    const vm = this;
    vm.displayPosts = vm.likedPosts;
    vm.totalPages = countTotalPages(vm.displayPosts, vm.pageSize);

  },
}
</script>


<style lang="scss" scoped>

ul {
  padding: 1rem;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  li {
      width: 48%;
      background-color: gray;
      margin-bottom: 10px;
      padding: 1rem;
      display:flex;
      position:relative;

    h5 {
      font-size: 1.5rem;
    }
    a {
      display: block;
      text-decoration: none;
      color: white;
    }
  }
  li:hover {
    background-color: #69f0ae;
    a {
      color: black;
    }
  }
  .remove-btn{
    border: none;
    border-radius: 1.25rem 0 0 0;
    background: transparent;
    height: 50%;
    font-size: 44px;
    line-height:44px;
    padding: 0rem 0.7rem;
    -ms-flex-item-align: end;
    align-self: flex-end;
    position: absolute;
    bottom: 0;
    right: 0;
    color:white;
  }

  .remove-btn:hover{
    background-color: white;
    color:#69f0ae;
  }
  .remove-btn:focus{
    outline:none;

  }
}

@media(max-width:415px){
  ul li{
    width:100%;
  }
}
</style>