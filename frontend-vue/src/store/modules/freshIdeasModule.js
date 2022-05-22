import axios from "axios";

export default {
    state: {
        freshIdeas: []
    },
    mutations: {
        UpdateFreshIdeas(state, idea){
            state.freshIdeas.push(idea)
        },
        LoadFreshIdeasFromLocalStorage(state) {
            if (localStorage.FreshIdeasList)
                state.freshIdeas = JSON.parse(localStorage.getItem('FreshIdeasList'))
        },
        SaveFreshIdeasToLocalStorage(state){
            localStorage.removeItem('FreshIdeasList')
            localStorage.setItem('FreshIdeasList', JSON.stringify(state.freshIdeas))
        },
        LoadFromDBFreshIdeas(state, ideas){
            state.freshIdeas = ideas
            this.commit('SaveFreshIdeasToLocalStorage')
        },
        ClearFreshIdeas(state){
            state.freshIdeas = []
            localStorage.removeItem('FreshIdeasList')
        }

    },
    getters:{
        getFreshIdeas(state){
            return state.freshIdeas
        },
        getFreshIdeasCount(state){
            return state.freshIdeas.length
        }
    },
    actions: {
        async LoadFreshIdeas(ctx, count) {
            for (let i = 0; i < count; i++) {
                await axios.get('http://www.boredapi.com/api/activity/')
                    .then(response => {
                        ctx.commit('UpdateFreshIdeas', response.data)
                    });
            }

            ctx.commit('SaveFreshIdeasToLocalStorage')
        }
    }


}