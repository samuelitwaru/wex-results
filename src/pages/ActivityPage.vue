<template>
  <q-page v-if="activity">
    <confirm-dialog ref="confirmDialog" />
    <q-card class="my-card no-borders" flat>
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="text-h5">
            {{ activity.name }}
          </div>
          <div>{{ classRoom?.name }}</div>
        </q-card-section>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          color="negative"
          label="Delete"
          no-caps
          flat
          dense
          @click="deleteActivity(activity)"
        />
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
  },
};
</script>

<style>
</style>
