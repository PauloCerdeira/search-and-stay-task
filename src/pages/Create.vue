<template>
  <q-page class="q-pa-md column justify-start items-center">
    <h3 class="col-auto q-mt-none q-mb-md">Create</h3>

    <div class="column items-center">
      <q-input v-model="rule.name" label="Rule Name" />
      <q-toggle
        v-model="rule.active"
        checked-icon="done"
        unchecked-icon="close"
        false-value="0"
        true-value="1"
        color="positive"
        label="Active: "
        left-label
      />
      <q-btn @click="createRule()" color="positive" class="q-ma-lg">
        <q-icon left size="3em" name="add" />
        <div>Create Rule</div>
      </q-btn>
    </div>
  </q-page>
</template>

<script>
import check_aut from "src/utils/check_aut";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Create",
  data() {
    return {
      loading: false,
      rule: {
        name: "",
        active: "0",
      },
    };
  },
  async created() {
    await check_aut(this.$api, this.$q, this.$router)
  },
  methods: {
    async createRule() {
      this.loading = true;
      let response = (await this.$api.post("", { house_rules: this.rule }))
        .data;
        console.log(response);
      if (response.success) {
        this.$q.notify({
          type: "positive",
          icon: "done",
          message: `Success`,
          caption: `Rule "${this.rule.name}" successfully created with id: ${response.data.id}.`,
        });
      } else {
        this.$q.notify({
          type: "negative",
          icon: "close",
          message: `Failed`,
          caption: `Something went wrong.`,
        });
      }
      this.list_loading = false;
    },
  },
});
</script>
