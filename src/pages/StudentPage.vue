<template>
  <q-page>
    <confirm-dialog ref="confirmDialog" />
    <q-card class="my-card no-borders" flat>
      <q-card-section horizontal>
        <q-card-section class="col-3 flex flex-center">
          <q-img
            class="rounded-borders"
            src="~/assets/profile-placeholder.jpg"
            style="width: 100px; hieght: 100px"
          />
        </q-card-section>
        <q-card-section class="q-pt-xs">
          <div class="text-h5 q-mt-sm q-mb-xs">
            {{ student.first_name }} {{ student.last_name }}
            {{ student.middle_name }}
          </div>
          <div>
            {{ student.dob }}
          </div>
          <div v-if="student.class_room">
            {{ student.class_room_detail.name }}
            {{ student.class_room_detail.stream }}
          </div>
        </q-card-section>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          color="negative"
          label="Delete"
          no-caps
          dense
          @click="deleteStudent(student.id)"
        />
      </q-card-actions>

      <q-separator />

      <router-view @updateStudent="student = $event"> </router-view>
    </q-card>
  </q-page>
</template>

<script>
import ConfirmDialog from "src/components/ConfirmDialog.vue";
export default {
  components: { ConfirmDialog },
  data() {
    return {
      student: {},
    };
  },
  created() {},
  methods: {
    deleteStudent(id) {
      this.$refs.confirmDialog
        .show({
          title: "Hello",
          message: `Are you sure you want to delete the student "${id}"?`,
          okButton: "Yes, delete",
        })
        .then((res) => {
          if (res) {
            this.$api.delete(`/students/${id}/`).then((response) => {
              if (response.status == 204) {
                this.$router.push("/students");
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
