<template>
  <div>
    <q-dialog v-model="show">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">Update Paper for "{{ subject.name }}"</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="updatePaper" class="q-gutter-md">
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
  props: ["paper", "subject"],
  setup() {
    return {
      show: ref(false),
    };
  },
  data() {
    return {
      formData: {
        number: null,
        description: null,
      },
    };
  },
  watch: {
    paper(newValue, oldValue) {
      this.formData.number = newValue.number;
      this.formData.description = newValue.description;
    },
  },
  created() {},
  methods: {
    updatePaper() {
      this.formData.subject = this.$route.params.id;
      this.$api
        .put(`/papers/${this.paper.id}/`, this.formData)
        .then((response) => {
          this.$emit("updatePaper", response.data);
          this.show = false;
        });
    },
  },
};
</script>

<style>
</style>
