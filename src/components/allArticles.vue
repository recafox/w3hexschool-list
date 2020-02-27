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
        <button class='like-btn ml-auto' @click="like(item)">
          <i v-if="item.posts.marked" class="fas fa-heart" style='color:red'></i>
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
      likePost: JSON.parse(localStorage.getItem("likePost")) || [],
    };
  },
  methods: {

    //2020/2/18 下午 7:49:36 -> 1582026576
    convertTime(item) {
      let rawStr = item.updateTime;
      let str1 = rawStr.replace(new RegExp("/", "g"), "-");
      let str2 = str1.split(" ");
      //console.log(str2); //"2020-2-15", "下午", "7:44:01"
      let str3 = str2[2].split(":");
      str2.splice(2, 1, str3);
      if (str2[1] === "下午" && Number(str2[2][0]) !== 12) {
        let num = Number(str2[2][0]) + 12;
        str2[2][0] = String(num);
        let time = str2[2].join(":");
        str2.splice(1, 2, time);
      } else if (str2[1] === "下午" && Number(str2[2][0]) === 12) {
        let time = str2[2].join(":");
        str2.splice(1, 2, time);
      } else if (str2[1] === "上午") {
        let time = str2[2].join(":");
        str2.splice(1, 2, time);
      }
      let strTime = str2.join(" ");
      let converted = new Date(strTime);
      let time1 = Date.parse(converted);
      return time1;
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
          if (item.posts.title.toLowerCase().includes(vm.filterText.toLowerCase())) {
            arr.push(item);
          }
        });
        //console.log(arr);
        vm.displayPosts = arr;
        //重新計算頁數
        vm.totalPages = Math.ceil(vm.displayPosts.length / vm.pageSize);
      } else if (vm.filterText === "") {
        vm.displayPosts = vm.allPosts;
        vm.totalPages = Math.ceil(vm.displayPosts.length / vm.pageSize);
      }
    },
    like(item) {
      const vm = this;    
      vm.allPosts.forEach(post => {
        if (post.posts.title === item.posts.title && post.posts.marked === false) {
          post.posts.marked = true;
          let obj = {
            name:item.name,
            title:item.posts.title,
            url:item.posts.url
          };
          vm.likePost.push(obj);
         
         
        }else if(post.posts.title === item.posts.title && post.posts.marked === true){
          post.posts.marked = false;
          for(let x =0; x<vm.likePost.length; x++){
            if(vm.likePost[x].title === item.posts.title){
              vm.likePost.splice(x, 1);
            }
          }
          
        }
      });
      let arr = JSON.stringify(vm.likePost);
      localStorage.setItem('likePost', arr);
      //vm.syncLike();
      
    },
    syncLike(){
      const vm = this;
      for(let i=0; i<vm.allPosts.length; i++){
        for(let y=0; y<vm.likePost.length; y++){
          if(vm.allPosts[i].posts.title === vm.likePost[y].title){
            vm.allPosts[i].posts.marked = true;
          }
        }
      }
      
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

  },
 
  mounted() {
    console.log('all mounted');
    const vm = this;
    const url =
      "https://raw.githubusercontent.com/hexschool/w3hexschool-API/master/data.json?fbclid=IwAR11uWoLrSLDYPYXv2PH5f1StWmFo4EmyjCKbOfUx5GCa3YTldwF_rJxL5Q";
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(data => {      
        //設定資料初始狀態
        data.forEach(item => {
          item.timeStamp = vm.convertTime(item);
          item.blogList.forEach(item => {
            item.marked = false;
          });
          item.author = {
            name: item.name,
            isLiked: false
          };
        });
        //時間新->舊排序
        let latestArr = data.sort((a, b) => {
          //降冪
          return b.timeStamp - a.timeStamp;
        });
        data = latestArr;
        //取得全部文章
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
        vm.syncLike();
        //計算頁數
        vm.displayPosts = vm.allPosts;
        vm.totalPages = Math.ceil(vm.displayPosts.length / vm.pageSize);

       // localStorage.clear();
      });
  }
};
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
    display: flex;

    .like-btn{
      width: 44px;
      height: 44px;
      border: 2px solid black;
      font-size: 24px;
      border-radius: 0.25rem;
      padding: 0.5;
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