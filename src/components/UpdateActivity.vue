<template>
  <div class="q-px-sm">
    <h6 class="q-my-sm flex justify-between">
      Activity
      <router-link :to="`/activities/${$route.params.id}/scores`">
        <q-btn color="primary" label="Scores" no-caps flat dense />
      </router-link>
    </h6>
    <q-form @submit="updateActivity">
      <div class="q-py-sm">
        <q-input v-model="formData.name" type="text" label="Name" />
      </div>
      <div class="q-py-sm">
        <q-select
          label="Add Skills"
          outlined
          v-model="formData.skills"
          use-input
          use-chips
          multiple
          hide-dropdown-icon
          input-debounce="0"
          new-value-mode="add-unique"
        />
      </div>
      <!-- <q-select
        outlined
        v-model="formData.subject"
        :option-label="(item) => `${item.code} ${item.name}`"
        option-value="id"
        :options="subjects"
        label="Subject"
        emit-value
        map-options
      />

      <q-select
        class="q-py-sm"
        outlined
        v-model="formData.class_room"
        :option-label="(item) => `${item.name} ${item.stream || ''}`"
        option-value="id"
        :options="classRooms"
        label="Class"
        emit-value
        map-options
      /> -->

      <div align="right">
        <q-btn label="update" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      activity: null,
      teachers: [],
      classRooms: [],
      subjects: [],
      formData: {
        name: null,
        skills: [],
      },
    };
  },
  created() {
    this.getActivity();
    this.getClassRooms();
    this.getSubjects();
  },
  methods: {
    getActivity() {
      this.$api
        .get(`/activities/${this.$route.params.id}/`)
        .then((response) => {
          this.activity = response.data;
          this.formData.name = this.activity.name;
          this.formData.skills = this.activity.skills;
          this.formData.class_room = this.activity.class_room;
          this.formData.subject = this.activity.subject;
          this.formData.teacher = this.activity.teacher;
        });
    },

    updateActivity() {
      this.$setLoading(this, true);
      this.$api
        .put(`/activities/${this.activity.id}/`, this.formData)
        .then((response) => {
          this.activity = response.data;
          this.$emit("updateActivity", this.activity);
          this.$setLoading(this, false);
        });
    },

    getSubjects() {
      this.$api.get(`/subjects/?level_group__name=O`).then((response) => {
        this.subjects = response.data;
      });
    },

    getClassRooms() {
      this.$api
        .get(`/class-rooms/?level__level_group__name=O`)
        .then((response) => {
          this.classRooms = response.data;
        });
    },
  },
};
</script>


<style>
</style>
