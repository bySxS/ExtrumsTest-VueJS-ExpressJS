export default {
    state: {
        leftDrawerOpen: true
    },
    mutations: {
        changeLeftOpen(state){
            state.leftDrawerOpen = !state.leftDrawerOpen
            this.commit('SaveLeftMenuToLocalStorage')
        },
        LoadLeftMenuFromLocalStorage(state){
            if (localStorage.leftDrawerOpen){
                let on = localStorage.getItem('leftDrawerOpen')
                on === 'true' ?
                    state.leftDrawerOpen = true :
                    state.leftDrawerOpen = false
            }
        },
        SaveLeftMenuToLocalStorage(state){
            localStorage.removeItem('leftDrawerOpen')
            localStorage.setItem('leftDrawerOpen', state.leftDrawerOpen)
        }
    },
    getters: {
        getLeftDrawerOpen(state) {
            return state.leftDrawerOpen
        }
    }
}