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
		font-family: "Poppins", sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}

	/* Basic scrollbar styles */
	/* Track */
	::-webkit-scrollbar {
		width: 5px; /* Width of the scrollbar */
	}

	/* Thumb (the draggable part) */
	::-webkit-scrollbar-thumb {
		background: #888; /* Color of the thumb */
		border-radius: 5px; /* Rounded corners */
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: #d30808; /* Color when hovering over the thumb */
	}

	/* Track when scrollbar is in an inactive state (not being interacted with) */
	::-webkit-scrollbar-track {
		background: #f1f1f1; /* Track color */
		border-radius: 5px; /* Rounded corners */
	}

	/* Track on hover */
	::-webkit-scrollbar-track:hover {
		background: #ddd; /* Track color when hovering over it */
	}

	#headerText {
		text-transform: uppercase;
		user-select: none;
		color: white;
		width: 60%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	#homeContainer {
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	#logoContainer {
		display: flex;
		flex-direction: row;
		background-color: #333;
		padding: 1rem;
		flex-wrap: wrap;
		align-items: center;
	}
	#loginContainer {
		justify-content: center;

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
