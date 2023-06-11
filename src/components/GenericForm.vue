<!-- @format -->

<template>
	<div class="hello" @copy.prevent @paste.prevent>
		<legend style="font-weight: bold; font-size: 1.5rem">{{ user }} Data</legend>
		<hr />
		<div v-if="search" id="searchSection" style="display: flex; justify-content: center; align-items: center; width: 100%; gap: 0.5rem">
			<label for="regno" class="searchLabel">{{ labelRegCNIC }}</label>
			<el-input
				type="text"
				v-model="regnoSearch"
				:maxlength="len"
				:minlength="len"
				class="input"
				required
				style="width: 30%"
				onkeypress="if ( isNaN( String.fromCharCode(event.keyCode) )) return false;"
			/>
			<el-button type="primary" class="input" @click="searchUsr">Search</el-button>
		</div>

		<div style="border-color: black; margin: 0.5rem auto" id="formSection">
			<div id="intdiv">
				<form
					@submit.prevent="submit"
					style="padding: 0%; margin: 0%; box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5); transform: translateY(5px)"
				>
					<div class="row" v-if="nameVisible">
						<label for="name" class="label">Name</label>
						<el-input
							type="text"
							id="name"
							:maxlength="255"
							:minlength="3"
							class="inputbox"
							name="name"
							v-model="name"
							required
							pattern="[A-Za-z.\- ]+"
						/>
					</div>

					<div class="row" v-if="regnoVisible">
						<label for="regno" class="label">Reg No</label>
						<el-input
							type="text"
							id="regno"
							:maxlength="11"
							:minlength="11"
							class="inputbox"
							name="regno"
							v-model="regno"
							required
							onkeypress="if ( isNaN( String.fromCharCode(event.keyCode) )) return false;"
						/>
					</div>
					<div class="row" v-if="cnicVisible">
						<label for="cnic" class="label">CNIC</label>
						<el-input
							placeholder="Without Dashes(-) or Spacing"
							type="text"
							id="cnic"
							:maxlength="13"
							:minlength="13"
							class="inputbox"
							name="cnic"
							v-model="cnic"
							required
							onkeypress="if ( isNaN( String.fromCharCode(event.keyCode) )) return false;"
						/>
					</div>
					<div class="row" v-if="deptVisible">
						<label for="dept" class="label">Department</label>
						<el-select v-model="deptName" filterable effect="dark" placeholder="Select" style="width: 100%" size="large">
							<el-option required v-for="item in depts" :key="item.value" :label="item.label" :value="item.value" />
						</el-select>
					</div>
					<div class="row" v-if="semsVisible">
						<label for="semester" class="label">Semester</label>
						<el-select required v-model="sems" filterable effect="dark" placeholder="Select" style="width: 100%" size="large">
							<el-option required v-for="item in semesters" :key="item.value" :label="item.label" :value="item.value" />
						</el-select>
					</div>

					<div class="row" v-if="progVisible">
						<label for="program" class="label">Program</label>
						<el-select required v-model="program" filterable effect="dark" placeholder="Select" style="width: 100%" size="large">
							<el-option required v-for="(item, index) in programs" :key="index" :label="item.label" :value="item.value" />
						</el-select>
					</div>

					<div class="row" v-if="ageVisible">
						<label for="age" class="label">Age</label>
						<el-input
							type="number"
							id="age"
							:maxlength="2"
							:minlength="2"
							:min="18"
							:max="60"
							class="inputbox"
							name="age"
							v-model="age"
							required
							onkeypress="if ( isNaN( String.fromCharCode(event.keyCode) )) return false;"
						/>
					</div>
					<div class="row" v-if="genderVisible">
						<label for="gender" class="label">Gender</label>
						<el-select required v-model="gender" filterable effect="dark" placeholder="Select" style="width: 100%" size="large">
							<el-option required v-for="item in genders" :key="item.value" :label="item.label" :value="item.value" />
						</el-select>
					</div>

					<div class="row" v-if="hfeeVisible">
						<label for="hostfee" class="label">Hostel Fee </label>
						<el-input
							type="number"
							id="hostfee"
							:min="0"
							:max="1000000"
							class="inputbox"
							name="hostfee"
							v-model="hostfee"
							required
							onkeypress="if ( isNaN(this.value + String.fromCharCode(event.keyCode) )) return false;"
						/>
					</div>
					<!-- <br /> -->
					<div class="row" v-if="addVisible || updatevisible">
						<label for="image" class="label">Upload Image</label>

						<input type="file" accept="image/*" @change="encodeImageFileAsURL($event)" required />
					</div>
					<div class="row" v-if="removeVisible || updatevisible" style="display: flex; justify-content: center">
						<div class="demo-image__preview">
							<el-image
								:src="image"
								lazy
								style="width: 100px; height: 100px"
								:zoom-rate="1.2"
								:preview-src-list="srcList"
								:initial-index="4"
								fit="cover"
							/>
						</div>
					</div>
					<div class="row" v-if="addVisible" style="display: flex; justify-content: center">
						<div class="demo-image__preview">
							<img src="#" style="width: 100px; height: 100px" id="addImg" alt="Image here" />
						</div>
					</div>

					<button type="submit" class="buttons" v-if="addVisible">ADD</button>
					<button type="submit" class="buttons" v-if="removeVisible">REMOVE</button>
					<button type="submit" class="buttons" v-if="updatevisible">UPDATE</button>
				</form>
			</div>
		</div>
		<!-- </div> -->
	</div>
