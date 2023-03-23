<template>
    <div class="hello">
        <div>
            <fieldset style="background-color: lightgreen;display: flex;flex-direction: column;">
                <legend style="font-weight: bold; font-size: 1.5rem">Choose One</legend>
                <button id="button" v-for="l in list" :key="l" @click="moveTo(l.name, l.option)">{{ l.option }}</button>
            </fieldset>
        </div>
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
.hello {
    justify-content: center;
    align-items: center;
}


#button {
    background-color: white;
    width: 100%;
    height: 5rem;
    font-weight: bold;
    font-size: 1.5rem;
    color: black;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    border-radius: 20px;
}
</style>
