<template>
  <q-spinner
      v-if="loading"
      color="primary"
      size="3em"
      :thickness="10"
  />
<div class="q-pa-md row items-start q-gutter-md"
     v-for="(idea, index) of getFreshIdeas"
     :key="index">
  <CardList :card="idea"
            @onClickCard="AddToMyList" />
</div>
</template>

<script>
import store from '@/store'
import CardList from "@/components/CardList";
import { useQuasar  } from 'quasar'


export default {
name: "FreshIdeasList",
  setup(){
  const $q = useQuasar()
    return {
    doneAddToMyListNotify(){
      $q.notify({
        message: 'Идея успешно добавлена в список!',
        type: 'positive',
        timeout: 1000
      })
    }
    }
  },
  data () {
    return {
      loading: true
    }
  },
  methods: {
  AddToMyList(idea){
    //console.log(idea)
    store.commit('LoadMyListFromLocalStorage')
    store.commit('AddIdeaToMyList', idea)
    store.commit('SaveMyListToLocalStorage')
    this.doneAddToMyListNotify()
  },
  scroll () {
      window.onscroll = () => {
        let bottomOfWindow =
            document.documentElement.scrollTop + window.innerHeight
            === document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          this.loading = true
          store.dispatch('LoadFreshIdeas', 5)
          this.loading = false
        }
      };
    } //end scroll
  },
  async beforeMount() {
    this.loading = true
    store.commit('LoadFreshIdeasFromLocalStorage')
    if (this.getFreshIdeasCount === 0)
      await store.dispatch('LoadFreshIdeas', 13)
    this.loading = false
  },
  mounted() {
    this.scroll()
  },
  computed: {
    getFreshIdeas() {
      return store.getters.getFreshIdeas
    },
    getFreshIdeasCount(){
      return store.getters.getFreshIdeasCount
    }
  },
  components: {
    CardList
  }
}
</script>

<style lang="sass" scoped>
.q-pa-md
  float: left
  min-width: 300px
</style>