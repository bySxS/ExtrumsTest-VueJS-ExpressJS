export default {
    state: {
        myList: [],
    },
    mutations: {
        AddIdeaToMyList(state, idea){
            const i = state.myList.findIndex(item => item.key === idea.key);
            if (i === -1)
                state.myList.push(idea)
        },
        DelIdeaFromMyList(state, idea){
            state.myList = state.myList.filter(item => item.key !== idea.key);
            this.commit('SaveMyListToLocalStorage')
        },
        LoadMyListFromLocalStorage(state) {
            if (localStorage.myList)
                state.myList = JSON.parse(localStorage.getItem('myList'))
        },
        SaveMyListToLocalStorage(state){
            localStorage.removeItem('myList')
            localStorage.setItem('myList', JSON.stringify(state.myList))
        },
        LoadFromDBMyListIdeas(state, ideas){
            state.myList = ideas
            this.commit('SaveMyListToLocalStorage')
        },
        ClearMyListIdeas(state){
            state.myList = []
            localStorage.removeItem('myList')
        }
    },
    getters: {
        getMyList(state){
            return state.myList
        },
        getMyListCount(state){
            return state.myList.length
        },
    }
}