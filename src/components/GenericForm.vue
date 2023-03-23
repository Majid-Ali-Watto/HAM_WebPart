<template>
  <div class="hello">
    <div>
      <div>
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
          />
          <button id="search" @click="search">Search</button>
        </div>
      </div>
      <fieldset style="background-color: lightgreen">
        <legend style="font-weight: bold; font-size: 1.5rem">
          {{ user }} Data
        </legend>
        <div id="intdiv">
          <form @submit.prevent="submit">
            <div class="row" v-if="nameVisible">
              <label for="name" class="label">Name</label>
              <input
                type="text"
                id="name"
                maxlength="255"
                minlength="3"
                class="inputbox"
                name="name"
                v-model="name"
                required
              />
            </div>

            <div class="row" v-if="regnoVisible">
              <label for="regno" class="label">Reg No</label>
              <input
                type="text"
                id="regno"
                maxlength="11"
                minlength="11"
                class="inputbox"
                name="regno"
                v-model="regno"
                required
              />
            </div>
            <div class="row" v-if="cnicVisible">
              <label for="cnic" class="label">CNIC</label>
              <input
                type="text"
                id="cnic"
                maxlength="13"
                minlength="13"
                class="inputbox"
                name="cnic"
                v-model="cnic"
                required
              />
            </div>
            <div class="row" v-if="deptVisible">
              <label for="dept" class="label">Department</label>
              <select id="deptName" v-model="deptName" name="deptName">
                <option
                  v-for="dept in depts"
                  :value="dept.name"
                  v-bind:key="dept.name"
                >
                  {{ dept.name }}
                </option>
              </select>
            </div>
            <div class="row" v-if="semsVisible">
              <label for="semester" class="label">Semester</label>
              <select id="semester" v-model="sems" name="semester">
                <option v-for="sem in semesters" :value="sem" v-bind:key="sem">
                  {{ sem }}
                </option>
              </select>
            </div>

            <div class="row" v-if="progVisible">
              <label for="program" class="label">Program</label>
              <select id="program" v-model="program" name="program">
                <option
                  v-for="prog in programs"
                  :value="prog"
                  v-bind:key="prog"
                >
                  {{ prog }}
                </option>
              </select>
            </div>

            <div class="row" v-if="ageVisible">
              <label for="age" class="label">Age</label>
              <input
                type="number"
                id="age"
                maxlength="2"
                minlength="2"
                min="18"
                max="60"
                class="inputbox"
                name="age"
                v-model="age"
                required
              />
            </div>
            <div class="row" v-if="genderVisible">
              <label for="gender" class="label">Gender</label>
              <select id="gender" v-model="gender" name="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div class="row" v-if="hfeeVisible">
              <label for="hostfee" class="label">Hostel Fee</label>
              <input
                type="number"
                id="hostfee"
                min="0"
                max="1000000"
                class="inputbox"
                name="hostfee"
                v-model="hostfee"
              />
            </div>

            <div class="row" v-if="hfeeVisible">
              <!-- <input type="file" @change="previewFiles" multiple> -->
              <label for="hostfee" class="label">Select Image</label>

              <input type="file" @change="encodeImageFileAsURL($event)" />
            </div>
            <!-- <input type="file" name="" id="fileId" @change="imageUploaded()" /> -->
            <button type="submit" class="buttons" v-if="addVisible">ADD</button>
            <button type="submit" class="buttons" v-if="removeVisible">
              REMOVE
            </button>
            <button type="submit" class="buttons" v-if="updatevisible">
              UPDATE
            </button>
          </form>
        </div>
      </fieldset>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import depts from "../assets/Departments/dept";
