<template>
  <div class="q-pa-md">
    <q-table
        title="Results"
        dense
        :rows="rowsData"
        :columns="columnsData"
        v-model:pagination="pagination"
        row-key="name"
        class="my-sticky-header-column-table"
    />

  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const pagination = ref({
      page: 1,
      rowsPerPage: 0
    })
    return {
      pagination
    }
  },
  props: ['rowsData', 'columnsData']
}

</script>

<style>
td:first-child{
  background-color: #c1f4cd !important
}

</style>