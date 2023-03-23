
import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
// create our store
export default createStore({
  state:{
    user: "",
    userTask:'',
    image:'',
  },

  getters: {
    getUser(state){
      return state.user
    },
    getImage(state){
      return state.image
    },
    getUserTask(state){
      return state.userTask
    }
  },

  mutations:{
    setUser(state, user){
      state.user = user
    },
    setImage(state, img){
      state.image = img
    },
    setUserTask(state, userTask){
      state.userTask = userTask
    },
  },

  actions:{
    setUser(context, user){
      context.commit('setUser', user)
    },
    setImage(context, img){
      context.commit('setImage', img)
    },
    setUserTask(context, userTask){
      context.commit('setUserTask', userTask)
    },

  },
  plugins: [createPersistedState()],
})