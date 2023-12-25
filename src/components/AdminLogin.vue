<!-- @format -->

<template>
	<div class="container">
		<fieldset>
			<legend>Admin credientials</legend>
			<el-form @submit.prevent="login" class="form">
				<el-row class="row">
					<el-col :lg="8" :md="8" :sm="8">
						<label for="username">Username</label>
					</el-col>
					<el-col :lg="16" :md="16" :sm="16">
						<el-input
							v-model="username"
							show-word-limit
							type="text"
							:maxlength="15"
							:minlength="5"
							class="input"
							required
							input-style="padding:14px 20px;margin: 8px 0;width:100%;" />
					</el-col>
				</el-row>
				<el-row class="row">
					<el-col :lg="8" :md="8" :sm="8">
						<label for="password">Password</label>
					</el-col>
					<el-col :lg="16" :md="16" :sm="16">
						<el-input
							show-word-limit
							type="password"
							v-model="password"
							:maxlength="15"
							:minlength="5"
							class="input"
							required
							input-style="padding:14px 20px;margin: 8px 0;width:100%;"
							show-password
					/></el-col>
				</el-row>
				<el-row class="row">
					<el-col :lg="24" :md="24" :sm="24">
						<button type="submit" id="button">Login</button>
					</el-col>
				</el-row>
			</el-form>
		</fieldset>
	</div>
</template>

<script>
	import axios from "axios";
	import { ElMessageBox } from "element-plus";
	import { ref } from "vue";
	import { useStore } from "vuex";
	import { useRouter } from "vue-router";

	export default {
		name: "AdminLogin",

		setup() {
			const store = useStore();
			const router = useRouter();
			const username = ref(null);
			const password = ref(null);

			async function login() {
				await axios
					.get("http://localhost:3000/admin")
					.then((response) => {
						if (username.value == response.data[0] && password.value == response.data[1]) {
							store.dispatch("setUser", "Admin");
							store.dispatch("setLoginKey", "loggedIn");
							router.push("/MainMenu");
						} else {
							ElMessageBox.alert("Invalid Credientials", "Error", {
								autofocus: true,
								confirmButtonText: "OK",
							}).then(() => {
								username.value = null;
								password.value = null;
							});
						}
					})
					.catch((error) => {
						ElMessageBox.alert(error.message, "Error", {
							autofocus: true,
							confirmButtonText: "OK",
						});
					});
			}
			return {
				username,
				password,
				login,
			};
		},
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 1%;
		box-sizing: border-box;
		padding: 0%;
		display: flex;
		margin: 0 auto !important;
	}
	label {
		font-size: x-large;
		color: white;
	}
	legend {
		font-weight: bold;
		font-size: 1.5rem;
		background: rgba(255, 255, 255, 0.25);
		padding: 1rem;
	}
	.form {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		background-color: #333;
	}
	.row {
		display: flex;
		align-items: center;
	}
	#button {
		background-color: #00b4d8;
		color: white;
		font-weight: bold;
		font-size: 1.5rem;
		padding: 14px 20px;
		margin: 8px 0;
		border: none;
		cursor: pointer;
		width: 94%;
	}

	button:hover {
		opacity: 0.8;
	}
	fieldset {
		background: rgba(255, 255, 255, 0.25);
		box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.18);
	}

	fieldset:hover,
	fieldset:focus {
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
	}
</style>
