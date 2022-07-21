<template>
  <q-page padding>
    <div class="text-h6" align="center">
      <q-img
        src="~/assets/string.png"
        :ratio="1"
        style="width: 120px; hieght: 120px"
        spinner-color="primary"
        spinner-size="82px"
      />
      <div class="text-h6">Login Here</div>
    </div>
    <div class="flex justify-evenly items-center">
      <div>
        <q-card class="my-card" style="min-width: 300px">
          <q-card-section>
            <login-form />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import LoginForm from "src/components/LoginForm.vue";
export default {
  components: { LoginForm },
  // name: 'PageName',
};
</script>
