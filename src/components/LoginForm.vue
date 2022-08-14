<template>
  <q-form @submit="login" @reset="resetForm" class="q-gutter-md">
    <q-input
      v-model="formData.username"
      type="text"
      label="Email or Telephone number"
      hint="e.g example@gmail.com or 0781902516"
      required
    />
    <q-input
      v-model="formData.password"
      type="password"
      label="Password"
      required
    />
    <div class="flex justify-between">
      <forgot-password-form-modal />
      <q-btn
        style="display: block"
        label="Signin"
        type="submit"
        color="primary"
      />
    </div>
  </q-form>
</template>

<script>
import ForgotPasswordFormModal from "src/components/ForgotPasswordFormModal.vue";
export default {
  components: { ForgotPasswordFormModal },
  data() {
    return {
      indexRoutes: {
        dos: "/",
        head_teacher: "/",
        teacher: "/class-rooms",
      },
      formData: {
        username: null,
        password: null,
      },
    };
  },

  methods: {
    login() {
      this.$setLoading(this, true);
      this.$api.post(`/auth/login/`, this.formData).then((response) => {
        if (response) {
          const acceptedGoups = ["dos", "head_teacher", "teacher"];
          const user = response.data.user;
          const token = response.data.token;
          const groups = user.groups;
          const userAccepted = groups.some((group) =>
            acceptedGoups.includes(group)
          );
          if (!userAccepted) {
            this.$store.dispatch("results/signOut");
            window.location = "/login";
            // return;
          } else {
            this.$store.commit("results/setToken", token);
            this.$store.commit("results/setUser", user);
            this.$store.commit("results/setGroups", groups);
            this.$router.push(this.indexRoutes[response.data.user.groups[0]]);
            this.resetForm();
          }
        }
        this.$setLoading(this, false);
      });
    },

    resetForm() {
      this.formData.username = null;
      this.formData.password = null;
    },
  },
};
</script>

<style></style>
