<template>
  <q-page>
    <confirm-dialog ref="confirmDialog" />
    <q-card class="my-card no-borders" flat>
      <q-card-section horizontal>
        <q-card-section class="q-my-aut">
          <q-icon name="signal_cellular_alt" size="xl" />
        </q-card-section>
        <q-card-section class="q-pa-sm">
          <div class="text-h5">
            {{ level?.name }}
          </div>
          <div>{{ levelGroup?.full }} Level</div>
        </q-card-section>
      </q-card-section>
      <!-- <div class="q-pa-sm" align="right">
        <q-btn
          color="negative"
          label="Delete"
          no-caps
          flat
          dense
          @click="deleteLevel(level)"
        />
      </div> -->

      <q-separator />

      <set-level-papers
        :level="level"
        :subjects="subjects"
        @updateLevel="level = $event"
      />
    </q-card>
  </q-page>
</template>

<script>
import ConfirmDialog from "src/components/ConfirmDialog.vue";
import SetLevelPapers from "src/components/SetLevelPapers.vue";
import AddLevelPapersModal from "src/components/AddLevelPapersModal.vue";
export default {
  components: { ConfirmDialog, SetLevelPapers, AddLevelPapersModal },
  data() {
    return {
      level: null,
      levelGroup: null,
      teachers: [],
      subjects: [],
      papers: [],

      formData: {
        rank: null,
        name: null,
      },
    };
  },
  created() {
    this.getLevel();
    this.getSubjects();
    this.getPapers();
  },
  methods: {
    getLevel() {
      this.$setLoading(this, true);
      this.$api.get(`/levels/${this.$route.params.id}/`).then((response) => {
        this.level = response.data;
        this.formData.name = this.level?.name;
        this.formData.rank = this.level?.rank;
        this.formData.description = this.level?.description;
        this.$setLoading(this, false);
        this.getLevelGroup(this.level?.level_group);
      });
    },

    getLevelGroup(levelGroupId) {
      this.$api.get(`/level-groups/${levelGroupId}/`).then((response) => {
        this.levelGroup = response.data;
      });
    },

    addLevelSubjects() {
      this.$api
        .put(`/levels/${this.$route.params.id}/subjects/`, [1, 2])
        .then((response) => {
          this.level = response.data;
          console.log(response.data);
        });
    },

    getSubjects() {
      this.$api.get(`/subjects/`).then((response) => {
        this.subjects = response.data;
      });
    },

    getPapers() {
      this.$api.get(`/papers/`).then((response) => {
        this.papers = response.data;
      });
    },

    updateLevel() {
      this.$setLoading(this, true);
      this.$api
        .put(`/levels/${this.level?.id}/`, this.formData)
        .then((response) => {
          this.level = response.data;
          this.$setLoading(this, false);
        });
    },

    // deleteLevel(level) {
    //   this.$refs.confirmDialog
    //     .show({
    //       title: "Hello",
    //       message: `Are you sure you want to delete the level "${level?.name}"?`,
    //       okButton: "Yes, delete",
    //     })
    //     .then((res) => {
    //       if (res) {
    //         this.$setLoading(this, true);
    //         this.$api.delete(`/levels/${level?.id}/`).then((response) => {
    //           if (response.status == 204) {
    //             this.$setLoading(this, false);
    //             this.$router.push("/levels");
    //           }
    //         });
    //       }
    //     });
    // },
  },
};
</script>

<style>
</style>
