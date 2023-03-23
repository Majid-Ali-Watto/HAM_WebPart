<template>
  <MainMenu :list=list></MainMenu>
</template>

<script>
import MainMenu from './MainMenu.vue';
export default {
    name: "StudentSec",
    components: { MainMenu },
    data() {
        return {
            list:[
                {option:'Add Student',name:'GenericForm',route:'GenericForm'},
                {option:'Remove Student',route:'GenericForm',name:'GenericForm'},
                {option:'Update Student',route:'GenericForm',name:'GenericForm'},
                {option:'View Students',route:'ViewData',name:'ViewData'}
            ]
        }
    },
};
</script>

