<template>
  <q-page class="flex-center">
    <confirm-dialog ref="confirmDialog" />
    <q-card class="my-card" flat v-if="entity">
      <q-card-section horizontal>
        <q-card-section style="min-width: 100px; height: 100px">
          <q-img
            v-if="entity.logo"
            class="rounded-borders hoverImg"
            :src="`${entity.logo}?r=${Math.random()}`"
            style="width: 100px; hieght: 100px"
            @error="imgLoadFailed"
          >
            <template v-slot:loading>
              <div>
                <q-spinner-ios />
              </div>
            </template>
          </q-img>
          <q-icon v-else name="image" size="xl" />
          <crop-image-uploader
            :url="`${$apiURL}/entities/${entity.id}/logo/upload/`"
            @updateObject="entity = $event"
            v-if="$userHasGroup('dos')"
          />
        </q-card-section>
        <q-card-section class="q-mx-sm">
          <div class="text-h5">{{ entity.name }}</div>
          <div class="text-caption">{{ entity.location }}</div>
          <div class="text-caption text-grey">{{ entity.telephone }}</div>
          <div class="text-caption text-grey">{{ entity.email }}</div>
        </q-card-section>
      </q-card-section>

      <q-separator />

      <div class="row q-pa-sm" v-if="periodLoaded">
        <div v-if="period.name" class="col-12">
          <q-card class="my-card" flat bordered>
            <q-card-section>
              <div class="text-h6">
                {{ period.name }}
                <small v-if="period.is_promotional">(Promotional)</small>
              </div>
              <div class="text-subtitle2">
                <div class="row">
                  <div class="col-4">
                    <small>Starts</small> <br />
                    <div>{{ period.start }}</div>
                  </div>
                  <div class="col-4">
                    <small>Ends</small> <br />
                    <div>{{ period.stop }}</div>
                  </div>
                  <div class="col-4">
                    <small>Duration</small> <br />
                    <div>{{ duration }}</div>
                  </div>
                </div>

                <q-card-section v-if="$userHasGroup('dos')" bordered>
                  <div class="row items-center justify-end q-gutter-sm">
                    <update-period-modal
                      :period="period"
                      @updatePeriod="period = $event"
                    />
                  </div>
                </q-card-section>

                <q-separator spaced />

                <div v-if="period.is_promotional && $userHasGroup('dos')">
                  <div class="row">
                    <div class="col-6">
                      Promotions
                      <q-chip
                        v-if="period.promotions_opened"
                        color="green"
                        text-color="white"
                        size="sm"
                        label="OPEN"
                      />
                      <q-chip
                        v-else
                        color="red"
                        text-color="white"
                        size="sm"
                        label="CLOSED"
                      />
                    </div>
                    <div
                      class="col-6"
                      v-if="period.is_promotional && $userHasGroup('dos')"
                    >
                      <div v-if="!period.promotions_opened">
                        <q-btn
                          dense
                          flat
                          color="primary"
                          icon="fa fa-unlock"
                          label="Open"
                          @click="openPromotions"
                        />
                      </div>
                      <div v-else>
                        <q-btn
                          dense
                          flat
                          color="primary"
                          icon="fa fa-lock"
                          label="Close"
                          @click="closePromotions"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <small class="text-grey">Pending</small> <br />
                      <div>{{ pendingPromotionCount }} promotion(s)</div>
                    </div>
                    <div class="col-6">
                      <small class="text-grey">Approved</small> <br />
                      <div>{{ approvedPromotionCount }} promotion(s)</div>
                    </div>
                  </div>
                </div>
                <q-separator spaced />
                <div class="text-h6">Registry</div>

                <div class="row">
                  <div class="col-6">
                    <small class="text-grey">Levels</small> <br />
                    <router-link to="levels">
                      <div>{{ levelCount }} level(s)</div>
                    </router-link>
                  </div>
                  <div class="col-6">
                    <small class="text-grey">Teachers</small> <br />
                    <router-link to="teachers">
                      <div>{{ teacherCount }} teacher(s)</div>
                    </router-link>
                  </div>
                </div>

                <div class="row">
                  <div class="col-6">
                    <small class="text-grey">Class rooms</small> <br />
                    <router-link to="class-rooms">
                      <div>{{ classRoomCount }} class room(s)</div>
                    </router-link>
                  </div>
                  <div class="col-6">
                    <small class="text-grey">Subjects</small> <br />
                    <router-link to="subjects">
                      <div>{{ subjectCount }} subject(s)</div>
                    </router-link>
                  </div>
                </div>

                <div class="row">
                  <div class="col-6">
                    <small class="text-grey">Students</small> <br />
                    <router-link to="students">
                      <div>{{ studentCount }} student(s)</div>
                    </router-link>
                  </div>
                  <div class="col-6">
                    <small class="text-grey">Grading systems</small> <br />
                    <router-link to="grading-systems">
                      <div>{{ gradingSystemCount }} grading system(s)</div>
                    </router-link>
                  </div>
                </div>

                <div class="row">
                  <div class="col-6">
                    <small class="text-grey">Assessments</small> <br />
                    <router-link to="assessments">
                      <div>{{ assessmentCount }} assessment(s)</div>
                    </router-link>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div v-else class="col-12" align="center">
          <p class="q-my-lg text-grey">No period was found</p>
          <create-period-modal @updatePeriod="period = $event" />
        </div>

        <div class="col-12"></div>
      </div>
    </q-card>
    <div>
      <q-inner-loading :showing="!entity">
        <q-spinner-ios size="50px" color="primary" />
      </q-inner-loading>
    </div>
  </q-page>
