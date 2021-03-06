<template>
  <div class="container-fluid d-flex flex-column">
    <Navbar></Navbar>
    <div class="outer-container col-10 p-2 mt-4 d-flex flex-column align-self-center">
      <h2 class="text-center mt-2 mb-3">參加作者</h2>
      <SearchBar class="align-self-center mb-2" @search="filter"></SearchBar>
      <ul class="mt-3">
        <li class="d-flex flex-column" v-for="(item,index) in showCurrentPage" :key="index">
          <h4>{{item.name}}</h4>
          <p>{{item.updateTime}}</p>
          <div class="d-flex mt-auto ml-auto">
            <button class="author-btn open" @click="enterPersonal(item)">
              <i style="color:black" v-if="fullWidth<415" class="fas fa-clipboard-list"></i>
              <span v-else>
                文章
                <br />列表
              </span>
            </button>
            <button class="author-btn link">
              <a :href="item.blogUrl" target="_blank">
                <i v-if="fullWidth<415" class="fas fa-user-alt"></i>
                <span v-else>
                  前往
                  <br />網站
                </span>
              </a>
            </button>
          </div>
        </li>
      </ul>
      <Pagination :pageSize="pageSize" :totalPages="totalPages" @gotoPage="go"></Pagination>
    </div>

    <Footer />

    <!-- Modal -->
    <div
      class="modal fade author-modal"
      id="personalModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{tempAuthor.name}}- 文章列表</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <span>最近更新：{{tempAuthor.updateTime}}</span>
            <table class="table mt-2 table-striped" ref="table">
              <thead>
                <th>文章名稱</th>
              </thead>
              <tbody>
                <tr v-for="(item,index) in tempAuthor.blogList" :key="index">
                  <td>
                    <a
                      class="modal-link"
                      style="color:black"
                      :href="item.url"
                      target="_blank"
                    >{{item.title}}</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-dark" data-dismiss="modal">關閉</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import $ from "jquery";
import SearchBar from "../components/Searchbar";
import Pagination from "../components/Pagination";
import { mapGetters, mapActions } from 'vuex';
import { countTotalPages } from '../commonMethods.js';


export default {
  name: "Authors",
  components: {
    Navbar,
    Footer,
    SearchBar,
    Pagination
  },
  data() {
    return {
      pageSize: 12, //每頁顯示20條
      currentPage: 1, //目前頁碼
      totalPages: 0, //全部頁數
      filterText: "",
      displayPosts: [],
      tempAuthor: {},
      fullWidth: null
    };
  },
  computed: {
    ...mapGetters([
      'data',
    ]),
    //根據index決定目前要呈現那些資料
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
  watch:{
    data:{
      deep:true,
      handler(newVal){
        const vm = this;
        if(newVal.length>0){
          vm.data.forEach((item, index)=>{
            item.index = index+1;
          });
          vm.displayPosts = newVal;
          vm.totalPages = countTotalPages(vm.displayPosts, vm.pageSize);
        }
      }
    }
  }, 
  methods: {
    ...mapActions([
      'getData'
    ]),
    go(page) {
      this.currentPage = page;
    },
    //關鍵字篩選
    filter(text) {
      const vm = this;
      vm.filterText = text;
      if (vm.filterText != "") {
        let arr = [];

        vm.data.forEach(item => {
       if (item.name !== null) {
            const name = item.name.toUpperCase();
            const filterUpper = vm.filterText.toUpperCase();
            if (name.includes(filterUpper)) {
              arr.push(item);
            }
          }
        });
        //重新計算頁數
        vm.displayPosts = arr;
        vm.totalPages = countTotalPages(vm.displayPosts, vm.pageSize);
      } else if (vm.filterText === "") {
        vm.displayPosts = vm.data;
        vm.totalPages = countTotalPages(vm.displayPosts, vm.pageSize);
      }
    },
    enterPersonal(item) {
      const vm = this;
      vm.tempAuthor = Object.assign({}, item);
      $("#personalModal").modal("show");
    }
  },

  mounted() {
    const vm = this;
    vm.getData();
    //響應式:監控目前螢幕寬度
    vm.fullWidth = window.innerWidth;
    window.onresize = () => {
      vm.fullWidth = window.innerWidth;
    };
  }
};
</script>

<style lang="scss" scoped>
.container-fluid {
  padding: 0;
  margin: 0;
}

a {
  text-decoration: none;
}
.outer-container {
  border: 2px solid black;

  ul {
    padding: 0px;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    li {
      background: black;
      margin-bottom: 10px;
      width: 32%;
      padding: 0.5rem;
      border-radius: 0 1.5rem 0 0;
      color: white;

      .author-btn {
        -webkit-appearance: none;
        border: none;
        padding: 0 1rem;
        border-radius: 0.5rem;
        margin: 3px;
      }
      .author-btn:focus {
        outline: none;
      }

      .author-btn.open {
        background-color: gray;
        color: white;
        &:hover {
          background-color: #69f0ae;
        }
      }
      .author-btn.link {
        background-color: white;
        &:hover {
          background-color: #69f0ae;
        }
      }
      .author-btn.link a {
        color: black;
      }

      h4 {
        font-weight: bold;
        font-size: 2rem;
      }
      p {
        font-size: 0.7rem;
      }
    }
  }
}

@media (max-width: 415px) {
  .outer-container ul li {
    width: 47%;
    .author-btn {
      padding: 0.5rem 1rem;

    }
  }
}
</style>
