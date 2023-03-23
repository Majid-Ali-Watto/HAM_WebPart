<template>
    <MainMenu :list=list></MainMenu>
</template>

<script>
import MainMenu from './MainMenu.vue';
export default {
    name: "MessSec",
    components: { MainMenu },
    data() {
        return {
            list: [
                { option: 'Add Mess Warden', name: 'GenericForm', route: 'GenericForm' },
                { option: 'Remove Mess Warden', name: 'GenericForm', route: 'GenericForm' },
                { option: 'Update Mess Warden', name: 'GenericForm', route: 'GenericForm' },
                { option: 'View Mess Warden', name: 'ViewWardensData', route: 'ViewWardensData' }]
        }
    },
};
</script>

