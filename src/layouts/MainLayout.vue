<template>
  <q-layout view="lHh Lpr lFf">
    <loading />
    <alert />
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Results App </q-toolbar-title>

        <q-btn
          color="white"
          flat
          dense
          icon="logout"
          label="logout"
          @click="signOut"
        />

        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      class="bg-grey-2"
      show-if-above
      bordered
      :width="220"
    >
      <q-list>
        <q-img
          src="~/assets/string.png"
          :ratio="1"
          style="width: 120px; hieght: 120px"
          spinner-color="primary"
          spinner-size="82px"
        />

        <router-link
          v-for="link in essentialLinks"
          :to="link.link"
          :key="link.title"
          v-bind="link"
          block
        >
          <q-btn class="full-width" align="left" :icon="link.icon" flat>
            <span class="q-px-md">{{ link.title }}</span>
          </q-btn>
        </router-link>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Alert from "src/components/Alert.vue";
import Loading from "src/components/Loading.vue";
import { defineComponent, ref } from "vue";
// import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Home",
    icon: "home",
    link: "/",
  },
  {
    title: "Levels",
    icon: "signal_cellular_alt",
    link: "/levels",
  },
  {
    title: "Subjects",
    icon: "subject",
    link: "/subjects",
  },
  {
    title: "Teachers",
    icon: "supervisor_account",
    link: "/teachers",
  },
  {
    title: "Class Rooms",
    icon: "class",
    link: "/class-rooms",
  },
  {
    title: "Students",
    icon: "school",
    link: "/students",
  },
  {
    title: "Grading Systems",
    icon: "stars",
    link: "/grading-systems",
  },
  {
    title: "Assessments",
    icon: "assessment",
    link: "/assessments",
  },
  {
    title: "Reports",
    icon: "book",
    link: "/reports",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    Loading,
    Alert,
    // EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  methods: {
    signOut() {
      this.$setLoading(this, true);
      this.$api.get(`/auth/logout/`).then((response) => {
        console.log(response.data);
        this.$store.dispatch("results/signOut");
        this.$router.push("/login");
        this.$setLoading(this, false);
      });
    },
  },
});
</script>

<style>
a {
  text-decoration: none;
}
</style>
