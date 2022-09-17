<template>
  <div>
    <div v-if="levelGroupName == 'A'" class="q-pa-md">
      <div>Points</div>
      <div class="row">
        <div class="col q-mr-xs">
          <q-input
            v-model="formData.points__gte"
            type="number"
            label="From"
            required
          />
        </div>
        <div class="col q-ml-xs">
          <q-input
            v-model="formData.points__lte"
            type="number"
            label="To"
            required
          />
        </div>
      </div>
    </div>
    <div v-if="levelGroupName == 'O'" class="q-pa-md">
      <div>Aggregates</div>
      <div class="row">
        <div class="col q-mr-xs">
          <q-input
            v-model="formData.aggregates__gte"
            type="number"
            label="From"
            required
          />
        </div>
        <div class="col q-ml-xs">
          <q-input
            v-model="formData.aggregates__lte"
            type="number"
            label="To"
            required
          />
        </div>
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
  props: ["levelGroupName", "classRoom"],
  data() {
    return {
      formData: {
        points__gte: 0,
        points__lte: 0,
        aggregates__gte: 8,
        aggregates__lte: 72,
        student__class_room: this.$route.params.id,
        comment: "",
        overwrite: true,
      },
    };
  },
  created() {},
  computed: {
    isClassTeacher() {
      const currentTeacher = this.$getState("user")?.teacher_id;
      const classTeacher = this.classRoom?.teacher;
      return currentTeacher == classTeacher;
    },
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
        .put(`/reports/termly/comment/bulk/`, this.formData)
        .then((response) => {
          this.reports = response.data;
          this.resetForm();
          this.$setLoading(this, false);
        });
    },
    resetForm() {
      this.formData.points__gte = 0;
      this.formData.points__lte = 0;
      this.formData.aggregates__gte = 8;
      this.formData.aggregates__lte = 72;
      this.formData.student__class_room = this.$route.params.id;
      this.formData.comment = "";
      this.formData.overwrite = true;
    },
  },
};
</script>
<style lang=""></style>
