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

      <div class="row">
        <div class="col-12 q-pa-sm">
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

            <div align="right">
              <q-btn label="Submit" type="submit" color="primary" />
            </div>
          </q-form>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      user: {},
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
    this.getUser();
  },
  methods: {
    getUser() {
      const token = localStorage.getItem("token");
      if (token) {
        this.$setLoading(this, true);
        this.$api.get(`/users/token/${token}/`).then((response) => {
          this.user = response.data;
          // commit("setUser", response.data);
          // var groups = response.data.groups;
          // commit("setGroups", groups);
          this.$setLoading(this, false);
        });
      }
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
  },
};
</script>

<style>
</style>
