<template>
    <section class="weekly">
        <h1 class="weekly__headline">
            GAME OF THE WEEK
        </h1>

        <div class="weekly__games">
            <div class="weekly__featured">
                <div class="weekly__featured-item">
                    <a class="weekly__featured-link" :href="rootPath + featuredGame.url" target="_blank">
                        <figure class="weekly__featured-image">
                            <img :src="featuredGame.image + '.jpg'" :alt="featuredGame.title">
                        </figure>
                    </a>
                </div>
            </div>

            <div class="weekly__offer">
                <div class="weekly__offer-item" :class="{disabled: userGamesId.includes(game.id) || idInCart.includes(game.id)}" v-for="game in games" :key="game.id">
                    <figure class="weekly__offer-image">
                        <a class="weekly__offer-item__link" :href="game.url" target="_blank"></a>
                        <img :src="game.image + '.jpg'" :alt="game.title">
                        <figcaption class="weekly__offer-description">

                            <div class="productInCart" v-for="item in cart" v-if="item.id === game.id">
                                <figure class="productinCart-icon">
                                    <svg viewBox="0 0 11 10" id="in-cart" width="100%" height="100%">
                                        <g id="in-cart_Symbols" stroke="none" stroke-width="1">
                                            <g id="in-cart_ribbon-/-5.-in-cart" transform="translate(-16.000000, -6.000000)">
                                                <path d="M21.2675171,14.0000817 C21.0823472,14.0000829 20.9040031,14.0000841 20.7324848,14.000085 C20.3866875,13.4022368 19.7403174,13 19,13 C18.2781459,13 17.6456117,13.3824235 17.2939452,13.9557226 C17.1421642,13.8869543 17.0308409,13.7445786 17.0055242,13.5741447 C16.3397621,10.2462163 16.006881,8.58225214 16.006881,8.58225214 C15.9889821,8.47485778 16.0067447,8.36975967 16.0515251,8.27905932 C16.0586802,8.14329154 16.1595893,8.02619214 16.3459755,8.00005264 C16.4510802,7.99998346 16.5055868,7.99998346 16.5094953,8.00005264 C21.9928665,8.01533368 24.7344407,8.02363009 24.7342177,8.02494189 C24.9138798,6.96778196 25.0037684,6.43881308 25.0038833,6.43803528 C25.0358103,6.18261802 25.2551083,5.99640582 25.5066516,6.00005264 L26.5000028,6.00005264 C26.7761436,6.00005264 27,6.22391027 27,6.50005264 C27,6.77619502 26.7761436,7.00005264 26.5000028,7.00005264 L25.9414082,7.00005264 L24.9969839,13.5554891 C24.977352,13.7334723 24.864302,13.8833146 24.705553,13.954905 C24.3537869,13.38206 23.7215109,13 23,13 C22.2596839,13 21.6133149,13.4022353 21.2675171,14.0000817 Z M23,14 C23.5522847,14 24,14.4477153 24,15 C24,15.5522847 23.5522847,16 23,16 C22.4477153,16 22,15.5522847 22,15 C22,14.4477153 22.4477153,14 23,14 Z M19,14 C19.5522847,14 20,14.4477153 20,15 C20,15.5522847 19.5522847,16 19,16 C18.4477153,16 18,15.5522847 18,15 C18,14.4477153 18.4477153,14 19,14 Z" id="in-cart_icon_in-cart"></path>
                                            </g>
                                        </g>
                                    </svg>

                                    <figcaption class="productInCart-text">
                                        <p>
                                            In Cart
                                        </p>
                                    </figcaption>
                                </figure>
                            </div>

                            <h3 class="weekly__offer-desc">
                                {{game.title}}
                            </h3>
                        </figcaption>
                    </figure>
                    <div class="weekly__offer-footer">
                        <div class="weekly__offer-price-item weekly__offer-owned text-right" v-if="userGamesId.includes(game.id)">
                            <span>Owned</span>
                        </div>
                        <ul class="weekly__offer-price" v-if="!userGamesId.includes(game.id)">
                            <li  class="weekly__offer-price-item weekly__offer-discount" v-if="game.price.isDiscounted && !idInCart.includes(game.id)" >
                                <p>{{'% ' + game.price.discountPercentage}}</p>
                            </li>
                            <li class="weekly__offer-price-item weekly__offer-pricebtn">
                                 <button class="price-btn" :id="game.id" @click="addToCart(game.id)" :disabled="idInCart.includes(game.id)">
                                    <span v-if="!idInCart.includes(game.id)">
                                        {{game.price.symbol}}
                                    </span>
                                    <span v-if="!idInCart.includes(game.id)">
                                        {{game.price.amount}}
                                    </span>
                                     <span v-if="idInCart.includes(game.id)">IN CART</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "GameOfTheWeek",
        data() {
            return {
                rootPath: 'https://www.gog.com'
            }
        },
        computed: {
            ...mapGetters([
                'games',
                'featured',
                'cart',
                'idInCart',
                'userGamesId'
            ]),
            featuredGame() {
                return this.featured[0]
            }
        },
        methods: {
            addToCart (gameId) {
                this.$store.dispatch('addToCart', gameId)
            }
        }
    }
</script>

<style scoped>

</style>