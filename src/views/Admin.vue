<template>
  <v-data-table :headers="headers" :items="drinks" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Напитки</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Добавить напиток
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Добавление напитка</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedDrink.name"
                      label="Название"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedDrink.price"
                      label="Цена"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedDrink.count"
                      label="Кол-во"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Отмена
              </v-btn>
              <v-btn color="blue darken-1" text @click="save">
                Сохранить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="550px">
          <v-card>
            <v-card-title class="text-h5">
              Вы уверены что хотите удалить напиток?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogDelete = false">
                Отмена
              </v-btn>
              <v-btn color="blue darken-1" text @click="onDelete">
                Удалить
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <span>Нет данных</span>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from "vue";
import { getDrinks } from "../api/VendingApi";
import { addDrink, editDrink, removeDrink } from "../api/AdminApi";
import IDrink from "../types/Drink";

export default defineComponent({
  setup() {
    const dialog = ref(false);
    const dialogDelete = ref(false);
    const drinks: Ref<IDrink[]> = ref([]);
    let deleteDrink: IDrink | null = null;
    const editedDrink = ref({ id: 0, name: "", price: 0, count: 0 });
    const editing = ref(false);

    const headers = [
      {
        text: "Id",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "Имя", value: "name" },
      { text: "Цена", value: "price" },
      { text: "Кол-во", value: "count" },
      { text: "Actions", value: "actions", sortable: false },
    ];

    onMounted(() => {
      fillDrinks();
    });

    function fillDrinks() {
      getDrinks().then((response) => {
        drinks.value = response.data;
      });
    }

    function save() {
      if (editedDrink.value !== null) {
        if (editing.value) {
          editDrink(editedDrink.value).then((response) => {
            dialog.value = false;
            fillDrinks();
            editedDrink.value = { id: 0, name: "", price: 0, count: 0 };
            editing.value = false;
          });
        } else {
          addDrink(editedDrink.value).then((response) => {
            dialog.value = false;
            fillDrinks();
          });
        }
      }
    }

    function editItem(item: IDrink) {
      if (item !== null) {
        editedDrink.value.id = item.id;
        editedDrink.value.name = item.name;
        editedDrink.value.price = item.price;
        editedDrink.value.count = item.count;
        dialog.value = true;
        editing.value = true;
      }
    }

    function onDelete() {
      if (deleteDrink !== null) {
        removeDrink(deleteDrink).then((response) => {
          dialogDelete.value = false;
          fillDrinks();
        });
      }
    }

    function deleteItem(item: IDrink) {
      deleteDrink = item;
      dialogDelete.value = true;
    }

    return {
      dialog,
      dialogDelete,
      drinks,
      headers,
      editedDrink,
      save,
      deleteItem,
      onDelete,
      editItem,
    };
  },
});
</script>
