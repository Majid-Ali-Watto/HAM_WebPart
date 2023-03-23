<template>
  <div id="homeContainer">
    <div id="logoContainer">
      <img alt="QAU logo" src="./assets/logo.png" id="imgStyle"/>
      <h1>Hostel Activity Monitor</h1>
    </div>
    <div id="loginContainer">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0%;
  box-sizing: border-box;
}
#homeContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
}
#logoContainer {

  display: flex;
  flex-direction: row;
  background-color: white;
  padding: 1rem;
}

#imgStyle{
    width: 8rem;
    height: 6rem;
    margin-left:5rem ;
    margin-right: 3rem;
  }
@media screen and (max-width: 1110px) {
  #homeContainer {
    width: 100%;
    height: max-content;
    flex-direction: column;
    justify-content: space-between;
  }
  #logoContainer {
    justify-content: center;
    align-items: center;
    margin: 1rem;
    display: flex;
  }
  #loginContainer {
    justify-content: center;
    margin: 1rem;
  }
  #imgStyle{
    width: 15rem;
    height: 15rem;
  }
}
@media screen and (max-width: 490px) {
  #logoContainer {
    justify-content: center;
    align-items: center;
    margin: 1rem;
    display: flex;
    flex-direction: column;
  }
  #imgStyle{
    width: 6rem;
    height: 6rem;
  }
}
</style>
