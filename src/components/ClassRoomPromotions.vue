<template>
  <q-page>
    <div class="q-pa-sm">
      <div class="flex justify-between q-py-sm">
        <label class="text-h6">Promotions</label>
        <div
          v-if="
            period?.is_promotional &&
            period?.promotions_opened &&
            $userHasGroup('dos')
          "
        >
          <div v-if="tab == 'approved'">
            <q-btn
              v-if="period?.is_promotional && period?.promotions_opened"
              :disable="formData.promotions.length == 0"
              color="red"
              label="Reject"
              icon-right="close"
              dense
              flat
              @click="showReject = true"
            />
            <q-dialog v-model="showReject">
              <q-card>
                <q-card-section>
                  <div class="text-h6">Reject</div>
                  <p>
                    Rejecting the promotion of
                    {{ formData.promotions.length }} students?
                  </p>
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn flat label="Cancel" color="primary" v-close-popup />
                  <q-btn
                    flat
                    label="Confirm"
                    color="primary"
                    v-close-popup
                    @click="rejectPromotions"
                  />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>
          <div v-if="tab == 'pending'">
            <q-btn
              :disable="formData.promotions.length == 0"
              color="primary"
              label="Approve"
              icon-right="check"
              dense
              flat
              @click="show = true"
            />
            <q-dialog v-model="show">
              <q-card>
                <q-card-section>
                  <div class="text-h6">Approve</div>
                  <p>
                    Approving the promotion of
                    {{ formData.promotions.length }} students?
                  </p>
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn flat label="Cancel" color="primary" v-close-popup />
                  <q-btn
                    flat
                    label="Confirm"
                    color="primary"
                    v-close-popup
                    @click="approvePromotions"
                  />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>
        </div>
      </div>

      <q-card flat bordered>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="pending" label="PENDING">
            <q-badge v-if="pendingPromotions.length" color="grey" floating>{{
              pendingPromotions.length
            }}</q-badge>
          </q-tab>
          <q-tab name="approved" label="APPROVED">
            <q-badge v-if="approvedPromotions.length" color="green" floating>{{
              approvedPromotions.length
            }}</q-badge>
          </q-tab>
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated style="min-height: 300px">
          <q-tab-panel name="pending" class="q-pa-none">
            <q-markup-table flat v-if="pendingPromotions.length">
              <thead>
                <tr>
                  <th class="text-right">
                    <div class="flex justify-around items-center">
                      <input
                        type="checkbox"
                        @change="addOrRemoveAllPromotions"
                        :checked="
                          this.formData.promotions.length ==
                          this.pendingPromotions.length
                        "
                      />
                    </div>
                  </th>
                  <th class="text-left">STUDENT</th>
                  <th class="text-left">COMMENT</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="promo in pendingPromotions" :key="promo.id">
                  <td>
                    <div class="flex justify-around items-center">
                      <input
                        type="checkbox"
                        :name="promo.id"
                        :id="promo.id"
                        @change="addOrRemovePromotion"
                        :checked="
                          this.formData.promotions.findIndex(
                            (i) => i == promo.id
                          ) != -1
                        "
                      />
                    </div>
                  </td>
                  <td class="text-left">
                    {{ promo.student.first_name }}
                    {{ promo.student.last_name }}
                    {{ promo.student.middle_name }}
                  </td>
                  <td class="text-left text-primary">
                    Promoted to
                    {{ promo.promo_to_class_room_detail.name }}
                    {{ promo.promo_to_class_room_detail.stream || "" }}
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
            <p v-else class="text-center text-grey q-my-lg">
              No Approved Promotions
            </p>
          </q-tab-panel>

          <q-tab-panel name="approved" class="q-pa-none">
            <q-markup-table flat v-if="this.approvedPromotions.length">
              <thead>
                <tr>
                  <th class="text-right">
                    <div class="flex justify-around items-center">
                      <input
                        type="checkbox"
                        @change="addOrRemoveAllPromotions"
                        :checked="
                          this.formData.promotions.length ==
                          this.approvedPromotions.length
                        "
                      />
                    </div>
                  </th>
                  <th class="text-left">STUDENT</th>
                  <th class="text-left">COMMENT</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="promo in approvedPromotions" :key="promo.id">
                  <td>
                    <div class="flex justify-around items-center">
                      <input
                        type="checkbox"
                        :name="promo.id"
                        :id="promo.id"
                        @change="addOrRemovePromotion"
                        :checked="
                          this.formData.promotions.findIndex(
                            (i) => i == promo.id
                          ) != -1
                        "
                      />
                    </div>
                  </td>
                  <td class="text-left">
                    {{ promo.student.first_name }}
                    {{ promo.student.last_name }}
                    {{ promo.student.middle_name }}
                  </td>
                  <td class="text-left text-primary">
                    Promoted to
                    {{ promo.promo_to_class_room_detail.name }}
                    {{ promo.promo_to_class_room_detail.stream || "" }}
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
            <p v-else class="text-center text-grey q-my-lg">
              No Approved Promotions
            </p>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PromotionsPage",
  data() {
    return {
      tab: "pending",
      pendingPromotions: [],
      approvedPromotions: [],
      period: null,
      show: false,
      showReject: false,
      formData: {
        promotions: [],
      },
    };
  },
  created() {
    this.getPromotions();
    this.getLatestPeriod();
  },
  computed: {
    // isClassTeacher() {
    //   const currentTeacher = this.$getState("user")?.teacher_id;
    //   const classTeacher = this.classRoom?.teacher;
    //   return currentTeacher == classTeacher;
    // },
  },
  methods: {
    getPromotions() {
      this.$setLoading(this, true);
      this.$api
        .get(
          `/class-rooms/${this.$route.params.id}/promotions/?promo_is_approved=0`
        )
        .then((response) => {
          this.pendingPromotions = response.data;
          this.$setLoading(this, false);
        });

      this.$api
        .get(
          `/class-rooms/${this.$route.params.id}/promotions/?promo_is_approved=1`
        )
        .then((response) => {
          this.approvedPromotions = response.data;
          this.$setLoading(this, false);
        });
    },

    getLatestPeriod() {
      this.$api.get(`/periods/latest/`).then((response) => {
        this.period = response.data;
      });
    },

    approvePromotions() {
      console.log(this.formData);
      // return;
      this.$api
        .put(
          `/class-rooms/${this.$route.params.id}/promotions/approve/`,
          this.formData
        )
        .then((response) => {
          if (response) {
            this.getPromotions();
            this.formData.promotions = [];
          }
        });
    },

    rejectPromotions() {
      this.$api
        .put(
          `/class-rooms/${this.$route.params.id}/promotions/reject/`,
          this.formData
        )
        .then((response) => {
          if (response) {
            this.getPromotions();
            this.formData.promotions = [];
          }
        });
    },

    addOrRemovePromotion(event) {
      if (event.target.checked) {
        this.formData.promotions.push(event.target.name);
      } else {
        this.formData.promotions = this.formData.promotions.filter(
          (id) => id != event.target.name
        );
      }
    },

    addOrRemoveAllPromotions(event) {
      if (event.target.checked) {
        if (this.tab == "pending") {
          this.formData.promotions = this.pendingPromotions.map(
            (report) => report.id
          );
        } else if (this.tab == "approved") {
          this.formData.promotions = this.approvedPromotions.map(
            (report) => report.id
          );
        }
      } else {
        this.formData.promotions = [];
      }
    },
  },
};
</script>

<style></style>
