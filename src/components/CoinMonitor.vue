<template>
  <v-container class="grey lighten-5">
    <span class="mx-auto">Монеты пользователя</span>
    <div v-for="(count, coin) in coins" :key="coin">
      {{ coin }}: {{ count }}
    </div>

    <div v-if="change" class="mt-1">
      <span>Сдача: </span>
      <div v-for="(count, coin) in change" :key="coin">
        {{ coin }}: {{ count }}
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    coins: {
      type: Object,
    },
    change: {
      type: Object,
    },
  },
  setup() {
    //
  },
});
</script>
