<template>
  <q-page>
    <confirm-dialog ref="confirmDialog" />
    <q-card class="my-card no-borders" flat>
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="text-h5 q-mt-sm q-mb-xs">
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
              type="text"
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
      </div>
    </q-card>
  </q-page>
</template>

<script>
import ConfirmDialog from "src/components/ConfirmDialog.vue";
export default {
  components: { ConfirmDialog },
  data() {
    return {
      level: {},
      levels: [],
      teachers: [],

      formData: {
        rank: "",
        name: "",
        description: "",
      },
    };
  },
  created() {
    this.getLevel();
  },
  methods: {
    getLevel() {
      this.$api.get(`/levels/${this.$route.params.id}/`).then((response) => {
        this.level = response.data;
        console.log(this.level);
        this.formData.name = this.level.name;
        this.formData.rank = this.level.rank;
        this.formData.description = this.level.description;
      });
    },

    updateLevel() {
      console.log(this.formData);
      this.$api
        .put(`/levels/${this.level.id}/`, this.formData)
        .then((response) => {
          this.level = response.data;
          console.log(response.data);
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

    getLevels() {
      this.$api.get(`/levels/`).then((response) => {
        this.classRooms = response.data;
      });
    },
  },
};
</script>

<style>
</style>