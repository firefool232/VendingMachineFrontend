<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-card
        v-for="drink in drinks"
        :key="drink.id"
        class="mx-1 pointer"
        @click="$emit('select', drink)"
        :disabled="coins < drink.price"
      >
        <v-card-title>
          <span>{{ drink.name }}</span>
        </v-card-title>
        <v-card-text class="drink-info">
          <span> Цена {{ drink.price }} </span>
          <span class="font-weight-light">В автомате: {{ drink.count }}</span>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import { PropType } from "vue/types/v3-component-props";
import IDrink from "../types/Drink";

export default defineComponent({
  props: {
    drinks: {
      type: Object as PropType<Array<IDrink>>,
    },
    coins: {
      type: Number,
    },
  },
  setup(props) {
    //
  },
});
</script>

<style lang="scss" scoped>
.drink-info {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.pointer {
  cursor: pointer;
}
</style>
