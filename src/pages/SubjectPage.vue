<template>
  <q-page>
    <confirm-dialog ref="confirmDialog" />
    <q-card class="my-card no-borders" flat>
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="text-h5 q-mt-sm q-mb-xs">
            {{ subject.name }}
          </div>
          <div class="subtitle q-mt-sm q-mb-xs">
            {{ subject.abbr }}
          </div>
        </q-card-section>
      </q-card-section>

      <q-separator />

      <div class="row">
        <div class="col-md-4 q-pa-sm">
          <strong>Subject</strong>
          <q-form @submit="updateSubject" class="q-gutter-md">
            <q-input
              v-model="formData.name"
              type="text"
              label="Name"
              required
            />

            <q-input v-model="formData.abbr" type="text" label="Abbreviation" />

            <div align="right">
              <q-btn label="update" type="submit" color="primary" />
            </div>
          </q-form>
        </div>
        <div class="col-md-4 q-pa-sm">
          <strong>Teachers</strong>
        </div>
        <div class="col-md-4 q-pa-sm">
          <strong>Classes</strong>
        </div>
      </div>
    </q-card>
    <div class="absolute-bottom q-pa-sm" align="right">
      <q-btn
        color="negative"
        label="Delete"
        no-caps
        dense
        @click="deleteSubject(subject.id)"
      />
    </div>
  </q-page>
</template>

<script>
import ConfirmDialog from "src/components/ConfirmDialog.vue";
export default {
  components: { ConfirmDialog },
  data() {
    return {
      subject: {},
      classRooms: [],

      formData: {
        name: "",
        abbr: "",
      },
    };
  },
  created() {
    this.getSubject();
    this.getClassRooms();
  },
  methods: {
    getSubject() {
      this.$api.get(`/subjects/${this.$route.params.id}/`).then((response) => {
        this.subject = response.data;
        console.log(this.subject);
        this.formData.name = this.subject.name;
        this.formData.abbr = this.subject.abbr;
      });
    },

    updateSubject() {
      this.$api
        .put(`/subjects/${this.subject.id}/`, this.formData)
        .then((response) => {
          this.subject = response.data;
          console.log(response.data);
        });
    },

    deleteSubject(id) {
      this.$refs.confirmDialog
        .show({
          title: "Hello",
          message: `Are you sure you want to delete the subject "${id}"?`,
          okButton: "Yes, delete",
        })
        .then((res) => {
          if (res) {
            this.$api.delete(`/subjects/${id}/`).then((response) => {
              if (response.status == 204) {
                this.$router.push("/subjects");
              }
            });
          }
        });
    },

    getClassRooms() {
      this.$api.get(`/class-rooms/`).then((response) => {
        this.classRooms = response.data;
      });
    },
  },
};
</script>

<style>
</style>
