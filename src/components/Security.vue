<!-- @format -->

<template>
	<MainMenu :list="list"></MainMenu>
</template>

<script>
	import MainMenu from "./MainMenu.vue";
	export default {
		name: "SecuritySec",
		components: { MainMenu },
		mounted() {
			if (this.$store.getters.getLoginKey != "loggedIn") this.$router.push("/");
		},
		data() {
			return {
				list: [
					{ option: "Add Security Warden", img: require("../assets/add.png"), name: "GenericForm", route: "GenericForm" },
					{ option: "Remove Security Warden", img: require("../assets/remove.png"), name: "GenericForm", route: "GenericForm" },
					{ option: "Update Security Warden", img: require("../assets/update.png"), name: "GenericForm", route: "GenericForm" },
					{ option: "View Security Warden", img: require("../assets/view.png"), name: "ViewData", route: "ViewData" },
				],
			};
		},
	};
</script>
