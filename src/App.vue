<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  beforeCreate() {
    this.$store.dispatch("results/init");
  },
});
</script>
