<template>
  <div>
    <q-btn
      label="New Period"
      icon="add"
      color="primary"
      @click="medium = true"
    />
    <q-dialog v-model="medium">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">New Period</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="createPeriod" @reset="resetForm" class="q-gutter-md">
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
  data() {
    return {
      medium: false,
      formData: {
        name: null,
        start: null,
        stop: null,
      },
    };
  },
  methods: {
    createPeriod() {
      this.$api.post(`/periods/`, this.formData).then((response) => {
        // this.periods = response.data;
        console.log(response.data);
        this.medium = false;
        this.resetForm();
      });
    },
    resetForm() {
      this.formData.name = null;
      this.formData.start = null;
      this.formData.stop = null;
    },
  },
};
</script>

<style>
</style>
