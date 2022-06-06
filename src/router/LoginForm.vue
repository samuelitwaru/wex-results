<template>
  <q-form @submit="login" @reset="resetForm" class="q-gutter-md">
    <q-input v-model="formData.username" type="text" label="Username" />
    <q-input v-model="formData.password" type="password" label="Password" />
    <div>
      <q-btn label="Signin" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script>
export default {
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
      this.$api.post(`/auth/login/`, data).then((response) => {
        console.log(response.data);
        console.log(this.$store);
        this.$store.commit("results/setToken", response.data.token);
        this.$router.push("/");
        this.resetForm();
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
