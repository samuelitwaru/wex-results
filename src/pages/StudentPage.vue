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
          <crop-image-uploader
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
            {{ student.index_no }}
          </div>
          <div v-if="student?.class_room">
            {{ student.class_room_detail.name }}
            {{ student.class_room_detail.stream }}
          </div>
        </q-card-section>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          v-if="$userHasGroup('dos')"
          color="negative"
          label="Delete"
          no-caps
          flat
          dense
          @click="deleteStudent(student)"
        />
      </q-card-actions>

      <q-separator />

      <div class="q-pa-xs" align="center">
        <router-link
          :to="`/students/${$route.params.id}`"
          v-if="page != 'student'"
        >
          <q-btn
            label="Student"
            icon="school"
            flat
            :disable="page == 'student'"
          />
        </router-link>
        <q-btn v-else label="Student" icon="school" flat disable />

        <router-link
          :to="`/students/${$route.params.id}/report`"
          v-if="page != 'report'"
        >
          <q-btn label="Report" icon="book" flat />
        </router-link>
        <q-btn v-else label="Report" icon="book" flat disable />
      </div>

      <router-view @updateStudent="student = $event"> </router-view>
    </q-card>
  </q-page>
</template>

<script>
import ConfirmDialog from "src/components/ConfirmDialog.vue";
import UploadImageModal from "src/components/UploadImageModal.vue";
import myUpload from "vue-image-crop-upload";
import CropImageUploader from "src/components/CropImageUploader.vue";
export default {
  components: { ConfirmDialog, UploadImageModal, myUpload, CropImageUploader },
  data() {
    return {
      show: false,
      imgDataUrl: null,
      student: {},
    };
  },
  created() {},
  computed: {
    page() {
      if (this.$route.path.includes("report")) return "report";
      else return "student";
    },
  },
  methods: {
    deleteStudent(student) {
      this.$refs.confirmDialog
        .show({
          title: "Delete Student",
          message: `Are you sure you want to delete the student "${student.first_name} ${student.last_name}"?`,
          okButton: "Yes, delete",
        })
        .then((res) => {
          if (res) {
            this.$setLoading(this, true);
            this.$api.delete(`/students/${student.id}/`).then((response) => {
              if (response.status == 204) {
                this.$setLoading(this, false);
                this.$router.back();
              }
            });
          }
        });
    },

    imgLoadFailed(src) {
      this.student.picture = null;
    },
  },
};
</script>
