<template>
  <q-layout view="lHh Lpr lFf">
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

        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered :width="220">
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
import { defineComponent, ref } from 'vue'
// import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: 'Home',
    icon: 'home',
    link: '/'
  },
  {
    title: 'Levels',
    icon: 'signal_cellular_alt',
    link: '/levels'
  },
  {
    title: 'Class Rooms',
    icon: 'class',
    link: '/class-rooms'
  },
  {
    title: 'Subjects',
    icon: 'subject',
    link: '/subjects'
  },
  {
    title: 'Teachers',
    icon: 'supervisor_account',
    link: '/teachers'
  },
  {
    title: 'Students',
    icon: 'school',
    link: '/students'
  },
  {
    title: 'Grading Systems',
    icon: 'stars',
    link: '/grading-systems'
  },
  {
    title: 'Assessments',
    icon: 'assessment',
    link: '/assessments'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    // EssentialLink,
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>

<style>
a {
  text-decoration: none;
}
</style>
