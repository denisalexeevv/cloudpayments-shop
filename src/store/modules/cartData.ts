import CartDataEntity from "@/interfaces/CartDataEntity";

type CartDataState = {
    cart: CartDataEntity[]
}

const state = (): CartDataState => ({
    cart: []
})

const getters = {
    cartCount: (state: CartDataState) => {
        if(state.cart.length === 0) return 0;
        return state.cart.length > 1 ?
            state.cart.map(x => x.quantity).reduce((x, y) => x + y) :
            state.cart[0].quantity;
    }
}

const mutations = {
    addItemToCart(state: CartDataState, id: number) {
        const i = state.cart.findIndex(x => x.id === id);
        if(i === -1) { // no such items found
            state.cart.push({
                id,
                quantity: 1
            })
        } else { // found, adding 1 to quantity
            state.cart[i] = {
                id,
                quantity: state.cart[i].quantity + 1
            }
        }
        localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    removeItemFromCart(state: CartDataState, id: number, quantity = 1) {
        const i = state.cart.findIndex(x => x.id === id);
        if(i === -1) return;
        if(state.cart[i].quantity <= quantity) state.cart.splice(i, 1);
        else state.cart[i].quantity -= quantity;
        localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    syncCartItems(state: CartDataState, items: CartDataEntity[]) {
        state.cart = items;
    },
    clearCart(state: CartDataState) {
        state.cart = [];
        localStorage.setItem('cart', JSON.stringify([]))
    }
}

export default { namespaced: true, state, getters, mutations };
