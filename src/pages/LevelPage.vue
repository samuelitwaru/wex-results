<template>
  <q-page>
    <confirm-dialog ref="confirmDialog" />
    <q-card class="my-card no-borders" flat>
      <q-card-section horizontal>
        <q-card-section class="q-pa-sm">
          <div class="text-h5">
            {{ level.name }}
          </div>
          <div>{{ level.description }}</div>
        </q-card-section>
      </q-card-section>
      <div class="q-pa-sm" align="right">
        <q-btn
          color="negative"
          label="Delete"
          no-caps
          dense
          @click="deleteLevel(level.id)"
        />
      </div>

      <q-separator />

      <div>
        <div class="q-pa-sm">
          <strong>Level</strong>
          <q-form @submit="updateLevel" class="q-gutter-md">
            <q-input
              v-model="formData.rank"
              type="number"
              label="Rank"
              required
            />
            <q-input
              v-model="formData.name"
              type="text"
              label="Name"
              required
            />

            <q-input
              v-model="formData.description"
              type="text"
              label="Description"
            />
            <div align="right">
              <q-btn label="update" type="submit" color="primary" />
            </div>
          </q-form>
        </div>
        <div class="q-pa-sm">
          <!-- <strong>Subjects</strong> -->
          <q-markup-table>
            <thead>
              <tr>
                <th class="text-left">Level Subjects</th>
                <th class="text-right">
                  <add-level-subjects-modal :level='level' :subjects='subjects' @updateLevel='level=$event' />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for='subject in level.subjects' :key='subject.id'>
                <td class="text-left">{{subject.name}}</td>
                <td class="text-right">{{subject.abbr }}</td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import ConfirmDialog from "src/components/ConfirmDialog.vue";
import AddLevelSubjectsModal from 'src/components/AddLevelSubjectsModal.vue';
export default {
  components: { ConfirmDialog, AddLevelSubjectsModal },
  data() {
    return {
      level: {},
      teachers: [],
      subjects: [],

      formData: {
        rank: "",
        name: "",
        description: "",
      },
    };
  },
  created() {
    this.getLevel();
    this.getSubjects()
  },
  methods: {
    getLevel() {
      this.$api.get(`/levels/${this.$route.params.id}/`).then((response) => {
        this.level = response.data;
        this.formData.name = this.level.name;
        this.formData.rank = this.level.rank;
        this.formData.description = this.level.description;
      });
    },

    addLevelSubjects() {
      this.$api.put(`/levels/${this.$route.params.id}/subjects/`, [1,2])
      .then((response) => {
        this.level = response.data
        console.log(response.data);
      });
    },

    getSubjects(){
      this.$api.get(`/subjects/`)
      .then((response) => {
        this.subjects = response.data
      });
    },

    updateLevel() {
      this.$api
        .put(`/levels/${this.level.id}/`, this.formData)
        .then((response) => {
          this.level = response.data;
        });
    },

    deleteLevel(id) {
      this.$refs.confirmDialog
        .show({
          title: "Hello",
          message: `Are you sure you want to delete the level "${id}"?`,
          okButton: "Yes, delete",
        })
        .then((res) => {
          if (res) {
            this.$api.delete(`/levels/${id}/`).then((response) => {
              if (response.status == 204) {
                this.$router.push("/levels");
              }
            });
          }
        });
    },
  },
};
</script>

<style>
</style>
