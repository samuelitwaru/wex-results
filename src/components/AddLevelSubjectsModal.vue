<template>
  <div>
    <q-btn
      icon="add"
      color="primary"
      flat
      dense
      @click="modal = true"
    />
    <q-dialog v-model="modal">
      <q-card style="width: 700px; max-width: 80vw">
        <div class="q-pa-md">
          <strong>Select Subjects</strong>
          <q-markup-table flat bordered>
            <thead>
              <tr>
                <th class="text-left">Subject</th>
                <th class="text-right"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for='subject in subjects' :key=subject.id>
                <td class="text-left">{{subject.name}}</td>
                <td class="text-right">
                  <input type="checkbox" @change="addOrRemoveSubject" :name='subject.id' :checked='level.subjects.findIndex(item=>item.id==subject.id) != -1' />
                </td>
              </tr>
            </tbody>
          </q-markup-table>

          <div class='q-pt-md' align='right'>
            <q-btn label="OK" @click='modal=false' color="primary"/>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: ['subjects', 'level'],
  data() {
    return {
      modal: false,
      levelSubjects: []
    }
  },

  created () {
  },

  methods: {
    addOrRemoveSubject(event) {
      console.log(event.target.name);
      if (event.target.checked){
        this.$api.put(`/levels/${this.$route.params.id}/subjects/add/`, [event.target.name])
        .then((response) => {
          this.$emit('updateLevel', response.data)
        });
      }else{
        // remove
        this.$api.put(`/levels/${this.$route.params.id}/subjects/remove/`, [event.target.name])
        .then((response) => {
          this.$emit('updateLevel', response.data)
        });
      }
    }
  },
}
</script>

<style>

</style>
