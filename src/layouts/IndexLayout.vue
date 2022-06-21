<template>
  <q-layout view="hHh Lpr fFf">
    <loading />
    <alert />
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
import Alert from "src/components/Alert.vue";

export default {
  components: { Loading, Alert },
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
