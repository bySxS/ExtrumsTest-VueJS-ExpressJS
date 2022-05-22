export default {
    state: {
        FinishedMyList: [],
    },
    mutations: {
        AddToFinishedList(state, idea){
            const i = state.FinishedMyList.findIndex(item => item.type === idea.type)
            if (i === -1) {
                state.FinishedMyList.push(idea)
            } else {
                let arr = state.FinishedMyList.find(item => item.type === idea.type);
                arr.participants += idea.participants
                arr.accessibility += idea.accessibility
                arr.price += idea.price

                state.FinishedMyList[i] = arr
            }
            this.commit('SaveFinishedListToLocalStorage')
        },
        LoadFinishedListFromLocalStorage(state){
            if (localStorage.FinishedList)
                state.FinishedMyList = JSON.parse(localStorage.getItem('FinishedList'))
        },
        SaveFinishedListToLocalStorage(state){
            localStorage.removeItem('FinishedList')
            localStorage.setItem('FinishedList', JSON.stringify(state.FinishedMyList))
        },
        LoadFromDBFinishedList(state, ideas){
            state.FinishedMyList = ideas
            this.commit('SaveFinishedListToLocalStorage')
        },
        ClearFinishedList(state){
            state.FinishedMyList = []
            localStorage.removeItem('FinishedList')
        }
    },
    getters: {
        getFinishedMyList(state){
            return state.FinishedMyList
        },
        getFinishedMyListCount(state){
            return state.FinishedMyList.length
        }
    }
}