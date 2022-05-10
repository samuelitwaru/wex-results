<template>
  <q-page class="flex-center">
    <q-card class="my-card" flat>
      <q-card-section horizontal>
        <q-card-section class="col-5 flex flex-center">
          <q-img
            class="rounded-borders"
            src="~/assets/img/string.png"
            :ratio="1"
            style="width: 120px; hieght: 120px"
          />
        </q-card-section>
        <q-card-section class="q-pt-xs">
          <div class="text-overline">Results App</div>
          <div class="text-h5 q-mt-sm q-mb-xs">Entity</div>
          <div class="text-caption text-grey">Location</div>
        </q-card-section>
      </q-card-section>

      <q-separator />

      <q-card-actions> </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      formData: {
        text: "Samuel",
      },
    };
  },
  methods: {
    onSubmit() {
      alert(this.formData.text);
    },
  },
});
</script>