import semesters from "../assets/Semesters/semester";
import programs from "@/assets/Programs/programs";
// import * as fs from 'fs';
import { getBase64EncodedRegNo } from "@/QR/qrCreater";
let image = "";
function printIMG(img) {
  image = img;
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
    encodeImageFileAsURL(element) {
      var file = element.target.files[0];
      var reader = new FileReader();
      reader.onloadend = function () {
        printIMG(reader.result);
        var proImage = new Image();
        proImage.src = reader.result;
        proImage.width = 200;
        proImage.height = 200;
        document.body.appendChild(proImage);
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
        let response = await axios.get(
          `http://localhost:3000/${this.searchUser}/${id}`
        );
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
    },

    async submit() {
      let qr = getBase64EncodedRegNo(this.regno);

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
        qr: qr,
      };
      console.log("payload ", payloadset.img);
      if (this.button == "Add Student") {
        await axios
          .post("http://localhost:3000/save", payloadset)
          .then((response) => {
            alert(response.data);
          })
          .catch((error) => {
            alert(error);
          });
      } else if (this.button == "Remove Student") {
        await axios
          .delete(`http://localhost:3000/remove/${this.regnoSearch}`)
          .then((response) => {
            alert(response.data);
          })
          .catch((error) => {
            alert(error);
          });
      } else if (this.button == "Update Student") {
        await axios
          .patch("http://localhost:3000/update", payloadset)
          .then((response) => {
            alert(response.data);
          })
          .catch((error) => {
            alert(error);
          });
      } else if (this.button == "Add Hostel Warden") {
        await axios
          .post("http://localhost:3000/saveHW", payloadset)
          .then((response) => {
            alert(response.data);
          })
          .catch((error) => {
            alert(error);
          });
      } else if (this.button == "Remove Hostel Warden") {
        await axios
          .delete(`http://localhost:3000/removeHW/${this.regnoSearch}`)
          .then((response) => {
            alert(response.data);
          })
          .catch((error) => {
            alert(error);
          });
      } else if (this.button == "Update Hostel Warden") {
        await axios
          .patch("http://localhost:3000/updateHW", payloadset)
          .then((response) => {
            alert(response.data);
          })
          .catch((error) => {
            alert(error);
          });
      } else if (this.button == "Add Mess Warden") {
        await axios
          .post("http://localhost:3000/saveMW", payloadset)
          .then((response) => {
            alert(response.data);
          })
          .catch((error) => {
            alert(error);
          });
      } else if (this.button == "Remove Mess Warden") {
        await axios
          .delete(`http://localhost:3000/removeMW/${this.regnoSearch}`)
          .then((response) => {
            alert(response.data);
          })
          .catch((error) => {
            alert(error);
          });
      } else if (this.button == "Update Mess Warden") {
        await axios
          .patch("http://localhost:3000/updateMW", payloadset)
          .then((response) => {
            alert(response.data);
          })
          .catch((error) => {
            alert(error);
          });
      } else if (this.button == "Add Security Warden") {
        await axios
          .post("http://localhost:3000/saveSW", payloadset)
          .then((response) => {
            alert(response.data);
          })
          .catch((error) => {
            alert(error);
          });
      } else if (this.button == "Remove Security Warden") {
        await axios
          .delete(`http://localhost:3000/removeSW/${this.regnoSearch}`)
          .then((response) => {
            alert(response.data);
          })
          .catch((error) => {
            alert(error);
          });
      } else if (this.button == "Update Security Warden") {
        await axios
          .patch("http://localhost:3000/updateSW", payloadset)
          .then((response) => {
            alert(response.data);
          })
          .catch((error) => {
            alert(error);
          });
      }
      this.$router.go(-1);
      // this.$router.push("/"+this.button);
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

.row {
  display: flex;
  flex-direction: row;
}

.label {
  width: 25%;
  padding: 12px 20px;
  margin-left: 0px;
  margin-right: 10px;
  font-weight: bold;
  text-align: left;
}

.inputbox,
select {
  width: 75%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid rgb(43, 42, 44);
  border-radius: 4px;
  box-sizing: border-box;
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
  background-color: #f2f2f2;
  padding: 20px;
}
</style>
