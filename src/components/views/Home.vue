<template>
    <div class="home">
        <Navbar/>
        <div class="app-container">
            <game-of-the-week/>
        </div>
    </div>
</template>

<script>
    import Navbar from '../elements/Navbar'
    import GameOfTheWeek from './GameOfTheWeek'

    export default {
        components: {
            Navbar,
            GameOfTheWeek
        },
        name: "Home",
        computed: {
            games() {
                return this.$store.getters.games;
            },
        },
    }
</script>

<style scoped>

</style>