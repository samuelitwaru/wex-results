<template>
  <q-page>
    <confirm-dialog ref="confirmDialog" />
    <div class="q-pa-sm">
      <div class="flex justify-between q-py-sm">
        <label class="text-h4">Users</label>
        <create-user-modal
          v-if="$userHasGroup('dos')"
          :groups="groups"
          @addUser="users.push($event)"
        />
      </div>

      <q-markup-table>
        <thead>
          <tr>
            <th class="text-left"></th>
            <th class="text-left">Name</th>
            <th class="text-left">Active</th>
            <th class="text-left">Roles</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>
              <router-link
                v-if="$userHasGroup('dos')"
                class="text-white"
                :to="`/users/${user.id}`"
              >
                <q-btn color="primary" icon-right="edit" no-caps flat dense />
              </router-link>
            </td>
            <td class="text-left">
              {{ user.first_name }} {{ user.last_name }}
              <br />
              <small class="text-grey">{{ user.email }}</small>
            </td>
            <td class="text-left">
              <q-icon v-if="user.is_active" name="check" size="sm" />
            </td>
            <td>
              <q-chip
                v-for="group in user.groups"
                :key="group.id"
                class="glossy"
                icon="person"
                :label="group.name"
              />
              <q-btn
                round
                dense
                v-if="user?.class_rooms?.length"
                class="glossy"
                label="C"
              >
                <q-popup-proxy>
                  <q-chip
                    v-for="class_room in user.class_rooms"
                    :key="class_room.id"
                    size="10px"
                    color="primary"
                    text-color="white"
                    :label="`${class_room.name} ${class_room.stream || ''}`"
                  />
                </q-popup-proxy>
              </q-btn>
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
        this.getTeacherClassRooms();
      });
    },
    getGroups() {
      this.$api.get("/groups/").then((response) => {
        this.groups = response.data;
      });
    },
    getTeacherClassRooms() {
      this.users.forEach((user) => {
        const userGroups = user.groups.map((group) => group.name);
        if (userGroups.includes("teacher")) {
          this.$api.get(`/teachers/?user=${user.id}`).then((response) => {
            if (response && response.data.length) {
              const teacher = response.data[0];
              this.$api
                .get(`/teachers/${teacher.id}/class-rooms/`)
                .then((response) => {
                  if (response) user.class_rooms = response.data;
                });
            }
          });
        }
      });
    },
  },
};
</script>

<style></style>
