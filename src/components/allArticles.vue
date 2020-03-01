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
        <button class="like-btn ml-auto" @click="like(item)">
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

export default {
  name: "allArticles",
  components: {
    SearchBar,
    Pagination
  },
  data() {
    return {
      //data: [],
      allPosts: [], //全部
      pageSize: 12, //每頁顯示20條
      currentPage: 1, //目前頁碼
      totalPages: 0, //全部頁數
      filterText: "",
      displayPosts: [],
      likePost: JSON.parse(localStorage.getItem("likePost")) || []
    };
  },
  methods: {
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
        for (let i = 0; i < posts.length; i++) {
          posts[i].index = i + 1;
        }
        vm.allPosts = posts;
    },
    initData(data){
      const vm = this;
        data.forEach(item => {
          item.blogList.forEach(item => {
            item.marked = false;
          });
          item.likedAuthor = false;
          if(item.name === null){
            item.name = '無名氏';
          }
        });
        //時間新->舊排序
        
        data = data.sort((a,b)=>{
          const aTime = vm.getMillesecond(a.updateTime);
          const bTime = vm.getMillesecond(b.updateTime);
          return aTime > bTime? -1:1;
        })
    },
    setToStorage() {
      const vm = this;
      let str = JSON.stringify(vm.likePost);
      localStorage.setItem("likePost", str);
    },

    countTotalPages(display){
      const vm = this;
      vm.displayPosts = display;
      vm.totalPages = Math.ceil(vm.displayPosts.length / vm.pageSize);
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
        vm.countTotalPages(arr);
      } else if (vm.filterText === "") {
        vm.countTotalPages(vm.allPosts);
      }
    },
    like(item) {
      const vm = this;
      vm.allPosts.forEach(post => {
        if (
          post.posts.title === item.posts.title &&
          post.posts.marked === false
        ) {
          post.posts.marked = true;
          let obj = {
            name: item.name,
            title: item.posts.title,
            url: item.posts.url
          };
          vm.likePost.push(obj);
        } else if (
          post.posts.title === item.posts.title &&
          post.posts.marked === true
        ) {
          post.posts.marked = false;
          for (let x = 0; x < vm.likePost.length; x++) {
            if (vm.likePost[x].title === item.posts.title) {
              vm.likePost.splice(x, 1);
            }
          }
        }
      });
      vm.setToStorage();
      
    },
    syncLike() {
      const vm = this;
      for (let i = 0; i < vm.allPosts.length; i++) {
        for (let y = 0; y < vm.likePost.length; y++) {
          if (vm.allPosts[i].posts.title === vm.likePost[y].title) {
            vm.allPosts[i].posts.marked = true;
          }
        }
      }
    },
    getMillesecond(time) {
      let millisecond;
      let allTime = time.split(' ');
      let found = allTime[2].indexOf('12');
   
      if (allTime.includes('上午')) {
        let newTime = allTime.join(' ');
        const timeString = newTime.replace("上午", "");
        millisecond = new Date(timeString).getTime();
      }else if(allTime.includes('下午') && found === 0){
        //中午
        let newTime = allTime.join(' ');
        const timeString = newTime.replace("下午", "");
        millisecond = new Date(timeString).getTime();
      }   
      else if (time.indexOf("下午") > -1 && found !==0) {
        const timeString = time.replace("下午", "");
        millisecond = new Date(timeString).getTime() + 12 * 60 * 60 * 1000;
      }

      return millisecond;
    },
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
    }
  },

  mounted() {
    const vm = this;
    const url =
      "https://raw.githubusercontent.com/hexschool/w3hexschool-API/master/data.json?fbclid=IwAR11uWoLrSLDYPYXv2PH5f1StWmFo4EmyjCKbOfUx5GCa3YTldwF_rJxL5Q";
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(data => {
        //設定資料初始狀態
        vm.initData(data);   
        vm.getAllPosts(data);
        vm.syncLike();
        //計算頁數
        vm.countTotalPages(vm.allPosts);

      });
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