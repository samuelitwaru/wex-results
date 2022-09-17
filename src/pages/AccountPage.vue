<template>
  <q-page>
    <q-card class="my-card no-borders" flat>
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <q-icon name="person" size="xl" />
        </q-card-section>
        <q-card-section class="q-pt-xs">
          <div class="text-h5 q-mt-sm q-mb-xs">
            {{ user.name }}
          </div>
          <div>{{ user.email }}</div>
          <div>
            <q-chip
              v-for="group in user.groups"
              :key="group"
              class="glossy"
              icon="person"
              :label="group"
            />
          </div>
        </q-card-section>
      </q-card-section>
      <q-separator />

      <div class="flex justify-around">
        <div class="col-md-6 q-pa-sm">
          <strong>Change Password</strong>
          <q-form @submit="updatePassword" class="q-gutter-md">
            <q-input
              v-model="formData.current_password"
              type="password"
              label="Current Password"
              required
            />
            <div class="row">
              <div class="col q-mr-xs">
                <q-input
                  v-model="formData.new_password"
                  type="password"
                  label="New Password"
                  required
                />
              </div>
              <div class="col q-ml-xs">
                <q-input
                  v-model="formData.confirm_password"
                  type="password"
                  label="Confirm  Password"
                  required
                />
              </div>
            </div>

            <div>
              <q-btn label="Submit" type="submit" color="primary" />
            </div>
          </q-form>
        </div>
        <div class="col-md-3 q-pa-sm" align="center">
          <strong>Your Signature</strong>
          <q-card-section style="min-width: 100px; height: 100px">
            <q-img
              v-if="user2?.signature"
              class="rounded-borders hoverImg"
              alt="~/assets/profile-placeholder.jpg"
              :src="`${$mediaURL}/${user2?.signature}?r=${Math.random()}`"
              style="width: 100px; hieght: 100px"
              @error="imgLoadFailed"
            >
              <template v-slot:loading>
                <div>
                  <q-spinner-ios />
                </div>
              </template>
            </q-img>
            <q-icon v-else name="edit" size="xl" />
            <crop-image-uploader
              :url="`${$apiURL}/users/${user2?.id}/signature/upload/`"
              :aspectRatio="''"
              @updateObject="user2 = $event"
            />
          </q-card-section>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import CropImageUploader from "src/components/CropImageUploader.vue";

export default {
  components: { CropImageUploader },
  data() {
    return {
      user: {},
      user2: null,
      userClassRoomPapers: [],
      groups: [],
      formData: {
        current_password: null,
        new_password: null,
        confirm_password: null,
      },
    };
  },
  created() {
    this.getUserByToken();
  },
  methods: {
    getUserByToken() {
      const token = localStorage.getItem("token");
      if (token) {
        this.$setLoading(this, true);
        this.$api.get(`/users/token/${token}/`).then((response) => {
          this.user = response.data;
          this.getUser();
          this.$setLoading(this, false);
        });
      }
    },

    getUser() {
      this.$api.get(`/users/${this.user.user_id}/`).then((response) => {
        this.user2 = response.data;
      });
    },

    getGroups() {
      this.$api.get(`/groups/`).then((response) => {
        this.groups = response.data;
      });
    },

    updatePassword() {
      this.$setLoading(this, true);
      this.$api
        .put(`/users/${this.user.user_id}/update-password/`, this.formData)
        .then((response) => {
          if (response && response.data) {
            this.resetForm();
            this.$setLoading(this, false);
            this.$showMsg("Your password has been updated");
          }
        });
    },

    resetForm() {
      this.formData.current_password = null;
      this.formData.new_password = null;
      this.formData.confirm_password = null;
    },

    imgLoadFailed(src) {
      this.user.signature = null;
    },
  },
};
</script>

<style></style>
