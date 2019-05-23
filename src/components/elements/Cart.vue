<template>
    <div class="cart-wrapper">
        <div class="cart-small" @click="showCart">
            <figure class="navbar__cart-ico">
                <img src="../../assets/images/cart-ico.png" alt="Cart">
            </figure>
            <span class="navbar__cart-counter" v-if="cartCounter">
                {{cartCounter}}
            </span>
        </div>

        <div class="cart" :class="{ visible: cartCounter }" v-if="cartIsVisible">
            <div class="cart__header">
                <p class="cart__count">
                    {{cartCounter}} <span>Item<span v-if="cartCounter > 1">s</span> in cart</span>
                </p>

                <p class="cart__price">
                    <span v-if="cartPrice">$ {{cartPrice}}</span>
                </p>

                <button class="app-btn cart__clearBtn ml-auto" @click="clearCart">
                    Clear Cart
                </button>
            </div>

            <div class="cart__content" >
                <ul class="cart__content-list">
                    <li class="cart__item" v-for="item in cart">
                        <figure class="cart__item-image">
                            <img :src="item.image + '.jpg'" :alt="item.title">
                        </figure>

                        <div class="cart__item-description">
                            <h4 class="cart__item-title">
                                <span v-if="item.title.length <= 27">{{item.title}}</span>
                                <span v-if="item.title.length > 27">{{item.title.substring(0,27)+"..." }}</span>
                            </h4>
                            <p class="cart__item-price text-right">
                                $ {{item.price.amount}}
                            </p>

                            <button class="app-btn cart__item-remove" @click="removeItem(item.id)">
                                Remove
                            </button>

                        </div>

                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "Cart",
        data() {
          return {
              cartIsVisible: false
          }
        },
        computed: {
            ...mapGetters([
                'cart',
                'idInCart',
                'cartPrice'
            ]),
            cartCounter() {
                return this.$store.getters.cart.length
            }
        },
        methods: {
            clearCart() {
                this.$store.dispatch('clearCart')
            },
            removeItem(itemId) {
                this.$store.dispatch('removeItem', itemId)
            },
            showCart() {
                if (this.cartCounter) {
                    if (this.cartIsVisible === false) {
                        this.cartIsVisible = true
                    } else {
                        this.cartIsVisible = false
                    }
                }
            }
        },
        watch: {
            cartCounter () {
                if (this.cartCounter === 0) {
                    this.cartIsVisible = false
                }
            }
        }
    }
</script>

<style scoped>

</style>