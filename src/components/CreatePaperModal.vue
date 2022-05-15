<template>
  <div>
    <q-btn dense flat icon="add" color="primary" @click="medium = true" />
    <q-dialog v-model="medium">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">New Paper for "{{ subject.name }}"</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="createPaper" @reset="resetForm" class="q-gutter-md">
            <q-input
              v-model="formData.number"
              type="number"
              label="Number"
              required
            />
            <q-input
              v-model="formData.description"
              type="text"
              label="Description"
            />

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
  props: ["subject"],
  setup() {
    return {
      medium: ref(false),
    };
  },
  data() {
    return {
      formData: {
        number: "",
        description: "",
      },
    };
  },
  created() {},
  methods: {
    createPaper() {
      this.formData.subject = this.$route.params.id;
      this.$api.post(`/papers/`, this.formData).then((response) => {
        this.$emit("addPaper", response.data);
        this.medium = false;
        this.resetForm();
      });
    },

    resetForm() {
      this.formData.number = null;
      this.formData.description = null;
    },
  },
};
</script>

<style>
</style>
