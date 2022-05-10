<template>
  <div style="display: inline">
    <q-btn
      color="primary"
      icon-right="edit"
      @click="updateGradeModal = true"
      no-caps
      flat
      dense
    />

    <q-dialog v-model="updateGradeModal">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">
            Update Grade "{{ grade.category }}" for "{{ grading_system.name }}"
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="updateGrade" class="q-gutter-md">
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
  props: ["grade", "grading_system"],
  setup() {
    return {
      updateGradeModal: ref(false),
    };
  },
  data() {
    return {
      formData: {
        category: this.grade.category,
        min_mark: this.grade.min_mark,
        max_mark: this.grade.max_mark,
        aggregates: this.grade.aggregates,
        points: this.grade.points,
      },
    };
  },
  created() {},
  methods: {
    updateGrade() {
      this.formData.grading_system = this.grading_system.id;
      console.log(this.formData);
      this.$api
        .put(`/grades/${this.grade.id}/`, this.formData)
        .then((response) => {
          this.$emit("replaceGrade", response.data);
          this.updateGradeModal = false;
        });
    },
  },
};
</script>

<style>
</style>