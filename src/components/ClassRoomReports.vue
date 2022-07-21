<template>
  <q-page>
    <confirm-dialog ref="confirmDialog" />
    <div class="q-pa-sm">
      <div class="flex justify-between q-py-sm">
        <label class="text-h6">Reports</label>
        <download-class-room-report-form />
        <q-btn
          v-if="
            period?.is_promotional &&
            period?.promotions_opened &&
            isClassTeacher
          "
          :disable="formData.reports.length == 0"
          color="primary"
          label="Promote"
          icon-right="fa fa-award"
          dense
          flat
          @click="show = true"
        />
        <q-dialog v-model="show">
          <q-card>
            <q-card-section>
              <div class="text-h6">Promote</div>
              <p>
                {{ formData.reports.length }} students selected for promotion.
              </p>
              <div>
                <q-select
                  outlined
                  dense
                  v-model.number="formData2.next_class_room"
                  :options="classRooms"
                  label="Next Class Room"
                  :option-label="(item) => `${item.name} ${item.stream || ''}`"
                  option-value="id"
                  emit-value
                  map-options
                />
              </div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="primary" v-close-popup />
              <q-btn
                flat
                label="Submit"
                color="primary"
                v-close-popup
                @click="addPromotions"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>

      <div class="q-pb-sm">
        <filter-reports-form
          :class_room="parseInt($route.params.id)"
          @updateReports="reports = $event"
        />
      </div>

      <q-markup-table flat bordered separator="cell" square dense>
        <thead>
          <tr>
            <th class="text-right">
              <div class="flex justify-around items-center">
                <input
                  type="checkbox"
                  @change="addOrRemoveAllReports"
                  :checked="this.formData.reports.length == this.reports.length"
                />
              </div>
            </th>
            <th class="text-left">Student</th>
            <th class="text-right">Class Room</th>
            <th class="text-right">Result</th>
            <th class="text-right" colspan="2">Comments</th>
            <th class="text-right"></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="report in reports" :key="report.id">
            <tr>
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
              <td class="text-left" rowspan="2">
                {{ report.student.first_name }} {{ report.student.last_name }}
                {{ report.student.middle_name || "" }}
                <br />
                <div v-if="report.promo_to_class_room_detail?.id">
                  <q-icon name="fa fa-award" />
                  {{ report.promo_is_approved ? "APPROVED" : "PENDING" }}
                </div>
              </td>
              <td class="text-right" rowspan="2">
                {{ report.student.class_room_detail.name }}
                {{ report.student.class_room_detail.stream || "" }}
              </td>
              <td rowspan="2" class="q-my-auto">
                <span v-if="report.level.level_group_name == 'A'">
                  <q-btn
                    class="q-py-none"
                    outline
                    dense
                    :label="report.points"
                    style="width: 1.5rem"
                  />
                  Pts
                </span>
                <span v-else>
                  <q-btn
                    class="q-py-none"
                    outline
                    dense
                    :label="report.aggregates"
                    style="width: 1.5rem"
                  />
                  Aggr
                </span>
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
                      icon-right="fa fa-eye"
                      no-caps
                      flat
                      dense
                    />
                  </router-link>
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
          <div class="q-py-sm" v-if="isClassTeacher">
            <div class="text-subtitle1">Class Teacher Comment</div>
            <q-input
              outlined
              v-model="formData.class_teacher_comment"
              :disable="formData.reports.length == 0"
            />
          </div>
          <div class="q-py-sm" v-if="$userHasGroup('head_teacher')">
            <div class="text-subtitle1">Head Teacher Comment</div>
            <q-input
              outlined
              v-model="formData.head_teacher_comment"
              :disable="formData.reports.length == 0"
            />
          </div>

          <div v-if="$userHasGroup('head_teacher') || isClassTeacher">
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
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
import ConfirmDialog from "src/components/ConfirmDialog.vue";
import FilterReportsForm from "src/components/FilterReportsForm.vue";
import DownloadClassRoomReportForm from "./DownloadClassRoomReportForm.vue";
export default {
  components: { ConfirmDialog, FilterReportsForm, DownloadClassRoomReportForm },
  name: "ReportsPage",
  data() {
    return {
      reports: [],
      period: null,
      show: false,
      classRoom: null,
      formData: {
        class_teacher_comment: "",
        head_teacher_comment: "",
        overwrite: true,
        reports: [],
      },
      formData2: {
        next_class_room: null,
      },
    };
  },
  created() {
    this.getReports();
    this.getClassRoom();
    this.getLatestPeriod();
  },
  computed: {
    isClassTeacher() {
      const currentTeacher = this.$getState("user")?.teacher_id;
      const classTeacher = this.classRoom?.teacher;
      return currentTeacher == classTeacher;
    },
  },
  methods: {
    getReports() {
      this.$setLoading(this, true);
      this.$api
        .get(`/reports/?student__class_room=${this.$route.params.id}`)
        .then((response) => {
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

    getLatestPeriod() {
      this.$api.get(`/periods/latest/`).then((response) => {
        this.period = response.data;
        this.$setLoading(this, false);
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
      if (this.formData.class_teacher_comment == "")
        delete this.formData.class_teacher_comment;
      if (this.formData.head_teacher_comment == "")
        delete this.formData.head_teacher_comment;
      this.$api.put(`/reports/comment/`, this.formData).then((response) => {
        this.reports = response.data;
        this.resetForm();
        this.$setLoading(this, false);
      });
    },

    getClassRoom() {
      this.$api
        .get(`/class-rooms/${this.$route.params.id}/`)
        .then((response) => {
          this.classRoom = response.data;
          this.getClassRooms();
        });
    },

    getClassRooms() {
      this.$api
        .get(
          `/class-rooms/?level__level_group__name=${this.classRoom.level_detail.level_group_name}&level__gt=${this.classRoom.level}`
        )
        .then((response) => {
          this.classRooms = response.data;
        });
    },

    addPromotions() {
      this.$setLoading(this, true);
      const formData = {
        reports: this.formData.reports,
        promo_from_class_room: this.$route.params.id,
        promo_to_class_room: this.formData2.next_class_room,
      };
      this.$api.post(`reports/promotions/add/`, formData).then((response) => {
        if (response) {
          this.getReports();
          this.$setLoading(this, false);
        }
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

<style></style>
