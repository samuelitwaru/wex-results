<template>
  <q-page>
    <confirm-dialog ref="confirmDialog" />
    <q-card class="my-card no-borders" flat>
      <q-card-section horizontal>
        <q-card-section class="q-my-aut">
          <q-icon name="home" size="xl" />
        </q-card-section>
        <q-card-section class="q-pt-xs">
          <div class="text-h5 q-mt-sm q-mb-xs">
            {{ class_room.name }}
          </div>
          <div>{{ class_room.stream }}</div>
          <div v-if="class_room.teacher">
            {{ class_room.teacher_detail.name }}
          </div>
        </q-card-section>
      </q-card-section>

      <div class="q-pa-sm" align="right">
        <q-btn
          v-if="$userHasGroup('dos')"
          color="negative"
          label="Delete"
          no-caps
          flat
          dense
          @click="deleteClassRoom(class_room)"
        />
      </div>

      <q-separator />

      <div class="q-pa-xs" align="center">
        <span v-if="$userHasAnyGroups(['dos', 'head_teacher'])">
          <router-link
            :to="`/class-rooms/${$route.params.id}`"
            v-if="page != 'class-room'"
          >
            <q-btn
              label="Class Room"
              icon="home"
              flat
              :disable="page == 'class-room'"
            />
          </router-link>
          <q-btn v-else label="Class Room" icon="home" flat disable />
        </span>

        <router-link
          :to="`/class-rooms/${$route.params.id}/students`"
          v-if="page != 'students'"
        >
          <q-btn label="Students" icon="fa fa-users" flat />
        </router-link>
        <q-btn v-else label="Students" icon="fa fa-users" flat disable />

        <router-link
          :to="`/class-rooms/${$route.params.id}/reports`"
          v-if="page != 'reports'"
        >
          <q-btn label="Reports" icon="book" flat />
        </router-link>
        <q-btn v-else label="Reports" icon="book" flat disable />

        <span v-if="period?.is_promotional && period.promotions_opened">
          <router-link
            :to="`/class-rooms/${$route.params.id}/promotions`"
            v-if="page != 'promotions'"
          >
            <q-btn label="Promotions" icon="fa fa-award" flat />
          </router-link>
          <q-btn v-else label="Promotions" icon="fa fa-award" flat disable />
        </span>
      </div>

      <router-view @updateClassRoom="class_room = $event"> </router-view>
    </q-card>
  </q-page>
</template>

<script>
import ConfirmDialog from "src/components/ConfirmDialog.vue";
export default {
  components: { ConfirmDialog },
  data() {
    return {
      class_room: {},
      period: null,
    };
  },
  created() {
    this.getClassRoom();
    this.getLatestPeriod();
  },
  computed: {
    page() {
      if (this.$route.path.includes("students")) return "students";
      else if (this.$route.path.includes("reports")) return "reports";
      else if (this.$route.path.includes("promotions")) return "promotions";
      else return "class-room";
    },
  },
  methods: {
    getClassRoom() {
      this.$setLoading(this, true);
      this.$api
        .get(`/class-rooms/${this.$route.params.id}/`)
        .then((response) => {
          this.class_room = response.data;
          this.$setLoading(this, false);
        });
    },

    getLatestPeriod() {
      this.$api.get(`/periods/latest/`).then((response) => {
        this.period = response.data;
        this.$setLoading(this, false);
      });
    },

    deleteClassRoom(classRoom) {
      this.$refs.confirmDialog
        .show({
          title: "Delete Class Room",
          message: `Are you sure you want to delete the class room "${
            classRoom.name
          } ${classRoom.stream || ""}"?`,
          okButton: "Yes, delete",
        })
        .then((res) => {
          if (res) {
            this.$setLoading(this, true);
            this.$api
              .delete(`/class-rooms/${classRoom.id}/`)
              .then((response) => {
                if (response.status == 204) {
                  this.$setLoading(this, false);
                  this.$router.push("/class-rooms");
                }
              });
          }
        });
    },
  },
};
</script>

<style></style>
