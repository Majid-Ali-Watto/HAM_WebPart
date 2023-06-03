<!-- @format -->

<template>
	<div class="hello">
		<div>
			<div style="display: flex; justify-content: space-around; align-items: center">
				<label class="input">Reg No</label>
				<el-input
					type="text"
					v-model="regno"
					:maxlength="11"
					:minlength="11"
					class="input"
					required
					style="width: 60%"
					onkeypress="if ( isNaN( String.fromCharCode(event.keyCode) )) return false;"
				/>
				<el-button type="primary" class="input" @click="getStudent()">Search</el-button>
			</div>

			<div v-if="showData" style="overflow-x: auto">
				<legend style="font-weight: bold">Details</legend>

				<table>
					<tr>
						<th style="background-color: green; color: black" scope="col" v-for="column in columnNames" v-bind:key="column.value">
							{{ column.toUpperCase() }}
						</th>
					</tr>

					<tr v-for="row in allData" v-bind:key="row.rollno">
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
		<div id="tables">
			<table class="table">
				<tr>
					<th style="background-color: cyan; color: black" scope="col" v-for="column in columnNames" v-bind:key="column.value">
						{{ column.toUpperCase() }}
					</th>
				</tr>

				<tr v-for="row in info" v-bind:key="row.rollno" @click="showRow(row)">
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
	</div>
</template>

<script>
	import axios from "axios";
	import { ElMessageBox } from "element-plus";
	import VUE_APP_URL from "@/assets/url";
	export default {
		name: "ViewData",
		mounted() {
			this.getData();
		},
		computed: {
			columnNames: function () {
				const names = new Set();
				for (const row of this.info) {
					for (const key of Object.keys(row)) {
						console.log(key);
						if (key == "did") continue;
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
			showRow(row) {
				console.log(row);
			},
			async getData() {
				await axios
					.get(`${VUE_APP_URL}/students`)
					.then((response) => {
						this.info = response.data;
					})
					.catch((error) => {
						alert(error.message);
					});
			},

			async getStudent() {
				let id = this.regno;
				if (id.length < 11) {
					ElMessageBox.alert("Please enter valid registration number", "Validate RegNo", {
						autofocus: true,
						confirmButtonText: "OK",
					});
					return;
				}
				await axios
					.get(`${VUE_APP_URL}/students/${id}`)
					.then((response) => {
						this.showData = true;
						this.allData = response.data;
						console.log(response.data);
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
		/* padding: 0.5rem; */
		font-weight: bold;
	}
	#tables {
		overflow-x: auto;
		width: 100%;
		height: 450px;
	}
	table {
		border-collapse: collapse;
		background-color: white;
	}

	th,
	td {
		padding: 10px;
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
</style>
