<template>
  <q-page>
    <confirm-dialog ref="confirmDialog" />
    <q-card class="my-card no-borders" flat>
      <q-card-section horizontal>
        <q-card-section style="min-width: 100px; height: 100px">
          <q-img
            v-if="teacher.picture"
            class="rounded-borders hoverImg"
            alt="~/assets/profile-placeholder.jpg"
            :src="`${teacher.picture}?r=${Math.random()}`"
            style="width: 100px; hieght: 100px"
            @error="imgLoadFailed"
          >
            <template v-slot:loading>
              <div>
                <q-spinner-ios />
              </div>
            </template>
          </q-img>
          <q-icon v-else name="person" size="xl" />
          <upload-image-modal
            :url="`${$apiURL}/teachers/${$route.params.id}/picture/upload/`"
            @updateObject="teacher = $event"
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
            <create-teacher-class-room-paper-modal
              :teacher="teacher"
              @addTeacherClassRoomPaper="teacherClassRoomPapers.push($event)"
            />
          </div>
          <q-table
            :rows="teacherClassRoomPapers"
            :columns="columns"
            row-key="id"
            :rows-per-page-options="[50]"
          >
            <template v-slot:body-cell-action="props">
              <q-td :props="props">
                <update-teacher-class-room-paper-modal
                  :teacherClassRoomPaper="props.row"
                  :teacher="teacher"
                  @replaceTeacherClassRoomPaper="
                    this.replaceTeacherClassRoomPaper($event)
                  "
                />
                <q-btn
                  color="negative"
                  icon-right="delete"
                  no-caps
                  flat
                  dense
                  @click="deleteTeacherClassRoomPaper(props.key)"
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
import UpdateTeacherClassRoomPaperModal from "src/components/UpdateTeacherClassRoomPaperModal.vue";
import CreateTeacherClassRoomPaperModal from "src/components/CreateTeacherClassRoomPaperModal.vue";
import UploadImageModal from "src/components/UploadImageModal.vue";
export default {
  components: {
    ConfirmDialog,
    UpdateTeacherClassRoomPaperModal,
    CreateTeacherClassRoomPaperModal,
    UploadImageModal,
  },
  data() {
    return {
      teacher: {},
      teacherClassRoomPapers: [],
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
          field: "paper_detail",
          label: "Subject",
          align: "left",
          format: (data, row) => `${data.subject_name} / ${data.number}`,
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
    this.getTeacherClassRoomPapers();
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

    getTeacherClassRoomPapers() {
      this.$api
        .get(`/teacher-class-room-papers/?teacher=${this.$route.params.id}`)
        .then((response) => {
          this.teacherClassRoomPapers = response.data;
        });
    },

    deleteTeacherClassRoomPaper(id) {
      this.$refs.confirmDialog
        .show({
          title: "Delete Class Subject Allocation",
          message: `Are you sure you want to delete the Allocation "${id}"?`,
          okButton: "Yes, delete",
        })
        .then((res) => {
          if (res) {
            this.$api
              .delete(`/teacher-class-room-papers/${id}/`)
              .then((response) => {
                if (response.status == 204) {
                  console.log(response.data);
                  this.teacherClassRoomPapers =
                    this.teacherClassRoomPapers.filter((item) => item.id != id);
                }
              });
          }
        });
    },

    replaceTeacherClassRoomPaper(teacherClassRoomPaper) {
      var index = this.teacherClassRoomPapers.findIndex(
        (item) => item.id == teacherClassRoomPaper.id
      );
      this.teacherClassRoomPapers[index] = teacherClassRoomPaper;
    },

    imgLoadFailed(src) {
      this.teacher = null;
    },
  },
};
</script>

<style>
</style>
