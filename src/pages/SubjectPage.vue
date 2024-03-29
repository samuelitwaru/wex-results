<template>
  <q-page>
    <confirm-dialog ref="confirmDialog" />
    <q-card class="my-card no-borders" flat>
      <q-card-section horizontal>
        <q-card-section class="q-my-aut">
          <q-icon name="book" size="xl" />
        </q-card-section>
        <q-card-section class="q-pa-sm">
          <div class="text-h5">{{ subject.code }} - {{ subject.name }}</div>
          <div class="subtitle q-mt-sm q-mb-xs">
            {{ subject.abbr }}
          </div>
        </q-card-section>
      </q-card-section>

      <div class="q-pa-sm" align="right">
        <q-btn
          color="negative"
          label="Delete"
          no-caps
          flat
          dense
          @click="deleteSubject(subject)"
        />
      </div>

      <q-separator />

      <div class="row">
        <div class="col-12 q-pa-sm">
          <strong>Subject</strong>
          <q-form @submit="updateSubject" class="q-gutter-md">
            <div class="row">
              <div class="col q-mr-xs">
                <q-input
                  v-model="formData.code"
                  type="code"
                  label="Code"
                  required
                />
              </div>
              <div class="col q-ml-xs">
                <q-input
                  v-model="formData.name"
                  type="text"
                  label="Name"
                  required
                />
              </div>
            </div>

            <div class="row">
              <div class="col q-mr-xs">
                <q-input
                  v-model="formData.abbr"
                  type="text"
                  label="Abbreviation"
                />
              </div>
              <div class="col q-mr-xs q-my-auto">
                <q-checkbox
                  v-model="formData.is_selectable"
                  label="Selectable Subject"
                />
              </div>
            </div>

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

            <div align="right">
              <q-btn label="update" type="submit" color="primary" />
            </div>
          </q-form>
        </div>
        <div class="col-12 q-pa-sm">
          <div class="flex justify-between q-py-sm">
            <strong class="q-my-auto">Papers</strong>
            <create-paper-modal
              :subject="subject"
              @addPaper="subject.papers.push($event)"
            />
          </div>

          <update-paper-modal
            ref="updatePaperModal"
            :subject="subject"
            :paper="paper"
            @updatePaper="
              subject.papers[
                subject.papers.findIndex((p) => p.id == $event.id)
              ] = $event
            "
          />

          <q-table
            :rows="subject.papers"
            :columns="columns"
            row-key="id"
            :rows-per-page-options="[50]"
          >
            <template v-slot:body-cell-action="props">
              <q-td :props="props">
                <q-btn
                  dense
                  flat
                  icon="edit"
                  color="primary"
                  @click="showUpdatePaperModal(props.row)"
                />
                <q-btn
                  color="negative"
                  icon-right="delete"
                  no-caps
                  flat
                  dense
                  @click="deletePaper(props.row)"
                />
              </q-td>
            </template>
          </q-table>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import ConfirmDialog from "src/components/ConfirmDialog.vue";
import CreatePaperModal from "src/components/CreatePaperModal.vue";
import UpdatePaperModal from "src/components/UpdatePaperModal.vue";
export default {
  components: { ConfirmDialog, CreatePaperModal, UpdatePaperModal },
  data() {
    return {
      subject: {},
      classRooms: [],
      paper: null,
      // subjectTeachers: [],
      advancedLevelSelected: null,
      levelGroups: [],
      columns: [
        { name: "number", label: "Number", field: "number", align: "left" },
        {
          name: "description",
          label: "Description",
          field: "description",
          align: "left",
        },
        { name: "action", label: "Action", field: "action", align: "right" },
      ],
      formData: {
        code: null,
        name: null,
        abbr: null,
        field: null,
        level_group: null,
        created_from_system: false,
        is_selectable: false,
        is_subsidiary: false,
      },
    };
  },
  created() {
    this.getSubject();
    this.getLevelGroups();
    this.getClassRooms();
    // this.getSubjectTeachers();
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
    getSubject() {
      this.$setLoading(this, true);
      this.$api.get(`/subjects/${this.$route.params.id}/`).then((response) => {
        this.subject = response.data;
        this.formData.code = this.subject.code;
        this.formData.name = this.subject.name;
        this.formData.abbr = this.subject.abbr;
        this.formData.field = this.subject.field;
        this.formData.level_group = this.subject.level_group;
        this.formData.is_selectable = this.subject.is_selectable;
        this.formData.is_subsidiary = this.subject.is_subsidiary;
        this.$setLoading(this, false);
      });
    },

    getLevelGroups() {
      this.$api.get(`/level-groups/`).then((response) => {
        this.levelGroups = response.data;
      });
    },

    // getSubjectTeachers() {
    //   this.$api
    //     .get(`/paper-allocations/?paper__subject=${this.$route.params.id}`)
    //     .then((response) => {
    //       console.log(response.data);
    //       this.subjectTeachers = response.data;
    //     });
    // },

    updateSubject() {
      console.log(this.formData);
      this.$setLoading(this, true);
      this.$api
        .put(`/subjects/${this.subject.id}/`, this.formData)
        .then((response) => {
          this.subject = response.data;
          this.$setLoading(this, false);
        });
    },

    deleteSubject(subject) {
      this.$refs.confirmDialog
        .show({
          title: "Hello",
          message: `Are you sure you want to delete the subject "${subject.name}"?`,
          okButton: "Yes, delete",
        })
        .then((res) => {
          if (res) {
            this.$setLoading(this, true);
            this.$api.delete(`/subjects/${subject.id}/`).then((response) => {
              if (response.status == 204) {
                this.$setLoading(this, false);
                this.$router.push("/subjects");
              }
            });
          }
        });
    },

    deletePaper(paper) {
      this.$refs.confirmDialog
        .show({
          title: "Delete Paper",
          message: `Are you sure you want to delete the paper "${paper.number}"?`,
          okButton: "Yes, delete",
        })
        .then((res) => {
          if (res) {
            this.$api.delete(`/papers/${paper.id}/`).then((response) => {
              if (response.status == 204) {
                this.subject.papers = this.subject.papers.filter(
                  (item) => item.id != paper.id
                );
              }
            });
          }
        });
    },

    getClassRooms() {
      this.$api.get(`/class-rooms/`).then((response) => {
        this.classRooms = response.data;
      });
    },

    showUpdatePaperModal(paper) {
      this.paper = paper;
      this.$refs.updatePaperModal.show = true;
    },
  },
};
</script>

<style></style>
