<template>
  <q-header elevated class="glossy bg-dark">
    <q-toolbar>
      <q-btn
          flat
          dense
          round
          @click="changeOnMenu"
          aria-label="Menu"
          icon="menu"
      />

      <q-toolbar-title>
        {{title}}
      </q-toolbar-title>

      <div>Добро пожаловать!</div>
    </q-toolbar>
  </q-header>
</template>

<script>
import store from "@/store";
export default {
  props: ['title'],
  name: "HeaderMenu",
  methods: {
    changeOnMenu() {
      store.commit('changeLeftOpen')
    },
  }
}
</script>

<style scoped>

</style>