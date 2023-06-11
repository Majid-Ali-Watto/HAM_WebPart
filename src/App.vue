<!-- @format -->

<template>
	<div id="homeContainer">
		<div id="logoContainer">
			<img alt="QAU logo" src="./assets/logo.png" id="imgStyle" />
			<h1 id="headerText">Hostel Activity Monitor</h1>
		</div>
		<div id="loginContainer">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>

	export default {
		name: "App",
	};
</script>

<style>
	#app {
		font-family:'Poppins', sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}
	#headerText {
		text-transform: uppercase;
		user-select: none;
	}
	#homeContainer {
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	#logoContainer {
		display: flex;
		flex-direction: row;
		background-color: white;
		padding: 1rem;
		flex-wrap: wrap;
		align-items: center;
	}
	#loginContainer {
		justify-content: center;
		/* margin: 1rem; */
		width: 100%;
		height: 100%;
	}

	#imgStyle {
		width: 8rem;
		height: 6rem;
		margin-left: 5rem;
		margin-right: 3rem;
		user-select: none;
		-webkit-user-drag: none;
	}
	@media screen and (max-width: 1110px) {
		#homeContainer {
			width: 100%;
			height: max-content;
			flex-direction: column;
			justify-content: space-between;
		}
		#logoContainer {
			justify-content: center;
			align-items: center;
			/* margin: 1rem; */
			display: flex;
		}
		#loginContainer {
			justify-content: center;
			/* margin: 1rem; */
		}
		#imgStyle {
			width: 5rem;
			height: 5rem;
			user-select: none;
			-webkit-user-drag: none;

		}
	}
	@media screen and (max-width: 490px) {
		#logoContainer {
			justify-content: center;
			align-items: center;
			/* margin: 1rem; */
			display: flex;
			flex-direction: column;
		}
		#imgStyle {
			width: 10rem;
			height: 10rem;
			user-select: none;
			-webkit-user-drag: none;


		}
	}
</style>
