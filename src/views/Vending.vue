<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="8">
        <v-sheet min-height="70vh" rounded="lg">
          <drink-selector :coins="coins" :drinks="drinks" @select="onSelect" />
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="2">
        <v-sheet rounded="lg" min-height="268">
          <coin-dropper
            :coins="coins"
            :coinsBag="coinsBag"
            @putcoin="onPutCoin"
            @change="onChange"
          />
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="2">
        <v-sheet rounded="lg" min-height="268">
          <coin-monitor :coins="coinsBag" :change="changeBag" />
        </v-sheet>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5 font-weight-regular">
          В автомате не будет сдачи. Вы уверены?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Отмена
          </v-btn>
          <v-btn color="green darken-1" text @click="buy"> Купить </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from "vue";
import DrinkSelector from "../components/DrinkSelector.vue";
import CoinDropper from "../components/CoinDropper.vue";
import CoinMonitor from "../components/CoinMonitor.vue";
import {
  getDrinks,
  putCoin,
  getChange,
  isThereAChange,
  buyDrink,
} from "../api/VendingApi";
import IDrink from "../types/Drink";

export default defineComponent({
  components: { DrinkSelector, CoinDropper, CoinMonitor },
  setup() {
    const drinks: Ref<IDrink[]> = ref([]);
    const coins: Ref<number> = ref(0);
    const coinsBag = ref();
    const changeBag = ref();
    const dialog = ref(false);
    let selectedDrink: IDrink | null = null;

    onMounted(() => {
      getDrinks().then((repsonse) => {
        drinks.value = repsonse.data;
      });
      coinsBag.value = {
        1: 10,
        2: 10,
        5: 10,
        10: 10,
      };
    });

    function onPutCoin(value: number) {
      putCoin(value).then((response) => {
        coins.value = response.data;
        coinsBag.value[value]--;
      });
    }

    function onChange() {
      getChange().then((response) => {
        coins.value = 0;
        changeBag.value = response.data.value;
        for (let coin in changeBag.value) {
          coinsBag.value[coin] += changeBag.value[coin];
        }
      });
    }

    function onSelect(drink: IDrink) {
      selectedDrink = drink;
      isThereAChange(drink).then((response) => {
        if (response.data) {
          buy();
        } else {
          dialog.value = true;
        }
      });
    }

    function buy() {
      if (selectedDrink !== null) {
        dialog.value = false;
        buyDrink(selectedDrink).then((response) => {
          coins.value -= (selectedDrink as any).price;
          getDrinks().then((repsonse) => {
            drinks.value = repsonse.data;
          });
        });
      }
    }

    return {
      drinks,
      coins,
      coinsBag,
      changeBag,
      dialog,
      onPutCoin,
      onChange,
      onSelect,
      buy,
    };
  },
});
</script>