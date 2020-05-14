import Vue from 'vue'
import Vuex from 'vuex'

import { getMilleSecond,setToStorage } from '../commonMethods.js'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        data:[],
        likedPosts:[],
    },
    //非同步行為
    actions:{
        getLikedPosts(context){
            return new Promise((resolve)=>{
                context.commit('GOT_LIKEDPOSTS',JSON.parse(localStorage.getItem('likePost')) || []);
                resolve();
            })
        },
        getData({ commit, dispatch, state }){
            console.log('get data from store');
            return dispatch('getLikedPosts').then(()=>{
                const url ="https://raw.githubusercontent.com/hexschool/w3hexschool-API/master/data.json?fbclid=IwAR11uWoLrSLDYPYXv2PH5f1StWmFo4EmyjCKbOfUx5GCa3YTldwF_rJxL5Q";
                fetch(url).then(res => {
                    return res.json();
                }).then(data => {
                    data.forEach(item => {
                      item.blogList.forEach(item => {
                        item.marked = false;
                      });
                      item.likedAuthor = false;
                      if(item.name === null){
                        item.name = '無名氏';
                      }
                    });
                    data.sort((a,b)=>{
                        const aTime = getMilleSecond(a.updateTime);
                        const bTime = getMilleSecond(b.updateTime);
                        return aTime > bTime ? -1 : 1;
                    })
                    if(state.likedPosts){
                        data.forEach(item => {
                            for (let i = 0; i < state.likedPosts.length; i++) {
                              for (let y = 0; y < item.blogList.length; y++) {
                                if (item.blogList[y].title === state.likedPosts[i].title) {
                                  item.blogList[y].marked = true;
                                }
                              }
                            }
                          });
                    }
                    commit('DATA', data);                
                })
            })

        },
        addToLikes({ state, commit }, payload){
            let arr = state.likedPosts;
            //console.log(payload);
            arr.push(payload);
            //console.log('new liked list'+arr);
            setToStorage(arr);
            commit('GOT_LIKEDPOSTS', arr);
        },
        removeFromLikes({ state, commit }, payload){
            let arr = state.likedPosts;
            arr.forEach((item, index)=>{
                if(item.url === payload.url){
                    arr.splice(index, 1);
                }
            });
            setToStorage(arr);
            commit('GOT_LIKEDPOSTS', arr);
        }
    },
    //改變資料狀態
    mutations:{
        DATA(state, payload){
            state.data = payload;
        },
        GOT_LIKEDPOSTS(state, payload){
            state.likedPosts = payload;
        }
    },
    getters:{
        data: state => state.data,
        likedPosts: state => state.likedPosts,
    }
});