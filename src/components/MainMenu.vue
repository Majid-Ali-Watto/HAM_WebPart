<!-- @format -->

<template>
	<div class="hello">
		<div id="card" v-for="l in list" :key="l" @click="moveTo(l.name, l.option)">
			<button id="button">{{ l.option }}</button>
			<img :src="l.img" alt="Image" id="img" />
		</div>
	</div>
</template>

<script>
	export default {
		name: "MainMenu",
		props: ["list"],

		methods: {
			moveTo(url, user) {
				this.$store.dispatch("setUser", user);
				console.log(this.$store.getters.getUser);
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
		flex-wrap: wrap;
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
	}
	#card {
		background-color: white;
		/* background-color: #555555; */
		width: 17rem;
		height: 30rem;
		font-weight: bold;
		font-size: 1.5rem;
		/* padding: 0.5rem; */
		/* border: 1px solid white; */
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 1rem;
		box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
		cursor: pointer;
	}
	#img {
		width: 17rem;
		height: 25rem;
		background-repeat: no-repeat;
		padding: 5px;
	}
</style>
