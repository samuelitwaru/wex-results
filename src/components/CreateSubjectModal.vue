<template>
  <div class="q-px-sm q-pt-sm">
    <q-item clickable @click="medium = true">
      <q-item-section>+ Add New</q-item-section>
    </q-item>
    <q-dialog v-model="medium">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">New Subject</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form
            @submit="createSubject"
            @reset="resetForm"
            class="q-gutter-md"
          >
            <q-input
              v-model="formData.code"
              type="code"
              label="Code"
              required
            />
            <q-input
              v-model="formData.name"
              type="text"
              label="Name"
              required
            />
            <q-input v-model="formData.abbr" type="text" label="Abbreviation" />
            <q-input
              v-model.number="formData.no_papers"
              type="number"
              min="1"
              max="5"
              label="Number of Papers"
            />

            <q-checkbox
              v-model="formData.is_selectable"
              label="Selectable Subject"
            />

            <div>
              <div>Level</div>
              <q-radio
                v-for="levelGroup in levelGroups"
                :key="levelGroup.id"
                v-model="formData.level_group"
                :val="levelGroup.id"
                :label="levelGroup.full"
                required
              />
            </div>

            <q-checkbox
              v-if="advancedLevelSelected"
              v-model="formData.is_subsidiary"
              label="Subsidiary"
            />

            <div>
              <div>Field</div>
              <q-radio
                v-model="formData.field"
                val="Arts"
                label="Arts"
                required
              />
              <q-radio
                v-model="formData.field"
                val="Science"
                label="Science"
                required
              />
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
  props: ["subjects"],
  setup() {
    return {
      medium: ref(false),
    };
  },
  data() {
    return {
      levelGroups: [],
      advancedLevelSelected: false,
      formData: {
        code: null,
        name: null,
        abbr: null,
        no_papers: null,
        field: null,
        level_group: null,
        created_from_system: false,
        is_selectable: false,
        is_subsidiary: false,
      },
    };
  },
  created() {
    this.getLevelGroups();
  },
  watch: {
    formData: {
      handler(val, oldVal) {
        var levelGroup = this.levelGroups.find(
          (lg) => lg.id == val.level_group
        );
        if (levelGroup?.name == "A") {
          this.advancedLevelSelected = true;
        } else {
          this.advancedLevelSelected = false;
          this.formData.is_subsidiary = false;
        }
      },
      deep: true,
    },
  },
  methods: {
    createSubject() {
      this.$setLoading(this, true);
      this.$api.post(`/subjects/`, this.formData).then((response) => {
        this.$emit("addSubject", response.data);
        this.medium = false;
        this.resetForm();
        this.$setLoading(this, false);
      });
    },

    getLevelGroups() {
      this.$api.get(`/level-groups/`).then((response) => {
        this.levelGroups = response.data;
      });
    },

    toggleSubsidiary(value, event) {
      console.log(value);
      this.levelGroups.find((lg) => lg.name == "A").id ==
        this.formData.level_group;
    },

    resetForm() {
      this.formData.code = null;
      this.formData.name = null;
      this.formData.abbr = null;
      this.formData.no_papers = null;
      this.formData.level_group = null;
      this.formData.field = null;
      this.formData.level_group = null;
      this.formData.created_from_system = false;
      this.formData.is_selectable = false;
      this.formData.is_subsidiary = false;
    },
  },
};
</script>

<style>
</style>
