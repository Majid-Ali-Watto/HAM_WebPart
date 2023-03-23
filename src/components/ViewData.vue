<template>
  <div class="hello">
    <div>
      <div style="display: flex; justify-content: space-around">
        <label class="input">Reg No</label>
        <input
          type="text"
          v-model="regno"
          maxlength="11"
          minlength="11"
          class="input"
          required
        />
        <button class="input" @click="getStudent()">Search</button>
      </div>

      <div v-if="showData" style="overflow-x: auto">
        <legend style="font-weight: bold">Details</legend>

        <table>
          <tr>
            <th
              style="background-color: green; color: black"
              scope="col"
              v-for="column in columnNames"
              v-bind:key="column.value"
            >
              {{ column.toUpperCase() }}
            </th>
          </tr>

          <tr v-for="row in allData" v-bind:key="row.rollno">
            <td v-for="column in columnNames" v-bind:key="column">
              <div v-if="column == 'image'">
                <img
                  v-bind:src="row[column]"
                  style="width: 100px; height: 100px"
                />
              </div>
              <div v-else>
                {{ row[column] }}
              </div>
            </td>
          </tr>
        </table>

        <button @click="showData = false">Close</button>
      </div>
    </div>
    <!-- <div style="overflow-x: auto"> -->
    <div id="tables">
      <table class="table">
        <tr>
          <th
            style="background-color: green; color: black"
            scope="col"
            v-for="column in columnNames"
            v-bind:key="column.value"
          >
            {{ column.toUpperCase() }}
          </th>
        </tr>

        <tr v-for="row in info" v-bind:key="row.rollno">
          <td v-for="column in columnNames" v-bind:key="column">
            <div v-if="column == 'image'">
              <img
                v-bind:src="row[column]"
                style="width: 100px; height: 100px"
              />
            </div>
            <div v-else>
              {{ row[column] }}
            </div>
          </td>
        </tr>
        <!-- <tbody>
        <tr v-for="row in info" v-bind:key="row.rollno">
          <td v-for="column in columnNames" v-bind:key="column">
           abc
          </td>
        </tr>
      </tbody> -->
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

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
    async getData() {
      await axios
        .get("http://localhost:3000/students")
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
        alert("Please enter valid registration number");
        return;
      }
      await axios
        .get(`http://localhost:3000/students/${id}`)
        .then((response) => {
          this.showData = true;
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

table {
  /* border-collapse: collapse; */
  border-spacing: 0;
  /* width: 100%; */

  border: 1px solid rgb(28, 27, 27);
  background-color: "white";
}

th,
td {
  text-align: left;
  padding: 8px;
  border: 1px solid rgb(157, 153, 153);
}
#tables {
  overflow-x: auto;
  width: 100%;
}
tr:nth-child(odd) {
  background-color: rgb(246, 236, 236);
}
tr:nth-child(even) {
  background-color: #f2f2f2;
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
