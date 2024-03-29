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
          <crop-image-uploader
            :url="`${$apiURL}/teachers/${$route.params.id}/picture/upload/`"
            @updateObject="teacher = $event"
          />
        </q-card-section>
        <q-card-section class="q-pt-xs">
          <div class="text-h5 q-mt-sm q-mb-xs">
            {{ teacher.name }}
          </div>
          <div>{{ teacher.initials }}</div>
        </q-card-section>
      </q-card-section>
      <q-separator class="q-my-sm" />

      <div class="row">
        <div class="col-12 q-pa-sm">
          <div class="flex justify-between q-py-sm">
            <strong class="q-my-auto">Paper Allocations</strong>
          </div>
          <q-table
            :rows="teacherClassRoomPapers"
            :columns="columns"
            row-key="id"
            :rows-per-page-options="[50]"
          >
          </q-table>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import ConfirmDialog from "src/components/ConfirmDialog.vue";
import UploadImageModal from "src/components/UploadImageModal.vue";
import SetUserForm from "src/components/SetUserForm.vue";
import CropImageUploader from "src/components/CropImageUploader.vue";
export default {
  components: {
    ConfirmDialog,
    UploadImageModal,
    SetUserForm,
    CropImageUploader,
  },
  data() {
    return {
      teacher: {},
      teacherClassRoomPapers: [],
      formData: {
        name: "",
        initials: "",
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
          format: (data, row) => `${data.name} ${data.stream || ""}`,
        },
        {
          name: "subject",
          field: "paper_detail",
          label: "Subject",
          align: "left",
          format: (data, row) => `${data.subject_name} / ${data.number}`,
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
      this.$setLoading(this, true);
      this.$api.get(`/teachers/${this.$route.params.id}/`).then((response) => {
        this.teacher = response.data;
        this.formData.name = this.teacher.name;
        this.formData.initials = this.teacher.initials;
        this.$setLoading(this, false);
      });
    },

    updateTeacher() {
      this.$setLoading(this, true);
      this.$api
        .put(`/teachers/${this.teacher.id}/`, this.formData)
        .then((response) => {
          this.teacher = response.data;
          this.$setLoading(this, false);
        });
    },

    deleteTeacher(teacher) {
      this.$refs.confirmDialog
        .show({
          title: "Delete Teacher",
          message: `Are you sure you want to delete the teacher "${teacher.name}"?`,
          okButton: "Yes, delete",
        })
        .then((res) => {
          if (res) {
            this.$setLoading(this, true);
            this.$api.delete(`/teachers/${teacher.id}/`).then((response) => {
              if (response.status == 204) {
                this.$setLoading(this, false);
                this.$router.push("/teachers");
              }
            });
          }
        });
    },

    getTeacherClassRoomPapers() {
      this.$api
        .get(`/paper-allocations/?teacher=${this.$route.params.id}`)
        .then((response) => {
          this.teacherClassRoomPapers = response.data;
        });
    },

    deleteTeacherClassRoomPaper(id) {
      this.$refs.confirmDialog
        .show({
          title: "Delete Class Subject Allocation",
          message: `Are you sure you want to delete this Allocation?`,
          okButton: "Yes, delete",
        })
        .then((res) => {
          if (res) {
            this.$api
              .delete(`/teacher-class-room-papers/${id}/`)
              .then((response) => {
                if (response.status == 204) {
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

<style></style>
