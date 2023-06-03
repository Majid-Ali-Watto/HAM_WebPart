<!-- @format -->

<template>
	<div class="hello">
		<fieldset>
			<div style="display: flex; justify-content: space-around">
				<label class="input">CNIC</label>
				<input
					type="text"
					v-model="regno"
					maxlength="13"
					minlength="13"
					class="input"
					required
					onkeypress="if ( isNaN( String.fromCharCode(event.keyCode) )) return false;"
				/>
				<button class="input" @click="getUserData()">Search</button>
			</div>
		</fieldset>
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
							<!-- <img
                  v-bind:src="row[column]"
                  style="width: 50px; height: 50px"
                /> -->
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

			<!-- <button @click="showData = false">Close</button> -->
			<el-button type="primary" class="input" @click="showData = false">Close</el-button>
		</div>
	</div>
	<!-- <div style="overflow-x: auto"> -->
	<div id="tables">
		<table class="table">
			<tr>
				<th style="background-color: cyan; color: black" scope="col" v-for="column in columnNames" v-bind:key="column.value">
					{{ column.toUpperCase() }}
				</th>
			</tr>

			<tr v-for="row in info" v-bind:key="row.rollno">
				<td v-for="column in columnNames" v-bind:key="column">
					<div v-if="column == 'image'">
						<!-- <img v-bind:src="row[column]" style="width: 50px; height: 50px" />
               -->
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
	</div>
</template>

<script>
	import axios from "axios";
	import VUE_APP_URL from "@/assets/url";
	export default {
		name: "ViewWardensData",
		mounted() {
			this.getData(this.$store.getters.getUser);
		},
		computed: {
			columnNames: function () {
				const names = new Set();
				for (const row of this.info) {
					for (const key of Object.keys(row)) {
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
						alert(error.message);
					});
			},

			async getUserData() {
				let u = "";
				let user = this.$store.getters.getUser;
				u = this.getUserEndpoint(user);

				this.showData = true;
				let id = this.regno;
				//let sdata=''
				await axios
					.get(`${VUE_APP_URL}/${u}/${id}`)
					.then((response) => {
						this.allData = response.data;
					})
					.catch((error) => {
						alert(error.message);
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
	}
	.input {
		margin: 1rem;
		padding: 0.5rem;
		font-weight: bold;
	}
	textarea {
		width: 20rem;
		height: 15rem;
		font-weight: bold;
	}
	table {
		/* border-collapse: collapse; */
		border-spacing: 0;
		width: 100%;
		border: 1px solid rgb(28, 27, 27);
		background-color: "white";
	}

	th,
	td {
		text-align: left;
		padding: 8px;
		border: 1px solid rgb(157, 153, 153);
	}

	tr:nth-child(odd) {
		background-color: rgb(246, 236, 236);
	}
	tr:nth-child(even) {
		background-color: #f2f2f2;
	}
</style>
