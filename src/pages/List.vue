<template>
  <q-page class="q-pa-md column justify-between items-center">
    <h3 class="col-auto q-mt-none q-mb-md">List</h3>

    <q-list class="col list-container relative-position" bordered>
      <q-item dense v-ripple>
        <q-item-section class="text-body1"
          >ID    -     Name</q-item-section
        >
        <q-item-section avatar>
          Active
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item v-for="item in list" :key="item.id" v-ripple>
        <q-item-section class="text-body1"
          >{{ item.id }} - {{ item.name }}</q-item-section
        >
        <q-item-section avatar>
          <q-toggle
          dense
        v-model="item.active"
        checked-icon="done"
        unchecked-icon="close"
        :false-value=0
        :true-value=1
        color="positive"
        disable
      />
        </q-item-section>
      </q-item>

      <q-inner-loading :showing="list_loading">
        <q-spinner-tail size="50px" color="primary" />
      </q-inner-loading>
    </q-list>

    <q-pagination
      :disable="list_loading"
      class="col-auto q-mt-md"
      v-model="current"
      :max="max"
      @update:model-value="getlist(current)"
    />
  </q-page>
</template>

<script>
import check_aut from "src/utils/check_aut";
import { defineComponent } from "vue";

export default defineComponent({
  name: "List",
  data() {
    return {
      list: null,
      current: 1,
      max: 1,
      list_loading: true,
    };
  },
  async created() {
    await check_aut(this.$api, this.$q, this.$router)
    this.getlist();
  },
  methods: {
    async getlist(page = 1) {
      this.list_loading = true;
      let response = (await this.$api.get("", { params: { page: page } })).data;
      this.list = response.data.entities;
      this.max = response.data.pagination.total_pages;
      this.list_loading = false;
    },
  },
});
</script>

<style scoped>
.list-container {
  max-height: 514px;
  min-width: 310px;
}
</style>
