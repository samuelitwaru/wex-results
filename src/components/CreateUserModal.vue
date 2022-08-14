<template>
  <div>
    <q-btn dense icon="add" color="primary" @click="medium = true" />
    <q-dialog v-model="medium">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">New User</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="createUser" @reset="resetForm" class="q-gutter-md">
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
              <div class="col q-ml-xs">
                <q-input
                  v-model="formData.telephone"
                  type="text"
                  label="Telephone"
                  required
                  mask="phone"
                  unmasked-value
                  hint="eg (078) 190 - 2516"
                />
              </div>
            </div>
            <div class="col-12 q-ml-xs"></div>
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
            <div class="flex justify-between">
              <div>
                <q-btn flat color="primary" label="Cancel" v-close-popup />
              </div>
              <q-btn label="Submit" type="submit" color="primary" />
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: ["users", "groups"],
  setup() {
    return {
      medium: ref(false),
    };
  },
  data() {
    return {
      // groups: [],
      formData: {
        first_name: null,
        last_name: null,
        username: null,
        email: null,
        groups: [],
      },
    };
  },
  created() {
    // this.getGroups();
  },
  methods: {
    createUser() {
      this.formData["username"] = this.formData.email;
      this.$setLoading(this, true);
      this.$api.post(`/users/`, this.formData).then((response) => {
        this.$emit("addUser", response.data);
        this.medium = false;
        this.resetForm();
        this.$setLoading(this, false);
      });
    },

    getGroups() {
      this.$api.get(`/groups/`).then((response) => {
        this.groups = response.data;
      });
    },

    resetForm() {
      this.formData.first_name = null;
      this.formData.last_name = null;
      this.formData.username = null;
      this.formData.email = null;
      this.formData.telephone = null;
      this.formData.groups = [];
    },
  },
};
</script>

<style></style>
