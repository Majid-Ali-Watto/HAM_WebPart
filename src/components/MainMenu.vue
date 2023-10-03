<!-- @format -->

<template>
	<div class="hello">
		<div id="card" v-for="l in list" :key="l" @click="moveTo(l.name, l.option)">
			<img :src="l.img" alt="Image" id="img" />
			<button id="button">{{ l.option }}</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: "MainMenu",
		props: ["list"],
		mounted() {
			if (this.$store.getters.getLoginKey != "loggedIn") this.$router.push("/");
		},
		methods: {
			moveTo(url, user) {
				this.$store.dispatch("setUser", user);
				console.log("user : ", this.$store.getters.getUser);
				this.$router.push({ name: url });
			},
		},
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.hello {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-content: center;
		align-items: center;
		flex-wrap: wrap;
		margin: 0 auto !important;

		/* align-items: center; */
	}

	#button {
		/* background-color: white; */
		background-color: #555555;
		width: 17rem;
		height: 5rem;
		font-weight: bold;
		font-size: 1.5rem;
		color: white;
		/* padding: 0.5rem; */
		/* margin-bottom: 0.5rem; */
		border: none;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		/* margin: 1rem; */
		text-transform: uppercase;
		cursor: pointer;
		user-select: none;
		margin-top: auto;
	}
	#card {
		padding: 80px 0px 0px 0px;
		background-color: white;
		/* background-color: #555555; */
		width: 17rem;
		height: 16rem;
		font-weight: bold;
		font-size: 1.5rem;
		/* padding: 0.5rem; */
		/* border: 1px solid white; */
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		margin: 1rem;
		box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
		cursor: pointer;
		gap: 20px;
	}
	#img {
		width: 100px;
		/* height: 25rem; */
		background-repeat: no-repeat;
		padding: 5px;
		user-select: none;
		-webkit-user-drag: none;
	}
	#card:hover {
		background-color: orangered;
		color: white;
		box-shadow: rgb(255, 255, 255, 0.2) 0px 7px 29px 0px;
		transform: scale(1.1);
		transition: all 0.3s ease-in;
		margin-top: 1.1rem;
		outline: 1px solid skyblue;
	}
</style>
