<template>
  <div>
    <q-btn color="primary" dense flat icon="edit" @click="medium = true" />
    <q-dialog v-model="medium">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">Update Period</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="updatePeriod" class="q-gutter-md">
            <q-input
              v-model="formData.name"
              type="text"
              label="Period Name"
              required
            />
            <div>
              <label class="text-grey-8">Start</label>
              <div
                class="row q-pa-xs rounded-borders"
                style="border: 1px solid #dddddd"
              >
                <div class="col-9 q-my-auto">
                  {{ formData.start }}
                </div>
                <div class="col-3" align="right">
                  <q-btn col="2" icon="event" round color="primary">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="formData.start"
                        mask="YYYY-MM-DD"
                        :title="formData.start"
                        subtitle="Start"
                        years-in-month-view
                      >
                        <div class="row items-center justify-end q-gutter-sm">
                          <q-btn
                            label="Cancel"
                            color="primary"
                            flat
                            v-close-popup
                          />
                          <q-btn
                            label="OK"
                            color="primary"
                            flat
                            v-close-popup
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-btn>
                </div>
              </div>
            </div>
            <div>
              <label class="text-grey-8">Stop</label>
              <div
                class="row q-pa-xs rounded-borders"
                style="border: 1px solid #dddddd"
              >
                <div class="col-9 q-my-auto">
                  {{ formData.stop }}
                </div>
                <div class="col-3" align="right">
                  <q-btn col="2" icon="event" round color="primary">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="formData.stop"
                        mask="YYYY-MM-DD"
                        :title="formData.stop"
                        subtitle="Date of Birth"
                        years-in-month-view
                      >
                        <div class="row items-center justify-end q-gutter-sm">
                          <q-btn
                            label="Cancel"
                            color="primary"
                            flat
                            v-close-popup
                          />
                          <q-btn
                            label="OK"
                            color="primary"
                            flat
                            v-close-popup
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-btn>
                </div>
              </div>
            </div>
            <q-checkbox
              v-model="formData.is_promotional"
              label="Promotional Period"
            />
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
export default {
  props: ["period"],
  data() {
    return {
      medium: false,
      formData: {
        name: this.period.name,
        start: this.period.start,
        stop: this.period.stop,
        is_promotional: this.period.is_promotional,
      },
    };
  },
  methods: {
    updatePeriod() {
      this.$api
        .put(`/periods/${this.period.id}/`, this.formData)
        .then((response) => {
          console.log(response.data);
          this.medium = false;
          this.$emit("updatePeriod", response.data);
        });
    },
  },
};
</script>

<style>
</style>
