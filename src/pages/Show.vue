<template>
  <q-page class="q-pa-md column justify-start items-center">
    <h3 class="col-auto q-mt-none q-mb-md">Show</h3>

    <q-input class="col-auto q-my-md" v-model="input" label="Rule id">
      <template v-slot:append>
        <q-btn @click="getRule(input)" color="primary" icon="search" />
      </template>
    </q-input>

    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div class="text-center" v-show="rule.id != null">
        <q-list class="q-mt-lg relative-position" bordered>
          <q-item v-ripple>
            <q-item-section v-if="editing" class="text-body1 row"
              >ID: {{ rule.id }} <q-input class="col-auto" v-model="rule.name" label="Name" /></q-item-section
            >
            <q-item-section v-else class="text-body1"
              >ID: {{ rule.id }} - {{ rule.name }}</q-item-section
            >
            <q-item-section avatar>
              <q-icon
                :color="rule.active ? 'positive' : 'negative'"
                :name="rule.active ? 'done' : 'close'"
              />
            </q-item-section>
          </q-item>
          <q-inner-loading :showing="loading">
            <q-spinner-tail size="20px" color="primary" />
          </q-inner-loading>
        </q-list>

        <q-btn-group v-if="editing" class="q-mt-lg" push>
          <q-btn
            @click="toggleEdit()"
            color="secondary"
            push
            label="Cancel"
            icon="keyboard_return"
          />
          <q-btn
            @click="updateRule()"
            color="primary"
            push
            label="Update"
            icon="done"
          />
        </q-btn-group>
        <q-btn-group v-else class="q-mt-lg" push>
          <q-btn
            @click="toggleEdit()"
            color="warning"
            push
            label="Edit"
            icon="edit"
          />
          <q-btn
            @click="deleteRule()"
            color="negative"
            push
            label="Delete"
            icon="delete"
          />
        </q-btn-group>
      </div>
    </transition>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Show",
  data() {
    return {
      loading: false,
      editing: false,
      last_edit: null,
      rule: { id: null, name: "", active: 1 },
      input: "",
    };
  },
  async created() {},
  methods: {
    async getRule(rule) {
      this.loading = true;
      if (rule.trim() == "") {
        this.$q.notify({
          type: "warning",
          icon: "warning",
          message: "NO ID",
          caption: "Input a rule id.",
        });
        this.loading = false;
        return;
      }
      try {
        let response = (await this.$api.get("/" + rule.trim())).data;
        this.rule = response.data;
        this.$q.notify({
          type: "positive",
          icon: "done",
          message: "Rule found",
        });
      } catch (error) {
        this.$q.notify({
          type: "warning",
          icon: "warning",
          message: "RULE NOT FOUND",
          caption: "No rule was found with specified id.",
        });
      }
      this.editing = false
      this.loading = false;
    },
    async deleteRule() {
      this.loading = true;
      let response = (await this.$api.delete("/" + this.rule.id )).data;
      if (response.success) {
        this.$q.notify({
          type: "positive",
          icon: "done",
          message: "Success",
          caption: "Rule deleted.",
        });
      } else {
        this.$q.notify({
          type: "negative",
          icon: "close",
          message: "Failed",
          caption: "Something went wrong.",
        });
      }
      this.rule = { id: null, name: "", active: 1 };
      this.loading = false;
    },
    toggleEdit() {
      this.editing = !this.editing
      if (this.editing) {
        this.last_edit = JSON.parse(JSON.stringify(this.rule))
      } else {
        this.rule = JSON.parse(JSON.stringify(this.last_edit))
      }
      console.log("last edit ", this.last_edit);
      console.log("rule ", this.rule);
    },
    async updateRule() {
      let response = true;
      if (response) {
        this.$q.notify({
          type: "positive",
          icon: "done",
          message: "Success",
          caption: "Rule updated.",
        });
        this.editing = false
      } else {
        this.$q.notify({
          type: "negative",
          icon: "close",
          message: "Failed",
          caption: "Something went wrong.",
        });
        this.rule = { id: null, name: "", active: 1 }
      }
    },
  },
});
</script>
