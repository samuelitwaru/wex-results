<template>
  <div
    style="position: absolute; bottom: 0%; right: 0%"
    class="editBt"
    bordered
  >
    <q-btn color="primary" icon="camera_alt" @click="show = true" dense />
    <my-upload
      field="picture"
      v-model="show"
      :url="url"
      img-format="jpg"
      lang-type="en"
      no-circle
      no-square
      @crop-upload-success="uploadSuccess"
    ></my-upload>
  </div>
</template>

<script>
import myUpload from "vue-image-crop-upload";
export default {
  props: ["url"],
  components: { myUpload },
  data() {
    return {
      show: false,
    };
  },
  created() {},
  methods: {
    uploadSuccess(jsonData, field) {
      console.log("success");
      this.$emit("updateObject", jsonData);
    },
  },
};
</script>

<style>
.editBtn {
  display: none;
}

.hoverImg:hover + .editBtn,
.editBtn:hover {
  display: inline-block;
}
.vue-image-crop-upload .vicp-wrap {
  width: 90%;
}
</style>
