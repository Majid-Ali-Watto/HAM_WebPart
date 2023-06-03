<!-- @format -->

<template>
	<MainMenu :list="list"></MainMenu>
</template>

<script>
	import MainMenu from "./MainMenu.vue";
	export default {
		name: "MessSec",
		components: { MainMenu },
		data() {
			return {
				list: [
					{ option: "Add Mess Warden", img: require("../assets/add.png"), name: "GenericForm", route: "GenericForm" },
					{ option: "Remove Mess Warden", img: require("../assets/remove.png"), name: "GenericForm", route: "GenericForm" },
					{ option: "Update Mess Warden", img: require("../assets/update.png"), name: "GenericForm", route: "GenericForm" },
					{ option: "View Mess Warden", img: require("../assets/view.png"), name: "ViewWardensData", route: "ViewWardensData" },
				],
			};
		},
	};
</script>