</template>

<script>
	import axios from "axios";
	import depts from "../assets/Departments/dept";
	import semesters from "../assets/Semesters/semester";
	import programs from "@/assets/Programs/programs";
	import { ElMessageBox } from "element-plus";
	import { getBase64EncodedRegNo } from "@/QR/qrCreater";
	import VUE_APP_URL from "@/assets/url";
	let image = "";
	function printIMG(img) {
		image = img;
	}
	async function apiCall(method, endpoint, payload) {
		try {
			const response = await axios[method](endpoint, payload);
			return response.data;
		} catch (error) {
			ElMessageBox.alert(error.message.toString(), "Error", {
				autofocus: true,
				confirmButtonText: "OK",
				type: "error",
			});
		}
	}
	async function showMessage(msg, event) {
		if (!msg) return;
		ElMessageBox.alert(msg, "Message", {
			autofocus: true,
			confirmButtonText: "OK",
		}).then(function () {
			event.go(-1);
		});
	}

	export default {
		name: "GenericForm",

		data() {
			return {
				len: 13,
				searchUser: "",
				regnoSearch: "",
				user: "",
				button: "",
				labelRegCNIC: "",
				name: "",
				age: "",
				regno: "",
				cnic: "",
				gender: "",
				deptName: "",
				hostfee: "",
				program: "",
				sems: "",
				depts: [],
				semesters: [],
				programs: [],
				addVisible: false,
				removeVisible: false,
				updatevisible: false,
				errorVisible: true,
				nameVisible: true,
				regnoVisible: true,
				cnicVisible: true,
				hfeeVisible: true,
				semsVisible: true,
				deptVisible: true,
				ageVisible: true,
				genderVisible: true,
				progVisible: true,
				search: true,
				image: image,
				addImage: "",
				srcList: [],
				genders: [
					{ value: "Male", option: "Male" },
					{ value: "Female", option: "Female" },
					{ value: "Others", option: "Others" },
				],
			};
		},
		mounted() {
			this.user = this.$store.getters.getUser;
			console.log(this.user);
			this.depts = depts;
			this.semesters = semesters;
			this.programs = programs;
			this.button = this.user; //this.user.split(" ")[0];
			if (this.button == "Add Student") {
				this.showAdd();
			} else if (this.button == "Remove Student") {
				this.setRegandLen();
				this.showRemove();
				this.searchUser = "students";
			} else if (this.button == "Update Student") {
				this.setRegandLen();
				this.showUpdate();
				this.searchUser = "students";
			} else if (this.button == "Add Hostel Warden") {
				this.showAdd();
				this.hide();
			} else if (this.button == "Remove Hostel Warden") {
				this.setCNICandLen();
				this.showRemove();
				this.hide();
				this.searchUser = "hostelSupervisor";
			} else if (this.button == "Update Hostel Warden") {
				this.setCNICandLen();
				this.showUpdate();
				this.hide();
				this.searchUser = "hostelSupervisor";
			} else if (this.button == "Add Mess Warden") {
				this.showAdd();
				this.hide();
			} else if (this.button == "Remove Mess Warden") {
				this.setCNICandLen();
				this.showRemove();
				this.hide();
				this.searchUser = "messSupervisor";
			} else if (this.button == "Update Mess Warden") {
				this.setCNICandLen();
				this.showUpdate();
				this.hide();
				this.searchUser = "messSupervisor";
			} else if (this.button == "Add Security Warden") {
				this.showAdd();
				this.hide();
			} else if (this.button == "Remove Security Warden") {
				this.setCNICandLen();
				this.showRemove();
				this.hide();
				this.searchUser = "securitySupervosor";
			} else if (this.button == "Update Security Warden") {
				this.setCNICandLen();
				this.showUpdate();
				this.hide();
				this.searchUser = "securitySupervosor";
			}
		},
		methods: {
			// encodeImageFileAsURL(element) {
			// 	var file = element.target.files[0];
			// 	if (!file) return;

			// 	var reader = new FileReader();
			// 	reader.onloadend = function () {

			// 		printIMG(reader.result);
			// 		newFunction(reader, "flex");
			// 	};
			// 	reader.readAsDataURL(file);
			// },
			encodeImageFileAsURL(element) {
				var file = element.target.files[0];
				if (!file) return;

				var output = document.getElementById("addImg");
				output.src = URL.createObjectURL(file);
				output.onload = function () {
					URL.revokeObjectURL(output.src); // free memory
				};

				var reader = new FileReader();
				reader.onloadend = function () {
					var img = new Image();
					console.log(img);
					img.src = reader.result;
					this.image = img.src;
					// this.srcList.push(img.src);
					img.onload = function () {
						// create canvas element
						var canvas = document.createElement("canvas");

						// set canvas dimensions to resized image dimensions
						var MAX_WIDTH = 200;
						var MAX_HEIGHT = 200;
						var width = img.width;
						var height = img.height;

						if (width > height) {
							if (width > MAX_WIDTH) {
								height *= MAX_WIDTH / width;
								width = MAX_WIDTH;
							}
						} else {
							if (height > MAX_HEIGHT) {
								width *= MAX_HEIGHT / height;
								height = MAX_HEIGHT;
							}
						}

						canvas.width = width;
						canvas.height = height;

						// draw resized image on canvas
						var ctx = canvas.getContext("2d");
						// 0,0 is co ordinates to place image
						ctx.drawImage(img, 0, 0, width, height);

						// compress image as JPEG
						var compressedImage = canvas.toDataURL("image/jpeg", 0.5); // set JPEG quality to 50%
						printIMG(compressedImage);
						this.addImage = compressedImage;

						// pass compressed image data to function
						// newFunction(compressedImage);
					};
				};
				reader.readAsDataURL(file);
			},

			hide() {
				this.hfeeVisible = false;
				this.ageVisible = false;
				this.deptVisible = false;
				this.semsVisible = false;
				this.regnoVisible = false;
				this.genderVisible = false;
				this.progVisible = false;
			},
			showAdd() {
				this.search = false;
				this.addVisible = true;
				this.updatevisible = false;
				this.removeVisible = false;
			},
			showRemove() {
				this.addVisible = false;
				this.updatevisible = false;
				this.removeVisible = true;
			},
			showUpdate() {
				this.addVisible = false;
				this.updatevisible = true;
				this.removeVisible = false;
			},
			setRegandLen() {
				this.labelRegCNIC = "Reg No.";
				this.len = 11;
			},
			setCNICandLen() {
				this.labelRegCNIC = "CNIC";
				this.len = 13;
			},
			async searchUsr() {
				let id = this.regnoSearch;
				if (this.button.includes("Student") && id.length < 11) {
					ElMessageBox.alert("RegNo must be 11 digits", "Validate RegNo", {
						autofocus: true,
						confirmButtonText: "OK",
					});
					return;
				} else if (id.length < 11) {
					ElMessageBox.alert("CNIC must be 13 digits", "Validate CNIC", {
						autofocus: true,
						confirmButtonText: "OK",
					});
					return;
				}
				try {
					let response = await axios.get(`${VUE_APP_URL}/${this.searchUser}/${id}`);
					console.log(response.data[0]);
					this.setData(response.data[0]);
				} catch (error) {
					ElMessageBox.alert(error.message.toString(), "Error", {
						autofocus: true,
						confirmButtonText: "OK",
						type: "error",
					});
				}
			},
			setData(val) {
				console.log(val);
				if (val == undefined) {
					ElMessageBox.alert("No record found", "Message", {
						autofocus: true,
						confirmButtonText: "OK",
					});
					return;
				}
				this.name = val.sname ? val.sname : val.name;
				this.regno = val.rollno;
				this.cnic = val.cnic;
				this.gender = val.gender;
				this.deptName = val.dname;
				this.age = val.age;
				this.sems = val.semno;
				this.hostfee = val.hostelfee;
				this.program = val.program;
				this.image = val.image;
				this.srcList.push(val.image);
			},
			capatilize(str) {
				console.log("str ", str);
				if (str == undefined || str == null || str == "") return;
				let name = str.split(" ");
				console.log("name ", name);
				name = name.map((n) => {
					console.log(n);
					return n[0].toUpperCase() + n.substring(1).toLowerCase();
				});
				console.log(name);
				console.log(name.join(" "));
				return name.join(" ");
			},
			async submit() {
				function showError(error) {
					ElMessageBox.alert(`${error} Field Missing`, "All fields are required", {
						autofocus: true,
						confirmButtonText: "OK",
						type: "error",
					});
				}
				if (this.button.includes("Student")) {
					switch ("") {
						case this.deptName:
							showError("Department");
							return;

						case this.sems:
							showError("Semester");
							return;
						case this.program:
							showError("Program");
							return;
						case this.gender:
							showError("Gender");
							return;
					}
				}

				let n = this.capatilize(this.name.replace(/\s+/g, " ").trim());
				const payloadset = {
					name: n,
					rollno: this.regno,
					cnic: this.cnic,
					gender: this.gender,
					dept: this.deptName,
					age: this.age,
					semester: this.sems,
					hostfee: this.hostfee,
					rollN: this.regnoSearch,
					program: this.program,
					img: image,
				};
				console.log(payloadset);
				const choice = async () => {
					switch (this.button) {
						case "Add Student":
							{
								let qr = getBase64EncodedRegNo(this.regno);
								payloadset["qr"] = qr;
								let node = document.getElementById("imgAdd");
								if (node.parentNode) {
									node.parentNode.removeChild(node);
								}
								const imageUrl = await apiCall("post", `${VUE_APP_URL}/students/saveStud`, payloadset);
								const linkSource = `${imageUrl}`;
								const downloadLink = document.createElement("a");
								downloadLink.href = linkSource;
								downloadLink.download = this.regno;
								downloadLink.click();
							}
							break;
						case "Remove Student":
							{
								const msg = await apiCall("delete", `${VUE_APP_URL}/students/removeStud/${this.regnoSearch}`);
								showMessage(msg, this.$router);
							}
							break;
						case "Update Student":
							{
								const msg = await apiCall("patch", `${VUE_APP_URL}/students/updateStud`, payloadset);
								showMessage(msg, this.$router);
							}
							break;
						case "Add Hostel Warden":
							{
								const msg = await apiCall("post", `${VUE_APP_URL}/hostelSupervisor/saveHW`, payloadset);
								showMessage(msg, this.$router);
							}
							break;
						case "Remove Hostel Warden":
							{
								const msg = await apiCall("delete", `${VUE_APP_URL}/hostelSupervisor/removeHW/${this.regnoSearch}`);
								showMessage(msg, this.$router);
							}
							break;
						case "Update Hostel Warden":
							{
								const msg = await apiCall("patch", `${VUE_APP_URL}/hostelSupervisor/updateHW`, payloadset);
								showMessage(msg, this.$router);
							}
							break;
						case "Add Mess Warden":
							{
								const msg = await apiCall("post", `${VUE_APP_URL}/messSupervisor/saveMW`, payloadset);
								showMessage(msg, this.$router);
							}
							break;
						case "Remove Mess Warden":
							{
								const msg = await apiCall("delete", `${VUE_APP_URL}/messSupervisor/removeMW/${this.regnoSearch}`);
								showMessage(msg, this.$router);
							}
							break;
						case "Update Mess Warden":
							{
								const msg = await apiCall("patch", `${VUE_APP_URL}/messSupervisor/updateMW`, payloadset);
								showMessage(msg, this.$router);
							}
							break;
						case "Add Security Warden":
							{
								const msg = await apiCall("post", `${VUE_APP_URL}/securitySupervosor/saveSW`, payloadset);
								showMessage(msg, this.$router);
							}
							break;
						case "Remove Security Warden":
							{
								const msg = await apiCall("delete", `${VUE_APP_URL}/securitySupervosor/removeSW/${this.regnoSearch}`);
								showMessage(msg, this.$router);
							}
							break;
						case "Update Security Warden":
							{
								const msg = await apiCall("patch", `${VUE_APP_URL}/securitySupervosor/updateSW`, payloadset);
								showMessage(msg, this.$router);
							}
							break;
					}
				};
				choice(); //.then(() => this.$router.go(-1));
			},
		},
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.hello {
		justify-content: center;
		align-items: center;
		width: 60% !important;
		margin: 0 auto !important;
		user-select: none;
	}

	.row {
		display: flex;
		flex-direction: row;
		margin: 2px;
		padding: 3px;
		align-items: center;
	}
	.inputbox {
		font-size: 1rem;
	}
	.label {
		width: 25%;
		margin-left: 0px;
		margin-right: 10px;
		font-weight: bold;
		text-align: left;
	}
	searchLabel {
		margin: 1rem;
		font-weight: bold;
		font-size: 1rem;
	}
	select {
		width: 75%;
		display: inline-block;
		border: 1px solid rgb(43, 42, 44);
		border-radius: 4px;
	}

	.searchbox {
		width: 50%;
		padding: 12px 20px;
		margin: 8px 0;
		display: inline-block;
		border: 1px solid rgb(43, 42, 44);
		border-radius: 4px;
		box-sizing: border-box;
	}

	.buttons {
		width: auto !important;
		background-color: #2d10d0;
		color: white;
		padding: 14px 20px;
		margin: 8px 10px;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-weight: bolder;
		font-size: 1.5rem;
	}

	#search {
		width: 25%;
		background-color: #2d10d0;
		color: white;
		padding: 14px 20px;
		margin: 8px 0;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	input[type="submit"]:hover {
		background-color: #45a049;
	}

	#intdiv {
		border-radius: 5px;
		/* background-color: #f2f2f2; */
		padding: 10px;
		/* width: 100%;	 */
	}
	@media screen and (max-width: 880px) {
		#formSection {
			margin: 0.5rem 5px;
			widows: 100%;
		}

		#intdiv {
			border-radius: 5px;
			/* background-color: #f2f2f2; */
			padding: 10px;
			width: 100%;
		}
	}

	.demo-image__error .image-slot {
		font-size: 30px;
	}
	.demo-image__error .image-slot .el-icon {
		font-size: 30px;
	}
	.demo-image__error .el-image {
		width: 100%;
		height: 200px;
	}
</style>
