<template>
<div>
  <TableIdeas
      :rowsData="getFinishedMyList"
      :columnsData="columns" />
</div>
</template>

<script>
import TableIdeas from '@/components/TableIdeas'
import store from "@/store";

const columns = [
  {
    name: 'type',
    required: true,
    label: 'Type',
    align: 'left',
    field: 'type',//row => row.name,
    //format: val => `${val}`,
    sortable: true
  },
  { name: 'participants', align: 'center', label: 'Participants', field: 'participants', sortable: true },
  { name: 'accessibility', label: 'Accessibility', field: 'accessibility', sortable: true },
  { name: 'price', label: 'Price', field: 'price', sortable: true }
 ]

export default {
  name: "FinishedIdeas",
  data(){
    return{
      columns
    }
  },
  computed: {
    getFinishedMyList() {
      return store.getters.getFinishedMyList
    },
  },

  beforeMount() {
    store.commit('LoadFinishedListFromLocalStorage')
  },

  components: {
  TableIdeas
  },
}
</script>

<style scoped>

</style>