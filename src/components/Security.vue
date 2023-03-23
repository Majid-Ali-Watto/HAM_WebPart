<template>
    <MainMenu :list=list></MainMenu>
  </template>
  
  <script>
  import MainMenu from './MainMenu.vue';
  export default {
      name: "SecuritySec",
      components: { MainMenu },
      data() {
          return {
              list:[
                  {option:'Add Security Warden',name:'GenericForm',route:'GenericForm'},
                  {option:'Remove Security Warden',name:'GenericForm',route:'GenericForm'},
                  {option:'Update Security Warden',name:'GenericForm',route:'GenericForm'},
                  {option:'View Security Warden',name:'ViewWardensData',route:'ViewWardensData'}]
          }
      },
  };
  </script>
  
  