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

      <q-separator />

      <set-level-papers :level="level" @updateLevel="level = $event" />
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
      formData: {
        rank: null,
        name: null,
      },
    };
  },
  created() {
    this.getLevel();
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
  },
};
</script>

<style></style>
