<template>
  <div class="hello">
    <div class="hello">
      <fieldset style="background-color: lightgreen">
        <legend style="font-weight: bold; font-size: 1.5rem">Admin Data</legend>
        <form
          @submit.prevent="disp"
          style="display: flex; flex-direction: column;align-items: stretch"
        >
          <input
            type="text"
            v-model="username"
            maxlength="15"
            minlength="5"
            placeholder="Enter Username"
            class="input"
            required
          />
          <input
            type="password"
            v-model="password"
            maxlength="15"
            minlength="5"
            placeholder="Enter Password"
            class="input"
            required
          />
          <div>
            <button type="submit" id="button">Login</button>
          </div>
        </form>
      </fieldset>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  methods: {
    async disp() {
      await axios
        .get("http://localhost:3000/admin")
        .then((response) => {
          if (
            this.username == response.data[0].username &&
            this.password == response.data[0].password
          ) {
            this.$store.dispatch("setUser", "Admin");
            this.$router.push("/MainMenu");
          } else alert("invalid credientials");
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
  display:flex;
  justify-content: center;
  align-items: center;
}

.input {
  margin: 1rem;
  padding: 1rem;
  width: 15rem;
  font-weight: bold;
}

#button {
  background-color: rgb(16, 16, 245);
  width: 5rem;
  height: 3rem;
  font-weight: bold;
  font-size: 1.5rem;
  color: white;
  padding: 0.3rem;
}
</style>
