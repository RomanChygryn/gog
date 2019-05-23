<template>
    <nav class="nav">
        <div class="app-container">
            <div class="nav__navbar navbar">
                <figure class="navbar__brand">
                    <img src="../../assets/images/logo.png" alt="Gog">
                </figure>

                <div class="navbar__cart ml-auto">
                    <Cart />
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    import Cart from './Cart'
    export default {
        name: "Navbar",
        components: {
            Cart
        }
    }
</script>

<style scoped>

</style>