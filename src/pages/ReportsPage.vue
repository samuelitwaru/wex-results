<template>
  <q-page>
    <confirm-dialog ref="confirmDialog" />
    <div class="q-pa-sm">
      <div class="flex justify-between q-py-sm">
        <label class="text-h4">Reports</label>
      </div>

      <div class="q-pb-sm">
        <filter-reports-form @updateReports="reports = $event" />
      </div>

      <q-markup-table flat bordered separator="cell" square dense>
        <thead>
          <tr>
            <th class="text-left">Student</th>
            <th class="text-right">Class Room</th>
            <th class="text-right">Result</th>
            <th class="text-right" colspan="2">Comments</th>
            <th class="text-right"></th>
            <th class="text-right">
              <div class="flex justify-around items-center">
                <input
                  type="checkbox"
                  @change="addOrRemoveAllReports"
                  :checked="this.formData.reports.length == this.reports.length"
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-for="report in reports" :key="report.id">
            <tr>
              <td class="text-left" rowspan="2">
                {{ report.student.first_name }} {{ report.student.last_name }}
                {{ report.student.middle_name || "" }}
              </td>
              <td class="text-right" rowspan="2">
                {{ report.student.class_room_detail.name }}
                {{ report.student.class_room_detail.stream || "" }}
              </td>
              <td rowspan="2">
                <q-list>
                  <q-item>
                    <q-item-section>
                      <q-item-label>Average Mark</q-item-label>
                    </q-item-section>

                    <q-item-section side>
                      <q-item-label>{{ report.average }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <!-- <q-item>
                    <q-item-section>
                      <q-item-label>Points</q-item-label>
                    </q-item-section>

                    <q-item-section side>
                      <q-item-label>{{ report.points }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label>Aggregates</q-item-label>
                    </q-item-section>

                    <q-item-section side>
                      <q-item-label>{{ report.aggregates }}</q-item-label>
                    </q-item-section>
                  </q-item> -->
                </q-list>
              </td>
              <td>CT</td>
              <td>{{ report.class_teacher_comment }}</td>
              <td rowspan="2">
                <div class="flex justify-around items-center">
                  <router-link
                    class="text-white"
                    :to="`/students/${report.student.id}/report`"
                  >
                    <q-btn
                      color="primary"
                      icon-right="book"
                      no-caps
                      flat
                      dense
                    />
                  </router-link>
                </div>
              </td>
              <td rowspan="2">
                <div class="flex justify-around items-center">
                  <input
                    type="checkbox"
                    :name="report.id"
                    :id="report.id"
                    @change="addOrRemoveReport"
                    :checked="
                      this.formData.reports.findIndex((i) => i == report.id) !=
                      -1
                    "
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td
                style="
                  border-left: 1px solid rgba(0, 0, 0, 0.12);
                  padding-left: 0.45rem;
                "
              >
                HT
              </td>
              <td>{{ report.head_teacher_comment }}</td>
            </tr>
          </template>
        </tbody>
      </q-markup-table>

      <div class="q-pt-sm" :class="{ disabled: formData.reports.length == 0 }">
        <q-form @submit="saveComment" @reset="resetForm" class="q-gutter-md">
          <div class="q-py-sm">
            <div class="text-subtitle1">Class Teacher Comment</div>
            <q-input
              outlined
              v-model="formData.class_teacher_comment"
              :disable="formData.reports.length == 0"
            />
          </div>
          <div class="q-py-sm">
            <div class="text-subtitle1">Head Teacher Comment</div>
            <q-input
              outlined
              v-model="formData.head_teacher_comment"
              :disable="formData.reports.length == 0"
            />
          </div>

          <q-checkbox
            v-model="formData.overwrite"
            label="Overwrite existing comments"
            :disable="formData.reports.length == 0"
          />

          <div class="q-pt-s" align="right">
            <q-btn
              color="primary"
              label="submit"
              type="submit"
              :disable="formData.reports.length == 0"
            />
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
import ConfirmDialog from "src/components/ConfirmDialog.vue";
import FilterReportsForm from "src/components/FilterReportsForm.vue";
export default {
  components: { ConfirmDialog, FilterReportsForm },
  name: "ReportsPage",
  data() {
    return {
      reports: [],
      CTOverwrites: 0,
      HTOverwrites: 0,
      formData: {
        class_teacher_comment: "",
        head_teacher_comment: "",
        overwrite: false,
        reports: [],
      },
    };
  },
  created() {
    this.getReports();
  },
  methods: {
    getReports() {
      this.$setLoading(this, true);
      this.$api.get("/reports/").then((response) => {
        this.reports = response.data;
        this.$setLoading(this, false);
        this.getComputedReports();
      });
    },

    getComputedReports() {
      this.reports.forEach((report) => {
        this.$api
          .get(`/reports/computed/${report.student.id}/`)
          .then((reponse) => {
            report.average = reponse.data.average;
            report.points = reponse.data.points;
            report.aggregates = reponse.data.aggregates;
          });
      });
    },

    addOrRemoveReport(event) {
      if (event.target.checked) {
        this.formData.reports.push(event.target.name);
      } else {
        this.formData.reports = this.formData.reports.filter(
          (id) => id != event.target.name
        );
      }
    },

    addOrRemoveAllReports(event) {
      if (event.target.checked) {
        this.formData.reports = this.reports.map((report) => report.id);
      } else {
        this.formData.reports = [];
      }
    },

    saveComment() {
      this.$setLoading(this, true);
      this.$api.put(`/reports/comment/`, this.formData).then((response) => {
        this.reports = response.data;
        this.resetForm();
        this.$setLoading(this, false);
      });
    },

    resetForm() {
      this.formData.reports = [];
      this.formData.class_teacher_comment = "";
      this.formData.head_teacher_comment = "";
      this.formData.overwrite = false;
    },
  },
};
</script>

<style>
</style>