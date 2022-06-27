<template>
  <q-form @submit="login" @reset="resetForm" class="q-gutter-md">
    <q-input v-model="formData.username" type="email" label="Email" required />
    <q-input v-model="formData.password" type="password" label="Password" />
    <div class="flex justify-between">
      <forgot-password-form-modal />
      <q-btn
        style="display: block"
        label="Signin"
        type="submit"
        color="primary"
      />
    </div>
  </q-form>
</template>

<script>
import ForgotPasswordFormModal from "src/components/ForgotPasswordFormModal.vue";
export default {
  components: { ForgotPasswordFormModal },
  data() {
    return {
      formData: {
        username: null,
        password: null,
      },
    };
  },

  methods: {
    login() {
      var data = this.formData;
      this.$setLoading(this, true);
      this.$api.post(`/auth/login/`, data).then((response) => {
        this.$store.commit("results/setToken", response.data.token);
        this.$store.commit("results/setUser", response.data.user);
        if (this.$userHasGroup("dos")) {
          this.$router.push("/");
        } else {
          this.$router.push("/students");
        }
        this.resetForm();
        this.$setLoading(this, false);
      });
    },

    resetForm() {
      this.formData.username = null;
      this.formData.password = null;
    },
  },
};
</script>

<style>
</style>
