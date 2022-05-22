<template>
  <q-page>
    <confirm-dialog ref="confirmDialog" />
    <q-card class="my-card no-borders" flat>
      <q-card-section horizontal>
        <q-card-section style="min-width: 100px; height: 100px">
          <q-img
            v-if="student.picture"
            class="rounded-borders hoverImg"
            alt="~/assets/profile-placeholder.jpg"
            :src="`${student.picture}?r=${Math.random()}`"
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
            :url="`${$apiURL}/students/${$route.params.id}/picture/upload/`"
            @updateObject="student = $event"
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
import UploadImageModal from "src/components/UploadImageModal.vue";
import myUpload from "vue-image-crop-upload";
export default {
  components: { ConfirmDialog, UploadImageModal, myUpload },
  data() {
    return {
      show: false,
      imgDataUrl: null,
      student: {},
    };
  },
  created() {},
  methods: {
    deleteStudent(id) {
      this.$refs.confirmDialog
        .show({
          title: "Delete Student",
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

    imgLoadFailed(src) {
      console.log(src);
      this.student.picture = null;
    },
  },
};
</script>
