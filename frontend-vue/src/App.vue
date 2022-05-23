<template>
  <q-layout view="lHh Lpr lFf">
    <HeaderMenu :title="$route.meta.title" />
    <LeftMenu />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
//import { ref } from 'vue'
import HeaderMenu from '@/components/header.vue'
import LeftMenu from '@/components/leftMenu.vue'

export default {
  name: 'app',
  created () {
    document.title = this.$route.meta.title;
  },
  components: {
    HeaderMenu,
    LeftMenu
  }
}
</script>

<style lang="sass" scoped>

</style>
