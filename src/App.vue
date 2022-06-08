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
    console.log(token);
    if (token) {
      this.$api.defaults.headers.common.Authorization = `Token ${token}`;
    } else {
      this.$api.defaults.headers.common.Authorization = "";
      this.$router.push("/login");
    }
  },
});
</script>
