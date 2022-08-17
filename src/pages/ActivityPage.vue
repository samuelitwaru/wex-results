<template>
  <q-page v-if="activity">
    <confirm-dialog ref="confirmDialog" />
    <q-card class="my-card no-borders" flat>
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <q-icon name="fa fa-lightbulb" size="xl" />
        </q-card-section>
        <q-card-section class="q-pt-xs">
          <div class="text-h5">
            {{ activity.name }}
          </div>
          <div>{{ classRoom?.name }}</div>
          <div>{{ activity.subject_name }}</div>
          <div v-if="activity.is_open"><q-icon name="fa fa-unlock" /> OPEN</div>
          <div v-else><q-icon name="fa fa-lock" /> CLOSED</div>
        </q-card-section>
      </q-card-section>
      <q-card-actions
        align="right"
        v-if="$userHasGroup('dos') && activity.is_open"
      >
        <q-btn color="primary" label="close" dense @click="closeActivity" />
        <q-btn
          color="negative"
          label="Delete"
          no-caps
          flat
          dense
          @click="deleteActivity(activity)"
        />
      </q-card-actions>

      <q-card-actions
        align="right"
        v-if="!activity.is_open && $userHasGroup('dos')"
      >
        <q-btn color="primary" label="open" dense @click="openActivity" />
      </q-card-actions>

      <q-separator />
    </q-card>

    <router-view
      :activity="activity"
      @updateActivity="activity = $event"
    ></router-view>
  </q-page>
</template>

<script>
import ConfirmDialog from "src/components/ConfirmDialog.vue";
export default {
  components: { ConfirmDialog },
  data() {
    return {
      activity: null,
      classRoom: null,
    };
  },
  created() {
    this.getActivity();
  },

  computed: {
    isActivityOwner() {
      const currentTeacher = this.$getState("user")?.teacher_id;
      const activityTeacher = this.activity?.teacher;
      return currentTeacher == activityTeacher;
    },
  },

  methods: {
    getActivity() {
      this.$setLoading(this, true);
      this.$api
        .get(`/activities/${this.$route.params.id}/`)
        .then((response) => {
          this.activity = response.data;
          this.$setLoading(this, false);
          this.getClassRoom();
        });
    },

    getClassRoom() {
      this.$api
        .get(`/class-rooms/${this.activity.class_room}/`)
        .then((response) => {
          this.classRoom = response.data;
        });
    },

    deleteActivity(activity) {
      this.$refs.confirmDialog
        .show({
          title: "Delete Assignment",
          message: `Are you sure you want to delete the activity "${activity.name}"?`,
          okButton: "Yes, delete",
        })
        .then((res) => {
          if (res) {
            this.$setLoading(this, true);
            this.$api.delete(`/activities/${activity.id}/`).then((response) => {
              if (response.status == 204) {
                this.$setLoading(this, false);
                this.$router.push("/activities");
              }
            });
          }
        });
    },

    closeActivity(activity) {
      this.$refs.confirmDialog
        .show({
          title: "Confirm Close Activity",
          message: `Are you sure you want to close this activity?`,
          okButton: "Yes, close",
        })
        .then((res) => {
          if (res) {
            this.$setLoading(this, true);
            this.$api
              .put(`/activities/${this.$route.params.id}/close/`, {})
              .then((response) => {
                if (response) {
                  this.activity = response.data;
                  this.$setLoading(this, false);
                }
              });
          }
        });
    },

    openActivity(activity) {
      this.$refs.confirmDialog
        .show({
          title: "Confirm Open Activity",
          message: `Are you sure you want to open this activity?`,
          okButton: "Yes, open",
        })
        .then((res) => {
          if (res) {
            this.$setLoading(this, true);
            this.$api
              .put(`/activities/${this.$route.params.id}/open/`, {})
              .then((response) => {
                if (response) {
                  this.activity = response.data;
                  this.$setLoading(this, false);
                }
              });
          }
        });
    },
  },
};
</script>

<style></style>
