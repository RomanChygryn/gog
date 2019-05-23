import Vue from 'vue'
import Vuex from 'vuex'

import games from './stores/games';
import userGames from './stores/userGames';


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        games,
        cart: [],
        idInCart: [],
        user: {
            userId: 1,
            userGames: userGames
        }
    },
    getters: {
        user: state => {
          return state.user
        },

        userGamesId: (state, getters) => {
            let userGames = [...state.user.userGames],
                userGamesId = [];

            userGames.forEach((game) => {
                userGamesId.push(game.id)
            })

            return userGamesId
        },

        featured: state => {
            let games = [...state.games],
                rates = [],
                maxRate;

            games.forEach((game) => {
                rates.push(game.rating)
            })
            maxRate = Math.max.apply(null, rates)

            return games.filter(i => {
                return i.rating === maxRate
            })
        },

        games: (state, getters) => {
            let games = [...state.games],
                featured = [...getters.featured]

            return games.filter(i => {
                return i.id !== featured[0].id
            });
        },
        cart: state => {
            return state.cart;
        },
        cartPrice: state => {
            let cart = [...state.cart],
                cartAmounts = [],
                cartPrice = 0;

            cart.forEach((price) => {
                cartAmounts.push(price.price.amount)
            })


            for (let i = 0; i < cartAmounts.length; i++) {
                cartPrice += parseFloat(cartAmounts[i]);
            }

            return cartPrice
        },
        idInCart: state => {
            return state.idInCart;
        },
    },
    mutations: {
        ADD_TO_CART (state, gameId) {
            let games = [...state.games],
                cart = [...state.cart],
                selectedGame,
                isInCart = false;

            cart.filter(i => {
                if(i.id === gameId) {
                    isInCart = true
                }
            })
            selectedGame = games.filter(i => {
                return i.id === gameId
            })


            if (!isInCart) {
                state.cart.push(selectedGame[0])
                state.idInCart.push(selectedGame[0].id)
                localStorage.setItem( 'temporaryCart', JSON.stringify(state.cart) );
                localStorage.setItem( 'temporaryCartGamesIds', JSON.stringify(state.idInCart) );
            }
        },

        CHECK_LOCAL_STORAGE (state) {
            if (localStorage.getItem("temporaryCart") !== null && localStorage.getItem("temporaryCartGamesIds") !== null ) {
                state.cart = JSON.parse( localStorage.getItem( 'temporaryCart' ) );
                state.idInCart = JSON.parse( localStorage.getItem( 'temporaryCartGamesIds' ) );
            }
        },
        CLEAR_CART (state) {
            state.cart = []
            state.idInCart = []
        },
        REMOVE_ITEM (state, itemId) {
            let cart = [...state.cart],
                idInCart = [...state.idInCart]

            state.cart = cart.filter(i => {
                return i.id !== itemId
            })

            state.idInCart = idInCart.filter(i => i !== itemId)

            if (localStorage.getItem("temporaryCart") !== null && localStorage.getItem("temporaryCartGamesIds") !== null ) {
                localStorage.setItem( 'temporaryCart', JSON.stringify(state.cart) );
                localStorage.setItem( 'temporaryCartGamesIds', JSON.stringify(state.idInCart) );
            }

        },

    },
    actions: {
        addToCart({commit}, gameId) {
            commit('ADD_TO_CART', gameId);
        },
        clearCart({commit}) {
            commit('CLEAR_CART');
        },
        removeItem({commit}, itemId) {
            commit('REMOVE_ITEM', itemId);
        },
        checkLocalStorage({commit}) {
            commit('CHECK_LOCAL_STORAGE')
        }
    }
})
