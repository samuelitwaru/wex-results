<template>
  <div>
    <q-btn
      label="New Subject"
      icon="add"
      color="primary"
      @click="medium = true"
    />
    <q-dialog v-model="medium">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">New Subject</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form
            @submit="createSubject"
            @reset="resetForm"
            class="q-gutter-md"
          >
            <q-input
              v-model="formData.code"
              type="code"
              label="Code"
              required
            />
            <q-input
              v-model="formData.name"
              type="text"
              label="Name"
              required
            />
            <q-input v-model="formData.abbr" type="text" label="Abbreviation" />

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
  props: ["subjects"],
  setup() {
    return {
      medium: ref(false),
    };
  },
  data() {
    return {
      formData: {
        code: "",
        name: "",
        abbr: "",
      },
    };
  },
  created() {
    this.getClassRooms();
  },
  methods: {
    createSubject() {
      this.$setLoading(this, true);
      this.$api.post(`/subjects/`, this.formData).then((response) => {
        this.$emit("addSubject", response.data);
        this.medium = false;
        this.resetForm();
        this.$setLoading(this, false);
      });
    },

    getClassRooms() {
      this.$api.get(`/class-rooms/`).then((response) => {
        this.classRooms = response.data;
      });
    },

    resetForm() {
      this.formData.name = null;
      this.formData.abbr = null;
    },
  },
};
</script>

<style>
</style>
