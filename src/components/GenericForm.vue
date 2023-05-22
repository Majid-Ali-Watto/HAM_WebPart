<!-- @format -->

<template>
	<div class="hello">
		<div class="row" v-if="search">
			<label for="regno" class="label">{{ labelRegCNIC }}</label>
			<input
				type="text"
				id="regno"
				:maxlength="len"
				:minlength="len"
				class="searchbox"
				name="regno"
				v-model="regnoSearch"
				required
				onkeypress="if ( isNaN( String.fromCharCode(event.keyCode) )) return false;"
			/>
			<button id="search" @click="search">Search</button>
		</div>
		<!-- </div> -->
		<fieldset style="border-color: black">
			<legend style="font-weight: bold; font-size: 1.5rem">{{ user }} Data</legend>
			<div id="intdiv">
				<form @submit.prevent="submit" style="padding: 0%; margin: 0%">
					<div class="row" v-if="nameVisible">
						<label for="name" class="label">Name</label>
						<el-input type="text" id="name" :maxlength="255" :minlength="3" class="inputbox" name="name" v-model="name" required />
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
						<el-select v-model="deptName" filterable placeholder="Select" style="width: 100%" size="large">
							<el-option v-for="item in depts" :key="item.value" :label="item.label" :value="item.value" />
						</el-select>
					</div>
					<div class="row" v-if="semsVisible">
						<label for="semester" class="label">Semester</label>
						<el-select v-model="sems" filterable placeholder="Select" style="width: 100%" size="large">
							<el-option v-for="item in semesters" :key="item.value" :label="item.label" :value="item.value" />
						</el-select>
					</div>

					<div class="row" v-if="progVisible">
						<label for="program" class="label">Program</label>
						<el-select v-model="program" filterable placeholder="Select" style="width: 100%" size="large">
							<el-option v-for="(item, index) in programs" :key="index" :label="item.label" :value="item.value" />
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
						<el-select v-model="gender" filterable placeholder="Select" style="width: 100%" size="large">
							<el-option v-for="item in genders" :key="item.value" :label="item.label" :value="item.value" />
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
					<div class="row" v-if="addVisible">
						<!-- <input type="file" @change="previewFiles" multiple> -->
						<label for="image" class="label">Upload Image</label>

						<input type="file" @change="encodeImageFileAsURL($event)" />
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

					<!-- <input type="file" name="" id="fileId" @change="imageUploaded()" /> -->
					<button type="submit" class="buttons" v-if="addVisible">ADD</button>
					<button type="submit" class="buttons" v-if="removeVisible">REMOVE</button>
					<button type="submit" class="buttons" v-if="updatevisible">UPDATE</button>
				</form>
			</div>
		</fieldset>
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
	let image = "";
	function printIMG(img) {
		image = img;
		console.log(image);
	}
	async function apiCall(method, endpoint, payload) {
		try {
			const response = await axios[method](endpoint, payload);
			return response.data;
		} catch (error) {
			showMessage(error);
		}
	}
	function showMessage(msg) {
		ElMessageBox.alert(msg, "Validate RegNo", {
			autofocus: true,
			confirmButtonText: "OK",
		});
	}
	function newFunction(reader, disp) {
		var proImage = new Image();
		proImage.style.display = disp;
		// proImage.src = reader.result;
		proImage.src = reader;
		proImage.id = "imgAdd";
		// proImage.style.width = "80%";
		// proImage.style.height = "80%";
		// proImage.style.border = "10px solid orange";
		// proImage.style.borderRadius = "10px";
		// proImage.style.justifyContent = "center";
		// proImage.style.alignItems = "center";
		console.log(proImage);
		document.body.appendChild(proImage);
	}

	export default {
		name: "GenericForm",

		data() {
			return {
				len: 13,
				searchUser: "",
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
				image: image,
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
			this.depts = depts;
			this.semesters = semesters;
			this.programs = programs;
			this.button = this.user; //this.user.split(" ")[0];
			if (this.button == "Add Student") {
				this.showAdd();
			} else if (this.button == "Remove Student") {
				this.setRegoandLen();
				this.showRemove();
				this.searchUser = "students";
				document.getElementById("regno").focus();
			} else if (this.button == "Update Student") {
				this.setRegoandLen();
				this.showUpdate();
				this.searchUser = "students";
				document.getElementById("regno").focus();
			} else if (this.button == "Add Hostel Warden") {
				this.showAdd();
				this.hide();
			} else if (this.button == "Remove Hostel Warden") {
				this.setCNICandLen();
				this.showRemove();
				this.hide();
				this.searchUser = "hostel";
			} else if (this.button == "Update Hostel Warden") {
				this.setCNICandLen();
				this.showUpdate();
				this.hide();
				this.searchUser = "hostel";
			} else if (this.button == "Add Mess Warden") {
				this.showAdd();
				this.hide();
			} else if (this.button == "Remove Mess Warden") {
				this.setCNICandLen();
				this.showRemove();
				this.hide();
				this.searchUser = "mess";
			} else if (this.button == "Update Mess Warden") {
				this.setCNICandLen();
				this.showUpdate();
				this.hide();
				this.searchUser = "mess";
			} else if (this.button == "Add Security Warden") {
				this.showAdd();
				this.hide();
			} else if (this.button == "Remove Security Warden") {
				this.setCNICandLen();
				this.showRemove();
				this.hide();
				this.searchUser = "security";
			} else if (this.button == "Update Security Warden") {
				this.setCNICandLen();
				this.showUpdate();
				this.hide();
				this.searchUser = "security";
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

				var reader = new FileReader();
				reader.onloadend = function () {
					var img = new Image();
					console.log(img);
					img.src = reader.result;

					img.onload = function () {
						// create canvas element
						var canvas = document.createElement("canvas");

						// set canvas dimensions to resized image dimensions
						var MAX_WIDTH = 800;
						var MAX_HEIGHT = 600;
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

						// display compressed image
						printIMG(compressedImage);

						// pass compressed image data to function
						newFunction(compressedImage, "flex");
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
			setRegoandLen() {
				this.labelRegCNIC = "Reg No.";
				this.len = 11;
			},
			setCNICandLen() {
				this.labelRegCNIC = "CNIC";
				this.len = 13;
			},
			async search() {
				let id = this.regnoSearch;
				if (this.button.includes("Student") && id.length < 11) {
					alert("RegNo must be 11 digits");
					return;
				} else if (id.length < 11) {
					alert("CNIC must be 13 digits");
					return;
				}
				try {
					let response = await axios.get(`http://localhost:3000/${this.searchUser}/${id}`);
					console.log(response.data[0]);
					this.setData(response.data[0]);
				} catch (error) {
					alert(error.message.toString());
				}
			},
			setData(val) {
				console.log(val);
				if (val == undefined) {
					alert("No record found");
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

			async submit() {
				const payloadset = {
					name: this.name,
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
				switch (this.button) {
					case "Add Student":
						{
							let qr = getBase64EncodedRegNo(this.regno);
							payloadset["qr"] = qr;
							let node = document.getElementById("imgAdd");
							if (node.parentNode) {
								node.parentNode.removeChild(node);
							}
							const imageUrl = await apiCall("post", "http://localhost:3000/save", payloadset);
							const linkSource = `${imageUrl}`;
							const downloadLink = document.createElement("a");
							downloadLink.href = linkSource;
							downloadLink.download = this.regno;
							downloadLink.click();
						}
						break;
					case "Remove Student":
						await apiCall("delete", `http://localhost:3000/remove/${this.regnoSearch}`);
						break;
					case "Update Student":
						{
							const msg = await apiCall("patch", "http://localhost:3000/update", payloadset);
							showMessage(msg);
						}
						break;
					case "Add Hostel Warden":
						await apiCall("post", "http://localhost:3000/saveHW", payloadset);
						break;
					case "Remove Hostel Warden":
						await apiCall("delete", `http://localhost:3000/removeHW/${this.regnoSearch}`);
						break;
					case "Update Hostel Warden":
						await apiCall("patch", "http://localhost:3000/updateHW", payloadset);
						break;
					case "Add Mess Warden":
						await apiCall("post", "http://localhost:3000/saveMW", payloadset);
						break;
					case "Remove Mess Warden":
						await apiCall("delete", `http://localhost:3000/removeMW/${this.regnoSearch}`);
						break;
					case "Update Mess Warden":
						await apiCall("patch", "http://localhost:3000/updateMW", payloadset);
						break;
					case "Add Security Warden":
						{
							const msg = await apiCall("post", "http://localhost:3000/saveSW", payloadset);
							showMessage(msg);
						}
						break;
					case "Remove Security Warden":
						await apiCall("delete", `http://localhost:3000/removeSW/${this.regnoSearch}`);
						break;
					case "Update Security Warden":
						await apiCall("patch", "http://localhost:3000/updateSW", payloadset);
						break;
				}

				// this.$router.go(-1);
			},
			// async submit() {
			//   let qr = getBase64EncodedRegNo(this.regno);

			//   const payloadset = {
			//     name: this.name,
			//     rollno: this.regno,
			//     cnic: this.cnic,
			//     gender: this.gender,
			//     dept: this.deptName,
			//     age: this.age,
			//     semester: this.sems,
			//     hostfee: this.hostfee,
			//     rollN: this.regnoSearch,
			//     program: this.program,
			//     img: image,
			//     qr: qr,
			//   };
			//   console.log(payloadset);
			//   // console.log("payload ", payloadset.img);
			//   if (this.button == "Add Student") {
			//     await axios
			//       .post("http://localhost:3000/save", payloadset)
			//       .then((response) => {
			//         alert(response.data);
			//       })
			//       .catch((error) => {
			//         alert(error);
			//       });
			//   } else if (this.button == "Remove Student") {
			//     await axios
			//       .delete(`http://localhost:3000/remove/${this.regnoSearch}`)
			//       .then((response) => {
			//         alert(response.data);
			//       })
			//       .catch((error) => {
			//         alert(error);
			//       });
			//   } else if (this.button == "Update Student") {
			//     await axios
			//       .patch("http://localhost:3000/update", payloadset)
			//       .then((response) => {
			//         alert(response.data);
			//       })
			//       .catch((error) => {
			//         alert(error);
			//       });
			//   } else if (this.button == "Add Hostel Warden") {
			//     await axios
			//       .post("http://localhost:3000/saveHW", payloadset)
			//       .then((response) => {
			//         alert(response.data);
			//       })
			//       .catch((error) => {
			//         alert(error);
			//       });
			//   } else if (this.button == "Remove Hostel Warden") {
			//     await axios
			//       .delete(`http://localhost:3000/removeHW/${this.regnoSearch}`)
			//       .then((response) => {
			//         alert(response.data);
			//       })
			//       .catch((error) => {
			//         alert(error);
			//       });
			//   } else if (this.button == "Update Hostel Warden") {
			//     await axios
			//       .patch("http://localhost:3000/updateHW", payloadset)
			//       .then((response) => {
			//         alert(response.data);
			//       })
			//       .catch((error) => {
			//         alert(error);
			//       });
			//   } else if (this.button == "Add Mess Warden") {
			//     await axios
			//       .post("http://localhost:3000/saveMW", payloadset)
			//       .then((response) => {
			//         alert(response.data);
			//       })
			//       .catch((error) => {
			//         alert(error);
			//       });
			//   } else if (this.button == "Remove Mess Warden") {
			//     await axios
			//       .delete(`http://localhost:3000/removeMW/${this.regnoSearch}`)
			//       .then((response) => {
			//         alert(response.data);
			//       })
			//       .catch((error) => {
			//         alert(error);
			//       });
			//   } else if (this.button == "Update Mess Warden") {
			//     await axios
			//       .patch("http://localhost:3000/updateMW", payloadset)
			//       .then((response) => {
			//         alert(response.data);
			//       })
			//       .catch((error) => {
			//         alert(error);
			//       });
			//   } else if (this.button == "Add Security Warden") {
			//     await axios
			//       .post("http://localhost:3000/saveSW", payloadset)
			//       .then((response) => {
			//         alert(response.data);
			//       })
			//       .catch((error) => {
			//         alert(error);
			//       });
			//   } else if (this.button == "Remove Security Warden") {
			//     await axios
			//       .delete(`http://localhost:3000/removeSW/${this.regnoSearch}`)
			//       .then((response) => {
			//         alert(response.data);
			//       })
			//       .catch((error) => {
			//         alert(error);
			//       });
			//   } else if (this.button == "Update Security Warden") {
			//     await axios
			//       .patch("http://localhost:3000/updateSW", payloadset)
			//       .then((response) => {
			//         alert(response.data);
			//       })
			//       .catch((error) => {
			//         alert(error);
			//       });
			//   }
			//   this.$router.go(-1);
			//   // this.$router.push("/"+this.button);
			// },
		},
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.hello {
		justify-content: center;
		align-items: center;
		width: 100% !important;
	}

	.row {
		display: flex;
		flex-direction: row;
		margin: 2px;
		padding: 3px;
		align-items: center;
	}
	.inputbox {
		font-size: 1.3rem;
	}
	.label {
		width: 25%;
		margin-left: 0px;
		margin-right: 10px;
		font-weight: bold;
		text-align: left;
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
		width: 100%;
		background-color: #4caf50;
		color: white;
		padding: 14px 20px;
		margin: 8px 0;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-weight: bolder;
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
