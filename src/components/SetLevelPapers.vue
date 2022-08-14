<template>
  <div>
    <div class="q-pa-md">
      <strong>Subject Papers</strong>
      <q-markup-table flat bordered>
        <thead>
          <tr>
            <th class="text-left">Subject</th>
            <th class="text-right">Papers</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="subject in subjects" :key="subject.id">
            <td class="text-left">{{ subject.name }}</td>
            <td class="text-right">
              <div v-if="$userHasGroup('dos')" class="flex justify-end">
                <div
                  class="q-my-auto"
                  style="padding-right: 2px"
                  v-for="paper in subject.papers"
                  :key="paper.id"
                >
                  <input
                    type="checkbox"
                    @change="addOrRemovePaper"
                    :name="paper.id"
                    :id="`check${paper.id}`"
                    :checked="
                      level.papers.findIndex((item) => item == paper.id) != -1
                    "
                  />
                  <label :for="`check${paper.id}`"> P{{ paper.number }} </label>
                </div>
              </div>
              <div v-else class="flex justify-end">
                <div
                  class="q-my-auto"
                  style="padding-right: 2px"
                  v-for="paper in subject.papers"
                  :key="paper.id"
                >
                  <span
                    v-if="
                      level.papers.findIndex((item) => item == paper.id) != -1
                    "
                  >
                    <q-icon name="check" />
                  </span>
                  <label :for="`check${paper.id}`"> P{{ paper.number }} </label>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </div>
</template>

<script>
export default {
  props: ["level"],
  data() {
    return {
      subjects: [],
      levelPapers: [],
    };
  },

  created() {
    if (this.level) {
      this.getSubjects();
    }
  },

  watch: {
    level(newValue, oldValue) {
      if (this.level) {
        this.getSubjects();
      }
    },
  },

  methods: {
    getSubjects() {
      this.$api
        .get(`/subjects/?level_group=${this.level.level_group}`)
        .then((response) => {
          this.subjects = response.data;
        });
    },
    addOrRemovePaper(event) {
      if (event.target.checked) {
        this.$api
          .put(`/levels/${this.$route.params.id}/papers/add/`, [
            event.target.name,
          ])
          .then((response) => {
            this.$emit("updateLevel", response.data);
          });
      } else {
        // remove
        this.$api
          .put(`/levels/${this.$route.params.id}/papers/remove/`, [
            event.target.name,
          ])
          .then((response) => {
            this.$emit("updateLevel", response.data);
          });
      }
    },
  },
};
</script>

<style></style>
