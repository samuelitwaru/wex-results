<template>
  <div>
    <q-btn
      label="New Grade"
      icon="add"
      flat
      dense
      color="primary"
      @click="medium = true"
    />
    <q-dialog v-model="medium">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">New Grade for "{{ grading_system.name }}"</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="createGrade" class="q-gutter-md">
            <q-input
              v-model="formData.category"
              type="text"
              label="Category"
              required
            />
            <div class="row">
              <div class="col q-px-1">
                <q-input
                  v-model="formData.min_mark"
                  type="number"
                  label="Min Mark"
                  required
                />
              </div>
              <!-- <div class="col q-px-1"></div> -->
              <div class="col q-px-1">
                <q-input
                  v-model="formData.max_mark"
                  type="number"
                  label="Max Mark"
                  required
                />
              </div>
            </div>

            <div class="row">
              <div class="col q-px-1">
                <q-input
                  v-model="formData.aggregates"
                  type="number"
                  label="Aggregates"
                  required
                />
              </div>
              <!-- <div class="col q-px-1"></div> -->
              <div class="col q-px-1">
                <q-input
                  v-model="formData.points"
                  type="number"
                  label="Points"
                  required
                />
              </div>
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
  props: ["grading_system"],
  setup() {
    return {
      small: ref(false),
      medium: ref(false),
      fullWidth: ref(false),
      fullHeight: ref(false),
    };
  },
  data() {
    return {
      formData: {
        category: "",
        min_mark: "",
        max_mark: "",
        aggregates: "",
        points: "",
      },
    };
  },
  created() {},
  methods: {
    createGrade() {
      this.formData.grading_system = this.grading_system.id;
      console.log(this.formData);
      this.$api.post(`/grades/`, this.formData).then((response) => {
        this.$emit("addGrade", response.data);
        this.medium = false;
      });
    },
  },
};
</script>

<style>
</style>
