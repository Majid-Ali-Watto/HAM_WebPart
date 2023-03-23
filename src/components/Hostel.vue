<template>
    <MainMenu :list=list></MainMenu>
</template>

<script>
import MainMenu from './MainMenu.vue';
export default {
    name: "HostelSec",
    components: { MainMenu },
    data() {
        return {
            list: [
                { option: 'Add Hostel Warden', name: 'GenericForm', route: 'GenericForm' },
                { option: 'Remove Hostel Warden', name: 'GenericForm', route: 'GenericForm' },
                { option: 'Update Hostel Warden', name: 'GenericForm', route: 'GenericForm' },
                { option: 'View Hostel Wardens', name: 'ViewWardensData', route: 'ViewWardensData' }]
        }
    },
};
</script>

