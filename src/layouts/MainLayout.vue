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

        <div class="text-orange-3 q-px-xs">{{ $getState("user")?.name }}</div>
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
        <div v-for="link in essentialLinks" :key="link.title">
          <router-link
            v-if="$userHasAnyGroups(link.userGroups)"
            :to="link.link"
            v-bind="link"
            block
          >
            <q-btn class="full-width" align="left" :icon="link.icon" flat>
              <span class="q-px-md">{{ link.title }}</span>
            </q-btn>
          </router-link>
        </div>
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
    userGroups: ["dos"],
  },
  {
    title: "Levels",
    icon: "signal_cellular_alt",
    link: "/levels",
    userGroups: ["dos"],
  },
  {
    title: "Subjects",
    icon: "subject",
    link: "/subjects",
    userGroups: ["dos"],
  },
  {
    title: "Teachers",
    icon: "supervisor_account",
    link: "/teachers",
    userGroups: ["dos"],
  },
  {
    title: "Class Rooms",
    icon: "home",
    link: "/class-rooms",
    userGroups: ["dos"],
  },
  {
    title: "Allocations",
    icon: "fa fa-th-list",
    link: "/subject-allocations",
    userGroups: ["dos"],
  },
  {
    title: "Students",
    icon: "school",
    link: "/students",
    userGroups: ["dos"],
  },
  {
    title: "Grading Systems",
    icon: "stars",
    link: "/grading-systems",
    userGroups: ["dos"],
  },
  {
    title: "Assessments",
    icon: "fa fa-line-chart",
    link: "/assessments",
    userGroups: ["dos", "teacher"],
  },
  {
    title: "Activities",
    icon: "fa fa-lightbulb",
    link: "/activities",
    userGroups: ["teacher"],
  },
  {
    title: "Reports",
    icon: "book",
    link: "/reports",
    userGroups: ["dos", "teacher"],
  },
  {
    title: "Users",
    icon: "fa fa-users",
    link: "/users",
    userGroups: ["dos"],
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
