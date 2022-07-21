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

        <div class="text-orange-3 q-px-xs">
          <router-link to="/account">
            <q-chip
              class="glossy"
              icon="person"
              :label="$getState('user')?.name"
            />
          </router-link>
          <!-- {{ $getState("user")?.name }} -->
        </div>
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
            <q-btn
              v-if="link.name == $route.meta.name"
              color="black"
              class="full-width"
              align="left"
              :icon="link.icon"
              flat
              style="background: rgba(0, 0, 255, 0.145)"
            >
              <span class="q-px-md">{{ link.title }}</span>
            </q-btn>
            <q-btn
              v-else
              class="full-width"
              align="left"
              :icon="link.icon"
              flat
            >
              <span class="q-px-md">{{ link.title }}</span>
            </q-btn>
          </router-link>
        </div>
      </q-list>

      <!-- <q-expansion-item
        expand-separator
        color="primary"
        icon="book"
        label="Reports"
      >
        <div class="q-ml-lg">
          <div
            v-for="levelGroup in levelGroups"
            :key="levelGroup.id"
            class="q-pl-lg q-ml-lg"
          >
            <router-link :to="`/reports/${levelGroup.id}`" block>
              {{ levelGroup.full }} Level
            </router-link>
          </div>
        </div>
      </q-expansion-item> -->
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
    name: "home",
    userGroups: ["dos", "head_teacher"],
  },
  {
    title: "Users",
    icon: "fa fa-users",
    link: "/users",
    name: "users",
    userGroups: ["dos", "head_teacher"],
  },
  {
    title: "Levels",
    icon: "signal_cellular_alt",
    link: "/levels",
    name: "levels",
    userGroups: ["dos", "head_teacher"],
  },
  {
    title: "Class Rooms",
    icon: "home",
    link: "/class-rooms",
    name: "class-rooms",
    userGroups: ["dos", "head_teacher", , "teacher"],
  },
  {
    title: "Subjects",
    icon: "subject",
    link: "/subjects",
    name: "subjects",
    userGroups: ["dos", "head_teacher"],
  },
  {
    title: "Grading Systems",
    icon: "stars",
    link: "/grading-systems",
    name: "grading-systems",
    userGroups: ["dos", "head_teacher"],
  },
  {
    title: "Teachers",
    icon: "supervisor_account",
    link: "/teachers",
    name: "teachers",
    userGroups: ["dos", "head_teacher"],
  },
  {
    title: "Allocations",
    icon: "fa fa-th-list",
    link: "/subject-allocations",
    name: "allocations",
    userGroups: ["dos", "head_teacher"],
  },
  {
    title: "Students",
    icon: "school",
    link: "/students",
    name: "students",
    userGroups: ["dos", "head_teacher"],
  },
  {
    title: "Activities",
    icon: "fa fa-lightbulb",
    link: "/activities",
    name: "activities",
    userGroups: ["teacher", "dos", "head_teacher"],
  },
  {
    title: "Assessments",
    icon: "fa fa-line-chart",
    link: "/assessments",
    name: "assessments",
    userGroups: ["teacher", "dos", "head_teacher"],
  },
  // {
  //   title: "Reports",
  //   icon: "book",
  //   link: "/reports",
  //   userGroups: ["dos", "head_teacher", , "teacher"],
  // },
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
  data() {
    return {
      levelGroups: [],
    };
  },
  created() {
    this.getLevelGroups();
  },
  methods: {
    signOut() {
      this.$setLoading(this, true);
      this.$api.get(`/auth/logout/`).then((response) => {
        this.$store.dispatch("results/signOut");
        this.$router.push("/login");
        this.$setLoading(this, false);
      });
    },

    getLevelGroups() {
      this.$api.get(`/level-groups/`).then((response) => {
        this.levelGroups = response.data;
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
