<template>
  <div>
    <q-btn icon="edit" color="primary" flat dense @click="modal = true" />
    <q-dialog v-model="modal">
      <q-card style="width: 700px; max-width: 80vw">
        <div class="q-pa-md">
          <strong>Select Papers</strong>
          <q-markup-table flat bordered>
            <thead>
              <tr>
                <th class="text-left">Paper</th>
                <th class="text-right"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="paper in papers" :key="paper.id">
                <td class="text-left">
                  {{ paper.subject_name }}/{{ paper.number }}
                </td>
                <td class="text-right">
                  <input
                    type="checkbox"
                    @change="addOrRemovePaper"
                    :name="paper.id"
                    :checked="
                      level.papers.findIndex((item) => item.id == paper.id) !=
                      -1
                    "
                  />
                </td>
              </tr>
            </tbody>
          </q-markup-table>

          <div class="q-pt-md" align="right">
            <q-btn label="OK" @click="modal = false" color="primary" />
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: ["papers", "level"],
  data() {
    return {
      modal: false,
    };
  },

  created() {},

  methods: {
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

<style>
</style>
