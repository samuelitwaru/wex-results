<template>
  <q-page>
    <confirm-dialog ref="confirmDialog" />
    <q-card class="my-card no-borders" flat>
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <q-icon name="person" size="xl" />
        </q-card-section>
        <q-card-section class="q-pt-xs">
          <div class="text-h5 q-mt-sm q-mb-xs">
            {{ user.first_name }}
            {{ user.last_name }}
          </div>
          <div>{{ user.email }}</div>
        </q-card-section>
      </q-card-section>
      <div class="q-pa-sm" align="right">
        <q-btn
          color="negative"
          label="Delete"
          no-caps
          flat
          dense
          @click="deleteUser(user)"
        />
      </div>
      <q-separator />

      <div class="row">
        <div class="col-12 q-pa-sm">
          <strong>User</strong>
          <q-form @submit="updateUser" class="q-gutter-md">
            <div class="row">
              <div class="col q-mr-xs">
                <q-input
                  v-model="formData.first_name"
                  type="text"
                  label="First Name"
                  required
                />
              </div>
              <div class="col q-ml-xs">
                <q-input
                  v-model="formData.last_name"
                  type="text"
                  label="Last Name"
                  required
                />
              </div>
            </div>
            <div class="row">
              <div class="col q-mr-xs">
                <q-input
                  v-model="formData.email"
                  type="email"
                  label="Email"
                  required
                />
              </div>
              <div class="col q-ml-xs q-my-auto">
                <q-checkbox
                  v-model="formData.is_active"
                  :label="`Use is ${formData.is_active ? '' : 'NOT'} active`"
                />
              </div>
            </div>
            <div>
              <div>Roles</div>
              <q-checkbox
                v-for="group in groups"
                :key="group.id"
                v-model="formData.groups"
                :val="group.id"
                :label="group.name.toUpperCase().replace('_', ' ')"
              />
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
import ConfirmDialog from "src/components/ConfirmDialog.vue";
export default {
  components: {
    ConfirmDialog,
  },
  data() {
    return {
      user: {},
      userClassRoomPapers: [],
      groups: [],
      formData: {
        first_name: null,
        last_name: null,
        email: null,
        is_active: false,
        groups: [],
      },
    };
  },
  created() {
    this.getUser();
    this.getGroups();
  },
  methods: {
    getUser() {
      this.$setLoading(this, true);
      this.$api.get(`/users/${this.$route.params.id}/`).then((response) => {
        this.user = response.data;
        this.formData.first_name = this.user.first_name;
        this.formData.last_name = this.user.last_name;
        this.formData.email = this.user.email;
        this.formData.is_active = this.user.is_active;
        this.formData.groups = this.user.groups.map((group) => group.id);
        console.log(this.formData.groups);
        this.$setLoading(this, false);
      });
    },

    getGroups() {
      this.$api.get(`/groups/`).then((response) => {
        this.groups = response.data;
      });
    },

    updateUser() {
      this.formData["username"] = this.formData.email;
      console.log(this.formData);
      this.$setLoading(this, true);
      this.$api
        .put(`/users/${this.user.id}/`, this.formData)
        .then((response) => {
          this.user = response.data;
          this.$setLoading(this, false);
        });
    },

    deleteUser(user) {
      this.$refs.confirmDialog
        .show({
          title: "Delete User",
          message: `Are you sure you want to delete the user "${user.email}"?`,
          okButton: "Yes, delete",
        })
        .then((res) => {
          if (res) {
            this.$setLoading(this, true);
            this.$api.delete(`/users/${user.id}/`).then((response) => {
              if (response.status == 204) {
                this.$setLoading(this, false);
                this.$router.push("/users");
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
