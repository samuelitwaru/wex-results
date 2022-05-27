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
            <q-input
              v-model="formData.code"
              type="text"
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

          <q-table
            :rows="subject.papers"
            :columns="columns"
            row-key="id"
            :rows-per-page-options="[50]"
          >
            <template v-slot:body-cell-action="props">
              <q-td :props="props">
                <router-link class="text-white" :to="``">
                  <q-btn color="primary" icon-right="edit" no-caps flat dense />
                </router-link>
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
        <div class="col-12 q-pa-sm">
          <q-markup-table>
            <thead>
              <tr>
                <th class="text-left">Subject Teachers</th>
                <th class="text-right"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="teacher in subjectTeachers" :key="teacher.id">
                <td class="text-left">{{ teacher.teacher_detail.name }}</td>
                <td class="text-right">
                  {{ teacher.class_room_detail.name }}
                  {{ teacher.class_room_detail.stream }}
                </td>
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
import CreatePaperModal from "src/components/CreatePaperModal.vue";
export default {
  components: { ConfirmDialog, CreatePaperModal },
  data() {
    return {
      subject: {},
      classRooms: [],
      subjectTeachers: [],
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
        code: "",
        name: "",
        abbr: "",
      },
    };
  },
  created() {
    this.getSubject();
    this.getClassRooms();
    this.getSubjectTeachers();
  },
  methods: {
    getSubject() {
      this.$api.get(`/subjects/${this.$route.params.id}/`).then((response) => {
        this.subject = response.data;
        this.formData.code = this.subject.code;
        this.formData.name = this.subject.name;
        this.formData.abbr = this.subject.abbr;
      });
    },

    getSubjectTeachers() {
      this.$api
        .get(
          `/teacher-class-room-papers/?paper__subject=${this.$route.params.id}`
        )
        .then((response) => {
          this.subjectTeachers = response.data;
        });
    },

    updateSubject() {
      this.$api
        .put(`/subjects/${this.subject.id}/`, this.formData)
        .then((response) => {
          this.subject = response.data;
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
            this.$api.delete(`/subjects/${subject.id}/`).then((response) => {
              if (response.status == 204) {
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
  },
};
</script>

<style>
</style>
