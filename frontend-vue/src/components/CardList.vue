<!--@click="addToMyList(card)"-->
<template>
  <q-card flat bordered
          :class="changeColorType(card.type)"
          @click="$emit('onClickCard', card)"
          class="my-card {{classStr}}">
    <q-card-section>
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="text-h6">{{card.activity}}</div>
          <div class="text-subtitle2">type: {{card.type}}</div>
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      <span>participants: {{card.participants}}<br></span>
      <span>accessibility: {{card.accessibility}}<br></span>
      <span>price: {{card.price}}<br></span>
      <a class="truncate" :href="card.link">{{card.link}}</a>
    </q-card-section>

<!--    <q-separator />-->

<!--    <q-card-actions>-->
<!--      <q-btn color="white" text-color="black" label="Standard" />-->
<!--      <q-btn color="white" text-color="black" label="Standard" />-->
<!--    </q-card-actions>-->
  </q-card>
</template>

<script>
// import store from "@/store";

export default {
  name: "CardList",
  emits: ['onClickCard'],
  methods: {
    changeColorType(type) {
      switch(type){
        case 'busywork': return 'bg-primary';
        case 'recreational': return 'bg-negative';
        case 'social': return 'bg-positive';
        case 'relaxation': return 'bg-info';
        case 'music': return 'bg-secondary';
        case 'education': return 'bg-warning';
        case 'diy': return 'bg-purple';
        case 'charity': return 'bg-amber-7';
        case 'cooking': return 'bg-light-green-13';
        default: return 'bg-grey-1';
      }
    }
  },
  props: ['card', 'classStr']
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
a.truncate
  margin: 0 /* Убираем внешний отступ */
  -webkit-line-clamp: 2 /* Число отображаемых строк */
  display: -webkit-box /* Включаем флексбоксы */
  -webkit-box-orient: vertical /* Вертикальная ориентация */
  overflow: hidden /* Обрезаем всё за пределами блока */
.q-pa-md
  float: left
  min-width: 300px
.my-card
  height: 350px
  width: 250px
.my-card:hover
  box-shadow: 0 0 10px 2px #000000 !important
.q-card__actions
  bottom: 5px
  position: absolute
  left: 20px
</style>