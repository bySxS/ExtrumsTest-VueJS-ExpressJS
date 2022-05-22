<template>
  <q-drawer
      v-if="onOffMenu"
      show-if-above
      bordered
      class="bg-grey-4"
  >
    <q-list>

      <q-item-label header>Меню</q-item-label>

      <router-link to="/" class="menu-link">
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar color="bg-grey-4" text-color="bg-grey" icon="touch_app" />
        </q-item-section>
        <q-item-section>
          Выберите свежие идеи
        </q-item-section>
      </q-item>
      </router-link>

      <router-link to="/IdeasInMyList" class="menu-link">
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar color="bg-grey-4" text-color="bg-grey" icon="bookmark_add" />
        </q-item-section>
        <q-item-section>
          Идеи в моем листе
        </q-item-section>
      </q-item>
      </router-link>

      <router-link to="/FinishedIdeas" class="menu-link">
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar color="bg-grey-4" text-color="bg-grey" icon="done_all" />
          </q-item-section>
          <q-item-section>
            Завершенные идеи
          </q-item-section>
        </q-item>
      </router-link>
      <p class="bi-menu-button">
      <q-btn color="white" @click="UploadAllToDB" text-color="black" label="Загрузить в БД" />
      </p>
      <p class="bi-menu-button">
      <q-btn color="white" @click="DownloadAllToDB" text-color="black" label="Выгрузить из БД" />
      </p>
      <p class="bi-menu-button">
        <q-btn @click="clearAll" color="negative" text-color="black" label="Очистить Store и Local" />
      </p>


    </q-list>
  </q-drawer>
</template>

<script>
import store from '@/store'
import { useQuasar  } from 'quasar'
export default {
  name: "LeftMenu",
  setup(){
    const $q = useQuasar()
    return {
      showLoading () {
        $q.loading.show()
      },
      hideLoading () {
        $q.loading.hide()
      },
      doneNotify(txt){
        $q.notify({
          message: txt,
          type: 'positive',
          timeout: 1000
        })
      },
      errorNotify(txt){
        $q.notify({
          message: txt,
          type: 'negative',
          timeout: 1000
        })
      },
    }
  },
  mounted() {
    store.commit('LoadLeftMenuFromLocalStorage')
  },
  methods: {
    clearAll(){
      store.commit('ClearAllStateAndDelLocalStorage')
      this.doneNotify('Сайт успешно очищен!')
    },
    UploadAllToDB() {
        this.showLoading()

        store.dispatch('ToFromDB', {
          nameList: 'myIdeas',
          toFrom: 'To'
        }).then(res => {
          this.doneNotify(res)
        }, err => {
          this.errorNotify(err)
        })

        store.dispatch('ToFromDB', {
          nameList: 'FreshIdeas',
          toFrom: 'To'
        }).then(res => {
          this.doneNotify(res)
        }, err => {
          this.errorNotify(err)
        })
        store.dispatch('ToFromDB', {
          nameList: 'FinishedIdeas',
          toFrom: 'To'
        }).then(res => {
          this.doneNotify(res)
          this.hideLoading()
        }, err => {
          this.errorNotify(err)
          this.hideLoading()
        })

    },
    DownloadAllToDB() {
      this.showLoading()

      store.dispatch('ToFromDB', {
        nameList: 'myIdeas',
        toFrom: 'From'
      }).then(res => {
        this.doneNotify(res)
      }, err => {
        this.errorNotify(err)
      })

      store.dispatch('ToFromDB', {
        nameList: 'FreshIdeas',
        toFrom: 'From'
      }).then(res => {
        this.doneNotify(res)
      }, err => {
        this.errorNotify(err)
      })
      store.dispatch('ToFromDB', {
        nameList: 'FinishedIdeas',
        toFrom: 'From'
      }).then(res => {
        this.doneNotify(res)
        this.hideLoading()
      }, err => {
        this.errorNotify(err)
        this.hideLoading()
      })

    },
  },
  computed: {
    onOffMenu () {
      return store.getters.getLeftDrawerOpen
    }
  }
}
</script>

<style lang="sass" scoped>
.menu-link
   text-decoration: none
   color: #2c3e50
.menu-link:hover
  color: black
.router-link-active
  text-decoration: underline
.bi-menu-button
  margin: 10px 25px 15px


</style>