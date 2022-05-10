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
            {{ teacher.name }}
          </div>
        </q-card-section>
      </q-card-section>
      <div class="q-pa-sm" align="right">
        <q-btn
          color="negative"
          label="Delete"
          no-caps
          dense
          @click="deleteTeacher(teacher.id)"
        />
      </div>
      <q-separator />

      <div class="row">
        <div class="col-12 q-pa-sm">
          <strong>Profile</strong>
          <q-form @submit="updateTeacher" class="q-gutter-md">
            <q-input
              v-model="formData.name"
              type="text"
              label="Name"
              required
            />

            <div align="right">
              <q-btn label="update" type="submit" color="primary" />
            </div>
          </q-form>
        </div>
        <div class="col-12 q-pa-sm">
          <div class="flex justify-between q-py-sm">
            <strong class="q-my-auto">Class Subject Allocations</strong>
            <create-teacher-class-room-subject-modal
              :teacher="teacher"
              @addTeacherClassRoomSubject="
                teacherClassRoomSubjects.push($event)
              "
            />
          </div>
          <q-table
            :rows="teacherClassRoomSubjects"
            :columns="columns"
            row-key="id"
            :rows-per-page-options="[50]"
          >
            <template v-slot:body-cell-action="props">
              <q-td :props="props">
                <update-teacher-class-room-subject-modal
                  :teacherClassRoomSubject="props.row"
                  :teacher="teacher"
                  @replaceTeacherClassRoomSubject="
                    this.replaceTeacherClassRoomSubject($event)
                  "
                />
                <q-btn
                  color="negative"
                  icon-right="delete"
                  no-caps
                  flat
                  dense
                  @click="deleteTeacherClassRoomSubject(props.key)"
                />
              </q-td>
            </template>
          </q-table>
        </div>
        <div class="col-12 q-pa-sm">
          <strong>User</strong>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import ConfirmDialog from "src/components/ConfirmDialog.vue";
import UpdateTeacherClassRoomSubjectModal from "src/components/UpdateTeacherClassRoomSubjectModal.vue";
import CreateTeacherClassRoomSubjectModal from "src/components/CreateTeacherClassRoomSubjectModal.vue";
export default {
  components: {
    ConfirmDialog,
    UpdateTeacherClassRoomSubjectModal,
    CreateTeacherClassRoomSubjectModal,
  },
  data() {
    return {
      teacher: {},
      teacherClassRoomSubjects: [],
      formData: {
        name: "",
      },
      formData2: {
        classRoom: "",
      },
      columns: [
        {
          name: "class_room",
          field: "class_room_detail",
          label: "Class Room",
          align: "left",
          format: (data, row) => `${data.name} ${data.stream}`,
        },
        {
          name: "subject",
          field: "subject_detail",
          label: "Subject",
          align: "left",
          format: (data, row) => data.name,
        },
        {
          name: "action",
          label: "Action",
        },
      ],
    };
  },
  created() {
    this.getTeacher();
    this.getTeacherClassRoomSubjects();
  },
  methods: {
    getTeacher() {
      this.$api.get(`/teachers/${this.$route.params.id}/`).then((response) => {
        this.teacher = response.data;
        this.formData.name = this.teacher.name;
      });
    },

    updateTeacher() {
      this.$api
        .put(`/teachers/${this.teacher.id}/`, this.formData)
        .then((response) => {
          this.teacher = response.data;
        });
    },

    deleteTeacher(id) {
      this.$refs.confirmDialog
        .show({
          title: "Delete Teacher",
          message: `Are you sure you want to delete the teacher "${id}"?`,
          okButton: "Yes, delete",
        })
        .then((res) => {
          if (res) {
            this.$api.delete(`/teachers/${id}/`).then((response) => {
              if (response.status == 204) {
                this.$router.push("/teachers");
              }
            });
          }
        });
    },

    getTeacherClassRoomSubjects() {
      this.$api
        .get(`/teacher-class-room-subjects/?teacher=${this.$route.params.id}`)
        .then((response) => {
          this.teacherClassRoomSubjects = response.data;
        });
    },

    deleteTeacherClassRoomSubject(id) {
      this.$refs.confirmDialog
        .show({
          title: "Delete Class Subject Allocation",
          message: `Are you sure you want to delete the Allocation "${id}"?`,
          okButton: "Yes, delete",
        })
        .then((res) => {
          if (res) {
            this.$api
              .delete(`/teacher-class-room-subjects/${id}/`)
              .then((response) => {
                if (response.status == 204) {
                  console.log(response.data);
                  this.teacherClassRoomSubjects =
                    this.teacherClassRoomSubjects.filter(
                      (item) => item.id != id
                    );
                }
              });
          }
        });
    },

    replaceTeacherClassRoomSubject(teacherClassRoomSubject) {
      var index = this.teacherClassRoomSubjects.findIndex(
        (item) => item.id == teacherClassRoomSubject.id
      );
      this.teacherClassRoomSubjects[index] = teacherClassRoomSubject;
    },
  },
};
</script>

<style>
</style>
