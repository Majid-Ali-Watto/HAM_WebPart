<!-- @format -->

<template>
	<MainMenu :list="list"></MainMenu>
</template>

<script>
	import MainMenu from "./MainMenu.vue";
	export default {
		name: "StudentSec",
		components: { MainMenu },
		data() {
			return {
				list: [
					{ option: "Add Student", img: require("../assets/add.png"), name: "GenericForm", route: "GenericForm" },
					{ option: "Remove Student", img: require("../assets/remove.png"), route: "GenericForm", name: "GenericForm" },
					{ option: "Update Student", img: require("../assets/update.png"), route: "GenericForm", name: "GenericForm" },
					{ option: "View Students", img: require("../assets/view.png"), route: "ViewData", name: "ViewData" },
				],
			};
		},
	};
</script>
