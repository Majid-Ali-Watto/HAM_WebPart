<template>
    <div class="hello">
                <button id="button" v-for="l in list" :key="l" @click="moveTo(l.name, l.option)">{{ l.option }}</button>
    </div>
</template>

<script>
export default {
    name: "MainMenu",
    props: ['list'],

    methods: {
        moveTo(url, user) {
           this.$store.dispatch('setUser',user)
            console.log(this.$store.getters.getUser);
            this.$router.push({ name: url })

        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
    display: flex;
    flex-direction: row;
    justify-content: center;
    /* align-items: center; */
}


#button {
    /* background-color: white; */
    background-color: #555555;
    width: 15rem;
    height: 5rem;
    font-weight: bold;
    font-size: 1.5rem;
    color: white;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    border: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 1rem;
    text-transform: uppercase;

}

</style>
