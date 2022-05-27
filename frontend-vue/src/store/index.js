import { createStore } from 'vuex'
import freshIdeasModule from './modules/freshIdeasModule'
import myListIdeasModule from "@/store/modules/myListIdeasModule";
import finishedIdeasModule from "@/store/modules/finishedIdeasModule";
import menuModules from "@/store/modules/menuModules";


export default createStore({
    modules: {
        freshIdeasModule,
        myListIdeasModule,
        finishedIdeasModule,
        menuModules
    },
    state: {},
    mutations: {
        ClearAllStateAndDelLocalStorage(){
            this.commit('ClearFreshIdeas')
            this.commit('ClearMyListIdeas')
            this.commit('ClearFinishedList')
        }
    },
    getters:{},
    actions: {
        async ToFromDB(ctx, PayLoad) {
            let success = ''
            let error = ''

            let link = ''
            if (PayLoad.toFrom === 'To') link = 'uploadFreshList';
            if (PayLoad.toFrom === 'From') link = 'downloadFreshList';
            if(link === '')
            return new Promise((resolve, reject) => reject('Link пустой'))

            let List = []
            if (PayLoad.nameList === 'myIdeas'){
                if (ctx.getters.getMyListCount < 1)
                    ctx.commit('LoadMyListFromLocalStorage')
                List = ctx.getters.getMyList
            }


            if (PayLoad.nameList === 'FreshIdeas'){
                if (ctx.getters.getFreshIdeasCount < 1)
                    ctx.commit('LoadFreshIdeasFromLocalStorage')
                List = ctx.getters.getFreshIdeas
            }
            if (PayLoad.nameList === 'FinishedIdeas'){
                if (ctx.getters.getFinishedMyListCount < 1)
                    ctx.commit('LoadFinishedListFromLocalStorage')
                List = ctx.getters.getFinishedMyList
            }

            // if ((List.length < 1) && (PayLoad.toFrom === 'To'))
            // return new Promise((resolve, reject) => reject('List пустой'))


            if (error.length === 0)
            await fetch('http://localhost:5000/api/idea/'+ link,{
                method: 'post',
                body: JSON.stringify({
                    nameList: PayLoad.nameList,
                    List: List
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }})
                .then(response => response.json())
                .then(data => {
                if ((data.nameList) && (PayLoad.toFrom === 'From')) {

                    if (PayLoad.nameList === 'FinishedIdeas'){
                        ctx.commit('LoadFromDBFinishedList', JSON.parse(data.List))
                        success = 'Лист FinishedIdeas успешно загружен из БД'
                        }
                    if (PayLoad.nameList === 'FreshIdeas'){
                        ctx.commit('LoadFromDBFreshIdeas', JSON.parse(data.List))
                        success = 'Лист FreshIdeas успешно загружен из БД'
                        }
                    if (PayLoad.nameList === 'myIdeas'){
                        ctx.commit('LoadFromDBMyListIdeas', JSON.parse(data.List))
                        success = 'Лист myIdeas успешно загружен из БД'
                        }

                } else {
                    if (data.message)
                        success = data.message
                }})
                .catch(function(err){
                return new Promise((resolve, reject) => reject(String(err)))
            });
            return new Promise((resolve) => resolve(success))
        }
    }
})