<template>
  <div class="d-flex flex-column">
    <div class="d-flex justify-content-center mb-2 mt-2">
      <SearchBar @search="filter"></SearchBar>
    </div>
    <ul>
      <li v-for="(item,index) in showCurrentPage" :key="item+index">
        <div>
          <a :href="item.posts.url" target="_blank">
            <h5>{{item.posts.title}}</h5>
            <p class="mt-3">{{item.name}}</p>
          </a>
        </div>
        <button class="like-btn ml-auto" @click="like(item.posts)">
          <i v-if="item.posts.marked" class="fas fa-heart" style="color:red"></i>
          <i v-else class="far fa-heart"></i>
        </button>
      </li>
    </ul>
    <Pagination :pageSize="pageSize" :totalPages="totalPages" @gotoPage="go"></Pagination>
  </div>
</template>

<script>
import $ from "jquery";
import SearchBar from "../components/Searchbar";
import Pagination from "../components/Pagination";
import { mapState, mapGetters, mapActions } from 'vuex';
import { countTotalPages } from '../commonMethods.js';
export default {
  name: "allArticles",
  components: {
    SearchBar,
    Pagination
  },
  data() {
    return {
      allPosts: [], //全部
      pageSize: 12, //每頁顯示20條
      currentPage: 1, //目前頁碼
      totalPages: 0, //全部頁數
      filterText: "",
      displayPosts: [],
      totalPages:0,
    };
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
      'data',
      'likedPosts'
    ]),
  },
  watch:{
    data:{
      deep:true,
      handler(newVal){
        const vm = this;
        if(newVal.length >0){
          vm.getAllPosts(vm.data);
        }
      }
    },
    allPosts:{
      deep:true,
      handler(newVal){
        const vm = this;
        if(newVal.length >0){
          vm.displayPosts = newVal;
          vm.totalPages = countTotalPages(vm.displayPosts, vm.pageSize);
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'getData',
      'addToLikes',
      'removeFromLikes'
    ]),
    getAllPosts(data){
      const vm = this;
        let posts = [];
        for (let i = 0; i < data.length; i++) {
          for (let y = 0; y < data[i].blogList.length; y++) {
            let obj = {
              name: data[i].name,
              posts: data[i].blogList[y]
            };
            posts.push(obj);
          }
        }
        posts.forEach((item, index)=>{
          posts[index].index = index+1;
        })
        vm.allPosts = posts;
    },
 
    //翻頁
    go(page) {
      //console.log(page);
      this.currentPage = page;
    },
    filter(text) {
      const vm = this;
      vm.filterText = text;
      if (vm.filterText != "") {
        let arr = [];
        vm.allPosts.forEach(item => {
          if (
            item.posts.title.toLowerCase().includes(vm.filterText.toLowerCase())
          ) {
            arr.push(item);
          }
        });
        
        //重新計算頁數
        vm.displayPosts = arr;
        vm.totalPages = countTotalPages(vm.displayPosts,vm.pageSize);
      } else if (vm.filterText === "") {
        vm.displayPosts = vm.allPosts;
        vm.totalPages = countTotalPages(vm.displayPosts, vm.pageSize);
      }
    },
    like(item) {
      const vm = this;
      vm.data.forEach(author =>{
        author.blogList.forEach(post =>{
          switch(true){
            case post.title === item.title && post.marked === false:
              post.marked = true;
              vm.addToLikes(item);
              break;
            case post.title === item.title && post.marked === true:
              post.marked = false;
              vm.removeFromLikes(item);
              break;
          }
        })
      })
      
    },
  },

  mounted() {
    const vm = this;
    vm.getData();
    
  }
};
</script>



<style lang="scss" scoped>
input, select, button{
  -webkit-appearance: none;
}
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
    display: flex;

    .like-btn {
      
      width: 44px;
      height: 44px;
      border: 2px solid black;
      font-size: 24px;
      border-radius: 0.25rem;
      background: white;
    }

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
}

@media (max-width: 415px) {
  ul li {
    width: 100%;
  }
}
</style>