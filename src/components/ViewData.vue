<!-- @format -->

<template>
	<div
		class="hello"
		@copy.prevent
		@paste.prevent>
		<div>
			<div
				id="searchSection"
				style="display: flex; justify-content: center; align-items: center; width: 100%; gap: 0.5rem">
				<label class="label">{{ getLabel }}</label>
				<el-input
					show-word-limit
					type="text"
					v-model="state.regno"
					:maxlength="getLength"
					:minlength="getLength"
					class="input"
					required
					style="width: 30%"
					onkeypress="if ( isNaN( String.fromCharCode(event.keyCode) )) return false;" />
				<el-button
					type="primary"
					class="input"
					@click="getStudent()"
					>Search</el-button
				>
			</div>

			<div
				v-if="state.showData"
				style="overflow-x: auto"
				id="searchedTables">
				<legend style="font-weight: bold">Details</legend>

				<table class="table">
					<tr>
						<th
							style="background-color: green; color: black"
							scope="col"
							v-for="column in columnNames"
							v-bind:key="column.value"
							@copy.prevent>
							{{ column.toUpperCase() }}
						</th>
					</tr>

					<tr
						v-for="row in state.allData"
						v-bind:key="row.rollno">
						<td
							v-for="column in columnNames"
							v-bind:key="column">
							<div v-if="column == 'image'">
								<el-image
									:src="row[column]"
									lazy
									style="width: 60px; height: 60px"
									:zoom-rate="1.2"
									:preview-src-list="[row[column]]"
									:initial-index="4"
									fit="cover" />
							</div>
							<div
								v-else
								@copy.prevent>
								{{ row[column] }}
							</div>
						</td>
					</tr>
				</table>

				<el-button
					type="primary"
					class="input"
					@click="state.showData = false"
					@copy.prevent
					>Close</el-button
				>
			</div>
		</div>

		<div
			id="tables"
			@copy.prevent>
			<table
				class="table"
				v-if="state.info.length > 0">
				<tr v-if="columnNames">
					<th
						style="background-color: cyan; color: black"
						scope="col"
						v-for="column in columnNames"
						v-bind:key="column.value">
						{{ column == "status" ? "Fee Status".toUpperCase() : column.toUpperCase() }}
					</th>
				</tr>

				<tr
					v-for="row in state.info"
					v-bind:key="row.rollno"
					@dblclick="showRow(row)">
					<td
						v-for="column in columnNames"
						v-bind:key="column"
						@copy.prevent>
						<div v-if="column == 'image'">
							<el-image
								:src="row[column]"
								lazy
								style="width: 60px; height: 60px"
								:zoom-rate="1.2"
								:preview-src-list="[row[column]]"
								:initial-index="4"
								fit="cover" />
						</div>
						<div v-else>
							<div v-if="column == 'status'">
								{{ row[column] == false ? "Pending" : "Paid" }}
							</div>
							<div v-else>
								{{ row[column] }}
							</div>
						</div>
					</td>
				</tr>
			</table>
			<h1 v-else>No Records here</h1>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	import { ElMessageBox } from "element-plus";
	import VUE_APP_URL from "@/assets/url";
	import { reactive } from 'vue';
	export default {
		name: "ViewData",
		mounted() {
			if (this.$store.getters.getLoginKey != "loggedIn") this.$router.push("/");
			this.getData(this.$store.getters.getUser);
		},
		setup() {
			const state = reactive({
				info: [],
				showData: false,
				regno: "",
				allData: [],
			});
			return {
				state,
			};
		},
		computed: {
			columnNames: function () {
				const names = new Set();
				for (const row of this.state.info) {
					for (let key of Object.keys(row)) {
						if (key == "did" || key == "imgId") continue;
						names.add(key);
					}
				}
				return names;
			},
			getLength: function () {
				if (this.$store.getters.getUser != "View Students") return 13;
				else return 11;
			},
			getLabel: function () {
				if (this.$store.getters.getUser != "View Students") return "CNIC";
				else return "RegNo";
			},
		},
	
		// data() {
		// 	return {
		// 		info: [],
		// 		showData: false,
		// 		regno: "",
		// 		allData: [],
		// 	};
		// },
		methods: {
			showRow(row) {
				let data = "";
				if (this.$store.getters.getUser == "View Students") data = "Name : " + row.sname + " <br> RegNo : " + row.rollno + "  <br> CNIC : " + row.cnic;
				else data = "Name : " + row.name + "  <br> CNIC : " + row.cnic;
				ElMessageBox.alert(data, "Details", {
					autofocus: true,
					confirmButtonText: "OK",
					type: "info",
					dangerouslyUseHTMLString: true,
				});
			},
			getUserEndpoint(user) {
				if (user == "View Security Warden") return "securitySupervosor";
				else if (user == "View Mess Warden") return "messSupervisor";
				else if (user == "View Students") return "students";
				else return "hostelSupervisor";
			},
			async getData(user) {
				let u = "";
				u = this.getUserEndpoint(user);
				await axios
					.get(`${VUE_APP_URL}/${u}`)
					.then((response) => {
						if (typeof response.data != "string") this.state.info = response.data;
					})
					.catch((error) => {
						ElMessageBox.alert(error.message, "Error", {
							autofocus: true,
							confirmButtonText: "OK",
						});
					});
			},

			async getStudent() {
				if (this.state.showData == true) return;
				let u = "";
				u = this.getUserEndpoint(this.$store.getters.getUser);
				let id = this.state.regno;
				let idCopy = id;
				if (!Number(id) || idCopy.toString().length < this.getLength) {
					ElMessageBox.alert("Please enter valid registration number", `Validate ${this.getLabel}`, {
						autofocus: true,
						confirmButtonText: "OK",
					});
					return;
				}
				await axios
					.get(`${VUE_APP_URL}/${u}/${id}`)
					.then((response) => {
						if (response.data.length > 0) {
							this.state.showData = true;
							this.state.allData = response.data;
						} else {
							ElMessageBox.alert("No Record Found", "Message", {
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
		},
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.hello {
		justify-content: center;
		align-items: center;
		margin: 0 auto !important;
		user-select: none !important;
	}
	.input {
		margin: 1rem;
		font-weight: bold;
		font-size: 1rem;
	}
	.label {
		margin: 1rem;
		font-weight: bold;
		font-size: 1rem;
	}
	#tables {
		overflow-x: auto;
		width: 98%;
		/* height: 450px; */
		margin: 0% 10px !important;
	}
	#searchedTables {
		overflow-x: auto;
		width: 98%;
		margin: 0% 10px !important;
	}
	table {
		width: 98%;
		border-collapse: collapse;
		background-color: white;
		margin: 0% 10px !important;
	}

	th,
	td {
		padding: 1rem 1.5rem;
		text-align: left;
		border-bottom: 1px solid #ddd;
		width: fit-content;
	}

	tr:hover {
		background-color: #d6eeee;
	}
	@media screen and (max-width: 1220px) {
		#tables {
			overflow-x: auto;
		}
		.table {
			overflow-x: auto;
			table-layout: fixed;
		}
	}
	@media screen and (max-width: 400px) {
		#searchSection {
			flex-wrap: wrap;
		}
		.input {
			margin: 5px;
			width: 50%;
		}
		.label {
			margin: 5px;
			font-weight: bold;
			font-size: 1rem;
		}
	}
</style>
