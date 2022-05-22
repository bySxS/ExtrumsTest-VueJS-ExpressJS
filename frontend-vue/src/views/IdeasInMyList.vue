<template>
  <div class="q-pa-md">
  <vue-horizontal-list
      v-if="getMyListCount > 0"
      :items="getMyList"
      :options="options">
    <template v-slot:default="{item}">
      <CardList
          :card="item"
          :classStr="'item'"
          @onClickCard="DelIdeaFromMyList"
      />
    </template>
  </vue-horizontal-list>
  <div v-else class="alert-warning">У вас нет идей в списке!</div>
  </div>
</template>

<script>
import store from '@/store'
import CardList from "@/components/CardList";
import VueHorizontalList from '@/components/vue-horizontal-list.vue';
import { useQuasar  } from 'quasar'

export default {
  name: "IdeasInMyList",
  setup(){
    const $q = useQuasar()

    return {
      doneAddToFinishedNotify(){
        $q.notify({
          message: 'Идея успешно завершена и удалена со списка!',
          type: 'positive',
          timeout: 1000
        })
      }
    }
  },
  methods: {
    DelIdeaFromMyList(idea){
        store.commit('DelIdeaFromMyList', idea)
        store.commit('LoadFinishedListFromLocalStorage')
        store.commit('AddToFinishedList', idea)
        this.doneAddToFinishedNotify()
    }
  },
  data() {
    return {
      options: {
        responsive: [
          {end: 576, size: 1},
          {start: 576, end: 768, size: 2},
          {start: 768, end: 992, size: 3},
          {size: 4}
        ],
        autoplay: {
          play: false,
          speed: 3000,
          repeat: true,
        },
        list: {
          // 1200 because @media (min-width: 1200px) and therefore I want to switch to windowed mode
          windowed: 1200,

          // Because: #app {padding: 80px 24px;}
          padding: 24
        }
      }

    }
  },
  beforeMount() {
    if (this.getMyListCount > 0) {
      store.commit('SaveMyListToLocalStorage')
    } else
      store.commit('LoadMyListFromLocalStorage')
  },
  computed: {
    getMyList() {
       return store.getters.getMyList
    },
    getMyListCount() {
        return store.getters.getMyListCount
     }
   },
  components: {
    CardList,
    VueHorizontalList
  }
}
</script>

<style scoped>
.q-pa-md {
  width: 100%;
  padding: 0 39px!important;
}
</style>