<template>
  <div class="container-fluid d-flex flex-column">
    <Navbar></Navbar>
    <Latest v-if="data.length" :latest="data"></Latest>
    <LatestAuthor
      v-if="data.length"
      :latest="data"
      @addLike="addToFav"
      :likePost="likePost"
      ref="authorList"
    ></LatestAuthor>

    <Bookmark v-if='likePost.length !==0' :likePost="likePost" @cancelThis="cancelThat" />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Latest from "../components/Latest";
import LatestAuthor from "../components/LatestAuthor";
import Bookmark from "../components/Bookmark";

/**
 * blogList:Array[3]
    0:Object
    1:Object
    2:Object

blogUrl:"https://medium.com/@its_okay/javascript-%E6%80%8E%E9%BA%BC%E5%9C%A8%E9%9B%BB%E8%85%A6%E4%B8%8A%E9%81%8B%E8%A1%8C-w3hexschool-01-dfab138084b7"

name:"Kay"

updateTime:"2020/2/18 下午 7:49:36"

 */
export default {
  name: "Home",
  components: {
    Navbar,
    Latest,
    LatestAuthor,
    Bookmark,
    Footer
  },
  data() {
    return {
      data: [],
      likePost: JSON.parse(localStorage.getItem("likePost")) || []
    };
  },
  methods: {
    

    getMillesecond(time) {
      let millisecond;
      let allTime = time.split(' ');
      let found = allTime[2].indexOf('12');
   
      if (allTime.includes('上午')) {
        let newTime = allTime.join(' ');
        const timeString = newTime.replace("上午", "");
        millisecond = new Date(timeString).getTime();
      }else if(allTime.includes('下午') && found === 0){
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

    setToStorage() {
      const vm = this;
      let str = JSON.stringify(vm.likePost);
      localStorage.setItem("likePost", str);
    },

    initPosts() {
      const vm = this;
      vm.data.forEach(item => {
        item.blogList.forEach(item => {
          item.marked = false;
        });
        item.likedAuthor = false;
        if(item.name === null){
          item.name = '無名氏';
        }
      });
      vm.data = vm.data.sort((a, b) => {
        const aTime = vm.getMillesecond(a.updateTime);
        const bTime = vm.getMillesecond(b.updateTime);
        return aTime > bTime ? -1 : 1;
      });
    },

    //加入收藏
    addToFav(obj) {
      const vm = this;
      //狀態判斷: 若該文章被點擊收藏, 且該文章目前marked為false,則變為true (反之則相反)
      for (let i = 0; i < vm.data.length; i++) {
        for (let y = 0; y < vm.data[i].blogList.length; y++) {
          if (
            vm.data[i].blogList[y].title === obj.title &&
            vm.data[i].blogList[y].marked === false
          ) {
            vm.data[i].blogList[y].marked = true;
          } else if (
            vm.data[i].blogList[y].title === obj.title &&
            vm.data[i].blogList[y].marked === true
          ) {
            vm.data[i].blogList[y].marked = false;
          }
        }
      }
      //抓出目前marked = true的文章, 加入likePost
      let arr = [];
      for (let i = 0; i < vm.data.length; i++) {
        for (let y = 0; y < vm.data[i].blogList.length; y++) {
          if (vm.data[i].blogList[y].marked === true) {
            let obj = {
              name: vm.data[i].name,
              title: vm.data[i].blogList[y].title,
              url: vm.data[i].blogList[y].url
            };
            arr.push(obj);
          }
        }
      }

      vm.likePost = arr;
      vm.setToStorage();
    },
    //假設之前有收藏過文章在localstorage, 在下次打開網頁載資料時將狀態同步
    syncLikePosts() {
      const vm = this;
      if (vm.likePost.length !== 0) {
        vm.data.forEach(item => {
          for (let i = 0; i < vm.likePost.length; i++) {
            for (let y = 0; y < item.blogList.length; y++) {
              if (item.blogList[y].title === vm.likePost[i].title) {
                item.blogList[y].marked = true;
              }
            }
          }
        });
      } else {
        return;
      }
    },
    //移除收藏
    cancelThat(item) {
      const vm = this;
      for (let i = 0; i < vm.data.length; i++) {
        for (let y = 0; y < vm.data[i].blogList.length; y++) {
          if (vm.data[i].blogList[y].title === item.title) {
            vm.data[i].blogList[y].marked = false;
          }
        }
      }
      let arr = [];

      vm.data.forEach(item => {
        item.blogList.forEach(post => {
          if (post.marked === true) {
            let obj = {
              name: item.name,
              title: post.title,
              url: post.url
            };
            arr.push(obj);
          }
        });
      });
      vm.likePost = arr;
      vm.setToStorage();
    },

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
        vm.data = data;
        vm.initPosts();
        vm.syncLikePosts();
      });
  }
};
</script>

<style lang="scss" scoped>
.container-fluid {
  padding: 0;
  margin: 0;
}
</style>
