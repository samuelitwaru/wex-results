<template>
  <q-layout view="hHh Lpr fFf">
    <loading />
    <q-page-container>
      <q-header elevated>
        <q-toolbar>
          <q-toolbar-title> Results App </q-toolbar-title>
        </q-toolbar>
      </q-header>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import Loading from "src/components/Loading.vue";

export default {
  components: { Loading },
  // name: 'LayoutName',

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>
