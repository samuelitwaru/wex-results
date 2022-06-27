<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  beforeCreate() {
    this.$store.dispatch("results/init");
    const token = window.localStorage.getItem("token");
    if (token) {
      this.$api.defaults.headers.common.Authorization = `Token ${token}`;
      this.$api.get(`/users/token/${token}/`).then((response) => {
        this.user = response.data;
        this.$store.commit("results/setUser", response.data);
        if (this.$userHasGroup("teacher")) {
          this.$store.dispatch("results/getTeacher");
        }
      });
    } else {
      this.$api.defaults.headers.common.Authorization = "";
      this.$router.push("/login");
    }
  },
});
</script>
