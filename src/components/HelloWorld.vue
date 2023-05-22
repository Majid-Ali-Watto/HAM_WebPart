<template>
	<div class="hello">
		<fieldset>
			<legend style="font-weight: bold; font-size: 1.5rem; background: rgba(255, 255, 255, 0.25); padding: 1rem">Admin credientials</legend>
			<form
				@submit.prevent="disp"
				style="display: flex; flex-direction: column; align-items: stretch; padding: 1rem">
				<input
					type="text"
					v-model="username"
					maxlength="15"
					minlength="5"
					placeholder="Enter Username"
					class="input"
					required />
				<div style="flex-direction: row">
					<input
						type="password"
						v-model="password"
						maxlength="15"
						minlength="5"
						placeholder="Enter Password"
						class="input"
						required
						v-if="!show" />
					<input
						type="text"
						v-model="password"
						maxlength="15"
						minlength="5"
						placeholder="Enter Password"
						class="input"
						required
						v-else />
					<button
						type="button"
						class="showHide"
						@click="setShow()"
						v-if="!show">
						Show
					</button>
					<button
						type="button"
						class="showHide"
						@click="setShow()"
						v-else>
						Hide
					</button>
				</div>
				<div>
					<button
						type="submit"
						id="button">
						Login
					</button>
				</div>
			</form>
		</fieldset>
	</div>
</template>

<script>
	// import axios from "axios";
	import { ref } from "vue";
	export default {
		name: "HelloWorld",
		props: {
			msg: String,
		},
		setup() {
			let show = ref(false);

			// expose to template and other options API hooks
			return {
				show,
			};
		},
		methods: {
			async disp() {
				// await axios
				//   .get("http://localhost:3000/admin")
				//   .then((response) => {
				//     if (
				//       this.username == response.data[0].username &&
				//       this.password == response.data[0].password
				//     ) {
				this.$store.dispatch("setUser", "Admin");
				this.$router.push("/MainMenu");
				//   } else alert("invalid credientials");
				// })
				// .catch((error) => {
				//   alert(error.message);
				// });
			},
			setShow() {
				console.log("show");
				this.show = !this.show;
				console.log(this.show);
			},
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
	}

	input[type="text"],
	input[type="password"] {
		width: 20rem;
		padding: 12px 20px;
		margin: 8px 0;
		display: inline-block;
		border: 1px solid #ccc;
		box-sizing: border-box;
		background-color: white;
	}
	input:focus {
		border-color: lawngreen;
		outline-color: lightgreen;
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
		width: 100%;
	}
	.showHide {
		margin: 1rem;
		padding: 14px 20px;
		border: none;
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
