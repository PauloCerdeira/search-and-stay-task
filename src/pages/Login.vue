<template>
  <q-page class="flex flex-center">
    <q-card flat bordered style="max-width: 320px; word-break: break-all">
      <q-card-section class="row justify-center">
        <div class="col-12 row q-mb-md text-caption">
          <div class="col q-px-md">
            token = "Bearer 40fe071962846075452a4f6123ae71697463cad20f51e237e2035b41af0513d8"

          </div>
          <div class="col-auto">

            <q-btn @click="copyClipboard()" color="primary" icon="content_paste"></q-btn>
          </div>
        </div>

        <div>
          Use the token to Login:
          <q-input v-model="token" label="Bearer Token" />
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions class="row justify-center">
        <q-btn @click="login()" color="primary">Login</q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import check_aut from "src/utils/check_aut";
import { copyToClipboard } from "quasar";

export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      loading: false,
      token: "",
    };
  },
  async created() {
    this.$api.defaults.headers.common["Authorization"] = "";
  },
  methods: {
    async login() {
      this.loading = true;
      this.$api.defaults.headers.common["Authorization"] = this.token;
      if (await check_aut(this.$api, this.$q, this.$router)) {
        this.$q.notify({
          type: "positive",
          icon: "done",
          message: "Success",
          caption: "Authorization granted.",
        });
        this.$router.push("List");
      }
    },
    copyClipboard() {
      copyToClipboard(
        "Bearer 40fe071962846075452a4f6123ae71697463cad20f51e237e2035b41af0513d8"
      )
        .then(() => {
          this.$q.notify({
            type: "positive",
            icon: "done",
            message: "Copied!",
          });
        })
        .catch(() => {
          this.$q.notify({
            type: "negative",
            icon: "close",
            message: "Could not copy!",
          });
        });
    },
  },
});
</script>
