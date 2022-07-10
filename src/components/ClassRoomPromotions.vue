<template>
  <q-page>
    <div class="q-pa-sm">
      <div class="flex justify-between q-py-sm">
        <label class="text-h6">Promotions</label>
        <q-btn
          v-if="period?.is_promotional && period?.promotions_opened"
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

      <q-markup-table flat bordered>
        <thead>
          <tr>
            <th class="text-right">
              <div class="flex justify-around items-center">
                <input
                  type="checkbox"
                  @change="addOrRemoveAllPromotions"
                  :checked="
                    this.formData.promotions.length == this.promotions.length
                  "
                />
              </div>
            </th>
            <th class="text-left">Student</th>
            <th class="text-left">From</th>
            <th class="text-left">To</th>
            <th class="text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="promo in promotions" :key="promo.id">
            <td>
              <div class="flex justify-around items-center">
                <input
                  type="checkbox"
                  :name="promo.id"
                  :id="promo.id"
                  @change="addOrRemovePromotion"
                  :checked="
                    this.formData.promotions.findIndex((i) => i == promo.id) !=
                    -1
                  "
                />
              </div>
            </td>
            <td class="text-left">
              {{ promo.student_detail.first_name }}
              {{ promo.student_detail.last_name }}
              {{ promo.student_detail.middle_name }}
            </td>
            <td class="text-left">
              {{ promo.current_class_room_detail.name }}
              {{ promo.current_class_room_detail.stream || "" }}
            </td>
            <td class="text-left">
              {{ promo.next_class_room_detail.name }}
              {{ promo.next_class_room_detail.stream || "" }}
            </td>
            <td class="text-left">{{ promo.status }}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PromotionsPage",
  data() {
    return {
      promotions: [],
      period: null,
      show: false,
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
        .get(`/class-rooms/${this.$route.params.id}/promotions/`)
        .then((response) => {
          this.promotions = response.data;
          this.$setLoading(this, false);
        });
    },

    getLatestPeriod() {
      this.$api.get(`/periods/latest/`).then((response) => {
        this.period = response.data;
      });
    },

    approvePromotions() {
      this.$api.put(`/promotions/approve/`, this.formData).then((response) => {
        if (response) {
          this.getPromotions();
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
        this.formData.promotions = this.promotions.map((report) => report.id);
      } else {
        this.formData.promotions = [];
      }
    },
  },
};
</script>

<style>
</style>
