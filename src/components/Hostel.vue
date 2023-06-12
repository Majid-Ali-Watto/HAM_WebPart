<!-- @format -->

<template>
	<MainMenu :list="list"></MainMenu>
</template>

<script>
	import MainMenu from "./MainMenu.vue";
	export default {
		name: "HostelSec",
		components: { MainMenu },
		mounted() {
			if (this.$store.getters.getLoginKey != "loggedIn") this.$router.push("/");
		},
		data() {
			return {
				list: [
					{ option: "Add Hostel Warden", img: require("../assets/add.png"), name: "GenericForm", route: "GenericForm" },
					{ option: "Remove Hostel Warden", img: require("../assets/remove.png"), name: "GenericForm", route: "GenericForm" },
					{ option: "Update Hostel Warden", img: require("../assets/update.png"), name: "GenericForm", route: "GenericForm" },
					{ option: "View Hostel Wardens", img: require("../assets/view.png"), name: "ViewWardensData", route: "ViewWardensData" },
				],
			};
		},
	};
</script>
