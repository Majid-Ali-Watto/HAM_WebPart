<!-- @format -->

<template>
	<div class="hello">
		<div style="display: flex; justify-content: center; align-items: center; flex-wrap: wrap; width: 100%">
			<div id="searchSection" style="display: flex; justify-content: center; align-items: center; width: 100%">
				<label class="label">CNIC</label>
				<el-input
					type="text"
					v-model="regno"
					:maxlength="13"
					:minlength="13"
					class="input"
					required
					style="width: 30%"
					onkeypress="if ( isNaN( String.fromCharCode(event.keyCode) )) return false;"
				/>
				<el-button type="primary" @click="getUserData()">Search</el-button>
			</div>
		</div>
		<div v-if="showData" style="overflow-x: auto">
			<legend style="font-weight: bold">Details</legend>

			<table>
				<tr>
					<th style="background-color: green; color: black" scope="col" v-for="column in columnNames" v-bind:key="column.value">
						{{ column.toUpperCase() }}
					</th>
				</tr>

				<tr v-for="row in allData" v-bind:key="row.cnic">
					<td v-for="column in columnNames" v-bind:key="column">
						<div v-if="column == 'image'">
							<el-image
								:src="row[column]"
								lazy
								style="width: 50px; height: 50px"
								:zoom-rate="1.2"
								:preview-src-list="[row[column]]"
								:initial-index="4"
								fit="cover"
							/>
						</div>
						<div v-else>
							{{ row[column] }}
						</div>
					</td>
				</tr>
			</table>

			<el-button type="primary" class="input" @click="showData = false">Close</el-button>
		</div>
	</div>
	<div id="tables">
		<table class="table" v-if="info.length > 0">
			<tr>
				<th style="background-color: cyan; color: black" scope="col" v-for="column in columnNames" v-bind:key="column.value">
					{{ column.toUpperCase() }}
				</th>
			</tr>

			<tr v-for="row in info" v-bind:key="row.rollno">
				<td v-for="column in columnNames" v-bind:key="column">
					<div v-if="column == 'image'">
						<el-image
							:src="row[column]"
							lazy
							style="width: 50px; height: 50px"
							:zoom-rate="1.2"
							:preview-src-list="[row[column]]"
							:initial-index="4"
							fit="cover"
						/>
					</div>
					<div v-else>
						{{ row[column] }}
					</div>
				</td>
			</tr>
		</table>
		<h1 v-else>No Records here</h1>
	</div>
</template>

<script>
	import { ElMessageBox } from "element-plus";
	import axios from "axios";
	import VUE_APP_URL from "@/assets/url";
	export default {
		name: "ViewWardensData",
		mounted() {
			if (this.$store.getters.getLoginKey != "loggedIn") this.$router.push("/");

			this.getData(this.$store.getters.getUser);
		},
		computed: {
			columnNames: function () {
				const names = new Set();
				for (const row of this.info) {
					for (const key of Object.keys(row)) {
						if (key == "imgId") continue;
						names.add(key);
					}
				}
				return names;
			},
		},
		data() {
			return {
				info: [],
				showData: false,
				regno: "",
				allData: [],
			};
		},
		methods: {
			getUserEndpoint(user) {
				if (user == "View Security Warden") return "securitySupervosor";
				else if (user == "View Mess Warden") return "messSupervisor";
				else return "hostelSupervisor";
			},
			async getData(user) {
				let u = "";
				u = this.getUserEndpoint(user);
				await axios
					.get(`${VUE_APP_URL}/${u}`)
					.then((response) => {
						this.info = response.data;
					})
					.catch((error) => {
						ElMessageBox.alert(error.message, "Error", {
							autofocus: true,
							confirmButtonText: "OK",
						});
					});
			},

			async getUserData() {
				if (this.showData == true) return;
				let cnic = this.regno;
				let idCopy = cnic;
				cnic = Number(cnic);
				if (isNaN(cnic) || idCopy.toString().length < 13) {
					ElMessageBox.alert("Please enter valid cnic number", "Validate CNIC", {
						autofocus: true,
						confirmButtonText: "OK",
					});
					return;
				}
				let u = "";
				let user = this.$store.getters.getUser;
				u = this.getUserEndpoint(user);
				// this.showData = true;
				let id = this.regno;
				await axios
					.get(`${VUE_APP_URL}/${u}/${id}`)
					.then((response) => {
						if (response.data.length > 0) {
							this.showData = true;
							this.allData = response.data;
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
	}
	.input {
		margin: 0.5rem;
		padding: 0.5rem;
		font-weight: bold;
	}
	.label {
		margin: 1rem;
		font-weight: bold;
		font-size: 1rem;
	}
	textarea {
		width: 20rem;
		height: 15rem;
		font-weight: bold;
	}
	#tables {
		overflow-x: auto;
		width: 100%;
		height: 450px;
		margin: 0% auto !important;
	}
	table {
		border-collapse: collapse;
		background-color: white;
		margin: 0% auto !important;
	}

	th,
	td {
		padding: 1.5rem 2.5rem;
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
	@media screen and (max-width: 1100px) {
		.input {
			width: 40%;
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
