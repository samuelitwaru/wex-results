<template>
  <q-page>
    <confirm-dialog ref="confirmDialog" />
    <div class="q-pa-sm">
      <div class="flex justify-between q-py-sm">
        <label class="text-h4">Users</label>
        <create-user-modal :groups="groups" @addUser="users.push($event)" />
      </div>

      <q-markup-table>
        <thead>
          <tr>
            <th class="text-left"></th>
            <th class="text-left">Name</th>
            <!-- <th class="text-left">Email</th> -->
            <th class="text-left">Active</th>
            <th class="text-left">Roles</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>
              <router-link class="text-white" :to="`/users/${user.id}`">
                <q-btn color="primary" icon-right="edit" no-caps flat dense />
              </router-link>
            </td>
            <td class="text-left">
              {{ user.first_name }} {{ user.last_name }}
              <br />
              <small class="text-grey">{{ user.email }}</small>
            </td>
            <!-- <td class="text-left">{{ user.email }}</td> -->
            <td class="text-left">
              <input
                type="checkbox"
                class="q-mx-xs"
                :name="user.id"
                :checked="user.is_active"
                @click="activateOrDeactivateUser($event, user)"
              />
            </td>
            <td>
              <q-chip
                v-for="group in user.groups"
                :key="group.id"
                class="glossy"
                icon="person"
                :label="group.name"
              />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </q-page>
</template>

<script>
import CreateUserModal from "src/components/CreateUserModal.vue";
import ConfirmDialog from "src/components/ConfirmDialog.vue";
export default {
  components: { CreateUserModal, ConfirmDialog },
  name: "UsersPage",
  data() {
    return {
      users: [],
      groups: [],
      loading: false,
    };
  },
  created() {
    this.getUsers();
    this.getGroups();
  },
  methods: {
    getUsers() {
      this.$setLoading(this, true);
      this.$api.get("/users/").then((response) => {
        this.users = response.data;
        this.$setLoading(this, false);
      });
    },
    getGroups() {
      this.$api.get("/groups/").then((response) => {
        this.groups = response.data;
      });
    },

    activateOrDeactivateUser(event, user) {
      var userId = user.id;
      if (event.target.checked) {
        this.$refs.confirmDialog
          .show({
            title: "Activate User",
            message: `Are you sure you want to activate user "${user.email}"?`,
            okButton: "Yes, activate",
          })
          .then((res) => {
            if (res) {
              this.$api
                .put(`/users/${userId}/activate/`, { is_active: true })
                .then((response) => {});
              return;
            }
            this.users.find((user) => user.id == userId).is_active =
              !event.target.checked;
            console.log(this.users.find((user) => user.id == userId));
          });
      } else {
        // remove
        this.$refs.confirmDialog
          .show({
            title: "Deactivate User",
            message: `Are you sure you want deactivate user "${user.email}"?`,
            okButton: "Yes, deactivate",
          })
          .then((res) => {
            if (res) {
              this.$api
                .put(`/users/${userId}/activate/`, { is_active: false })
                .then((response) => {});
              return;
            }
            this.users.find((user) => user.id == userId).is_active =
              !event.target.checked;
            console.log(this.users.find((user) => user.id == userId));
          });
      }
    },
  },
};
</script>

<style>
</style>
