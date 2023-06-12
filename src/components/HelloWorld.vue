<!-- @format -->

<template>
	<div class="hello">
		<fieldset>
			<legend style="font-weight: bold; font-size: 1.5rem; background: rgba(255, 255, 255, 0.25); padding: 1rem">Admin credientials</legend>
			<el-form @submit.prevent="disp" style="padding: 1rem; display: flex; flex-direction: column">
				<div style="display: flex; align-items: center">
					<label for="username">Username</label>
					<el-input
						type="text"
						v-model="username"
						:maxlength="15"
						:minlength="5"
						class="input"
						required
						input-style="padding:14px 20px;margin: 8px 0;width:100%;"
					/>
				</div>
				<div style="display: flex; align-items: center">
					<label for="password">Password</label>
					<el-input
						type="password"
						v-model="password"
						:maxlength="15"
						:minlength="5"
						class="input"
						required
						input-style="padding:14px 20px;margin: 8px 0;width:100%;"
						show-password
					/>
				</div>
				<button type="submit" id="button">Login</button>
			</el-form>
		</fieldset>
	</div>
</template>

<script>
	import axios from "axios";
	import { ElMessageBox } from "element-plus";
	export default {
		name: "HelloWorld",
		props: {
			msg: String,
		},
		data() {
			return {
				username: "",
				password: "",
			};
		},
		methods: {
			async disp() {
				await axios
					.get("http://localhost:3000/admin")
					.then((response) => {
						console.log(response);
						if (this.username == response.data[0] && this.password == response.data[1]) {
							this.$store.dispatch("setUser", "Admin");
							this.$store.dispatch("setLoginKey", "loggedIn");
							this.$router.push("/MainMenu");
						} else {
							ElMessageBox.alert("Invalid Credientials", "Error", {
								autofocus: true,
								confirmButtonText: "OK",
							});
						}
					})
					.catch((error) => {
						ElMessageBox.alert(error.message, "Error", {
							autofocus: true,
							confirmButtonText: "OK",
						});
					});
			},
			// setShow() {
			// 	console.log("show");
			// 	this.show = !this.show;
			// 	console.log(this.show);
			// },
		},
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.hello {
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
	/* .showHide {
		margin: 1rem;
		padding: 14px 20px;
		border: none;
	} */
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
