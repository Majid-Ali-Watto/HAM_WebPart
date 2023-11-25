/** @format */

import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
// create our store
export default createStore({
	state: {
		user: "",
		userTask: "",
		image: "",
		loginKey: "",
	},

	getters: {
		getUser(state) {
			return state.user;
		},
		getLoginKey(state) {
			return state.loginKey;
		},
		getImage(state) {
			return state.image;
		},
		getUserTask(state) {
			return state.userTask;
		},
	},

	mutations: {
		setUser(state, user) {
			state.user = user;
		},
		setLoginKey(state, loginKey) {
			state.loginKey = loginKey;
		},
		setImage(state, img) {
			state.image = img;
		},
		setUserTask(state, userTask) {
			state.userTask = userTask;
		},
	},

	actions: {
		setUser(context, user) {
			context.commit("setUser", user);
		},
		setLoginKey(context, loginKey) {
			context.commit("setLoginKey", loginKey);
		},
		setImage(context, img) {
			context.commit("setImage", img);
		},
		setUserTask(context, userTask) {
			context.commit("setUserTask", userTask);
		},
	},
	plugins: [createPersistedState()],
});
