<template>
  <v-container class="grey lighten-5">
    <div class="scoreboard">
      <span class="score text-h5">{{ coins }}</span>
    </div>

    <v-container class="grey lighten-5">
      <v-row no-gutters>
        <v-col>
          <v-btn
            small
            class="ma-1"
            @click="$emit('putcoin', 1)"
            :disabled="coinsBag[1] <= 0"
          >
            1
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            small
            class="ma-1"
            @click="$emit('putcoin', 2)"
            :disabled="coinsBag[2] <= 0"
          >
            2
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            small
            class="ma-1"
            @click="$emit('putcoin', 5)"
            :disabled="coinsBag[5] <= 0"
          >
            5
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            small
            class="ma-1"
            @click="$emit('putcoin', 10)"
            :disabled="coinsBag[10] <= 0"
          >
            10
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-btn small class="mx-auto" @click="$emit('change')">Сдача</v-btn>
      </v-row>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    coins: {
      type: Number,
      default: 0,
    },
    coinsBag: {
      type: Object,
    },
  },
  setup() {
    //
  },
});
</script>

<style lang="scss" scoped>
.scoreboard {
  display: flex;
  align-items: center;
  min-height: 2em;
  background: white;
  border: 1px solid whitesmoke;
  border-radius: 4px;

  & > .score {
    width: 100%;
    text-align: center;
  }
}
</style>