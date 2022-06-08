<template>
  <q-form @submit="setUser" class="q-gutter-md">
    <q-input v-model="formData.email" type="text" label="Email" />
    <q-input v-model="formData.username" type="text" label="Username" />
    <div>
      <q-btn label="Submit" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script>
export default {
  props: ["user"],
  data() {
    return {
      formData: {
        email: null,
        username: null,
      },
    };
  },

  watch: {
    user: function (newVal, oldVal) {
      if (newVal) {
        this.formData.email = newVal.email;
        this.formData.username = newVal.username;
      }
    },
  },

  methods: {
    setUser() {
      var data = this.formData;
      this.$setLoading(this, true);
      this.$api
        .post(`/teachers/${this.$route.params.id}/user/`, data)
        .then((response) => {
          console.log(response.data);
          this.$setLoading(this, false);
        });
    },
  },
};
</script>

<style>
</style>
