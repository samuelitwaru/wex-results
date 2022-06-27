<template>
  <div>
    <q-btn
      color="primary"
      @click="show = true"
      dense
      label="Forgot Password"
      flat
      no-caps
    />
    <q-dialog v-model="show">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">Forgot Password</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-grey">
            Enter Your Email Address to Reset Your Password
          </div>
          <q-form
            @submit="resetPassword"
            @reset="resetForm"
            class="q-gutter-md"
          >
            <div class="row">
              <div class="col-12 q-mr-xs">
                <q-input
                  v-model="formData.username"
                  type="email"
                  label="Email"
                  required
                />
              </div>
              <div class="col-12 q-ml-xs"></div>
            </div>

            <div class="flex justify-between">
              <div>
                <q-btn flat color="primary" label="Cancel" v-close-popup />
              </div>
              <q-btn label="Submit" type="submit" color="primary" />
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      show: ref(false),
    };
  },
  data() {
    return {
      formData: {
        username: null,
      },
    };
  },
  created() {},
  methods: {
    resetPassword() {
      this.$setLoading(this, true);
      this.$api
        .post(`users/reset-password/`, this.formData)
        .then((response) => {
          var user = response.data;
          if ("id" in user) {
            console.log("Login to your email to proceed");
            this.show = false;
          }
          this.$setLoading(this, false);
        });
    },

    resetForm() {
      this.formData.username = null;
    },
  },
};
</script>

<style>
</style>