</template>

<script>
import ConfirmDialog from "src/components/ConfirmDialog.vue";
import CreatePeriodModal from "src/components/CreatePeriodModal.vue";
import CropImageUploader from "src/components/CropImageUploader.vue";
import ImageCropper from "src/components/ImageCropper.vue";
import UpdatePeriodModal from "src/components/UpdatePeriodModal.vue";
import UploadImageModal from "src/components/UploadImageModal.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    CreatePeriodModal,
    UpdatePeriodModal,
    UploadImageModal,
    ImageCropper,
    CropImageUploader,
    ConfirmDialog,
  },
  name: "IndexPage",

  data() {
    return {
      entity: null,
      period: null,
      levelCount: 0,
      teacherCount: 0,
      classRoomCount: 0,
      subjectCount: 0,
      studentCount: 0,
      gradingSystemCount: 0,
      pendingPromotionCount: 0,
      approvedPromotionCount: 0,
      assessmentCount: 0,
      periodLoaded: false,
    };
  },
  created() {
    this.getEntity();
    this.getLatestPeriod();
    this.getModelCounts();
    // this.$store.commit("results/updateLoadingState", false);
  },
  computed: {
    duration() {
      var diff = new Date(this.period.stop) - new Date(this.period.start);
      return `${diff / 1000 / 60 / 60 / 24} days`;
    },
  },
  methods: {
    getEntity() {
      this.$api.get(`/entities/`).then((response) => {
        if (response.data.length) {
          this.entity = response.data[0];
        }
      });
    },
    getLatestPeriod() {
      this.$api.get(`/periods/latest/`).then((response) => {
        this.period = response.data;
        this.periodLoaded = true;
        console.log(this.period.name);
        if (this.period.name) {
          this.getAssessmentCount();
        }
      });
    },
    getAssessmentCount() {
      this.$api
        .get(`/assessments/?period=${this.period.id}`)
        .then((response) => {
          this.assessmentCount = response.data.length;
        });
    },
    getModelCounts() {
      this.$api.get(`/levels/count/`).then((response) => {
        this.levelCount = response.data.count;
      });
      this.$api.get(`/teachers/count/`).then((response) => {
        this.teacherCount = response.data.count;
      });
      this.$api.get(`/class-rooms/count/`).then((response) => {
        this.classRoomCount = response.data.count;
      });
      this.$api.get(`/subjects/count/`).then((response) => {
        this.subjectCount = response.data.count;
      });
      this.$api.get(`/students/count/`).then((response) => {
        this.studentCount = response.data.count;
      });
      this.$api.get(`/grading-systems/count/`).then((response) => {
        this.gradingSystemCount = response.data.count;
      });
      this.getPromotionCounts();
    },
    imgLoadFailed(src) {
      this.entity.logo = null;
    },
    openPromotions() {
      this.$refs.confirmDialog
        .show({
          title: "Open Promotions",
          message: `Are you sure you want to open promotions?`,
          okButton: "Yes, open",
        })
        .then((res) => {
          if (res) {
            this.$setLoading(this, true);
            this.$api
              .put(`/periods/latest/open-promotions/`)
              .then((response) => {
                if (response) {
                  this.period = response.data;
                  this.$setLoading(this, false);
                }
              });
          }
        });
    },
    closePromotions() {
      this.$refs.confirmDialog
        .show({
          title: "Close Promotions",
          message: `Are you sure you want to close promotions?`,
          okButton: "Yes, close",
        })
        .then((res) => {
          if (res) {
            this.$setLoading(this, true);
            this.$api
              .put(`/periods/latest/close-promotions/`)
              .then((response) => {
                if (response) {
                  this.period = response.data;
                  this.$setLoading(this, false);
                }
              });
          }
        });
    },

    getPromotionCounts() {
      this.$api
        .get(`/reports/count/?promotion_added=yes&promo_is_approved=0`)
        .then((response) => {
          this.pendingPromotionCount = response.data.count;
        });

      this.$api
        .get(`/reports/count/?promotion_added=yes&promo_is_approved=1`)
        .then((response) => {
          this.approvedPromotionCount = response.data.count;
        });
    },
  },
});
</script>
