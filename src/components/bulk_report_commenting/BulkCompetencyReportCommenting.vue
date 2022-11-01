<template>
  <div class="q-pa-md">
    <div>Average Sore</div>
    <div class="row">
      <div class="col q-mr-xs">
        <q-input
          v-model="formData.competency_score__gte"
          type="number"
          label="From"
        />
      </div>
      <div class="col q-ml-xs">
        <q-input
          v-model="formData.competency_score__lte"
          type="number"
          label="To"
        />
      </div>
    </div>
    <div class="q-pt-sm">
      <q-form @submit="saveComment" @reset="resetForm" class="q-gutter-md">
        <div class="q-py-sm">
          <div class="text-subtitle1">Comment</div>
          <q-input outlined v-model="formData.comment" required />
        </div>

        <div v-if="$userHasGroup('head_teacher') || isClassTeacher">
          <q-checkbox
            v-model="formData.overwrite"
            label="Overwrite existing comments"
          />

          <div class="q-pt-s" align="right">
            <q-btn color="primary" label="submit" type="submit" />
          </div>
        </div>
      </q-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        competency_score__gte: 0,
        competency_score__lte: 3,
        student__class_room: this.$route.params.id,
        comment: "",
        overwrite: true,
      },
    };
  },
  methods: {
    saveComment() {
      if (this.$userHasGroup("head_teacher")) {
        this.formData["teacher_group"] = "head";
      } else if (this.isClassTeacher) {
        this.formData["teacher_group"] = "class";
      }
      this.formData["level_group_name"] = this.levelGroupName;
      this.$setLoading(this, true);
      this.$api
        .put(`/reports/competency/comment/bulk/`, this.formData)
        .then((response) => {
          this.reports = response.data;
          this.resetForm();
          this.$setLoading(this, false);
          this.$emit("get-reports");
        });
    },
    resetForm() {},
  },
};
</script>
<style lang=""></style>
