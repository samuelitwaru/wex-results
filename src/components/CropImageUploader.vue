<template>
  <div
    style="position: absolute; bottom: 0%; right: 0%"
    class="editBt"
    bordered
  >
    <q-btn color="primary" icon="camera_alt" @click="show = true" dense />
    <q-dialog v-model="show">
      <q-card>
        <div>
          <div
            v-show="!imgSrc"
            id="drop_zone"
            @drop.prevent="dropHandler"
            @dragover.prevent="dragOverHandler"
            @click="showFileChooser"
            style="
              width: 100%;
              min-height: 280px;
              max-height: 280px;
              border: 1px solid #000000;
              position: relative;
              box-sizing: border-box;
              padding: 80px;
              background-color: rgba(0, 0, 0, 0.03);
              text-align: center;
              border: 1px dashed rgba(0, 0, 0, 0.08);
              overflow: hidden;
            "
          >
            <input
              class="custom-file-input"
              ref="input"
              type="file"
              name="image"
              accept="image/*"
              @change="setImage"
            />
            <i
              class="vicp-icon1"
              style="
                display: block;
                margin: 0 auto 6px;
                width: 42px;
                height: 42px;
                overflow: hidden;
              "
              ><i
                class="vicp-icon1-arrow"
                style="
                  display: block;
                  margin: 0 auto;
                  width: 0;
                  height: 0;
                  border-bottom: 14.7px solid rgba(0, 0, 0, 0.3);
                  border-left: 14.7px solid transparent;
                  border-right: 14.7px solid transparent;
                "
              ></i>
              <i
                class="vicp-icon1-body"
                style="
                  display: block;
                  width: 12.6px;
                  height: 14.7px;
                  margin: 0 auto;
                  background-color: rgba(0, 0, 0, 0.3);
                "
              ></i>
              <i
                class="vicp-icon1-bottom"
                style="
                  box-sizing: border-box;
                  display: block;
                  height: 12.6px;
                  border: 6px solid rgba(0, 0, 0, 0.3);
                  border-top: none;
                "
              ></i
            ></i>
            <p>Click or drag the file here to upload</p>
          </div>

          <div class="content">
            <section class="cropper-area">
              <div v-show="imgSrc" class="img-cropper">
                <vue-cropper
                  ref="cropper"
                  :src="imgSrc"
                  preview=".preview"
                  :viewMode="2"
                  zoomable
                  drag-mode="move"
                  :aspectRatio="1 / 1"
                  style="
                    width: 100%;
                    min-height: 280px;
                    max-height: 280px;
                    mmin-width: 280px;
                    border: 1px solid #000000;
                  "
                />
                <button @click="imgSrc = null">Cancel</button>
                <button @click="upload">Upload</button>
                <button @click="show = false">Close</button>
              </div>
            </section>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
export default {
  props: ["url"],
  components: { VueCropper },
  data() {
    return {
      show: false,
      filename: null,
      imgSrc: null,
      cropImg: "",
      data: null,
    };
  },
  created() {},
  methods: {
    uploadSuccess(jsonData, field) {
      console.log("success");
      this.$emit("updateObject", jsonData);
    },
    cropImage() {
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
    },
    setImage(e) {
      const file = e.target.files[0];
      this.filename = file.name;
      if (file.type.indexOf("image/") === -1) {
        alert("Please select an image file");
        return;
      }
      if (typeof FileReader === "function") {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.imgSrc = event.target.result;
          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Sorry, FileReader API not supported");
      }
    },
    showFileChooser() {
      this.$refs.input.click();
    },
    zoom(percent) {
      console.log(percent);
      this.$refs.cropper.relativeZoom(percent);
    },

    dropHandler(e) {
      let droppedFiles = e.dataTransfer.files;
      var file = droppedFiles[0];
      this.filename = file.name;
      if (file.type.indexOf("image/") === -1) {
        alert("Please select an image file");
        return;
      }
      if (typeof FileReader === "function") {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.imgSrc = event.target.result;
          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Sorry, FileReader API not supported");
      }
      if (!droppedFiles) return;
    },

    dragOverHandler(ev) {
      // console.log(ev);
      // Prevent default behavior (Prevent file from being opened)
      // ev.preventDefault();
    },

    dataURLtoFile(dataurl, filename) {
      const arr = dataurl.split(",");
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n) {
        u8arr[n - 1] = bstr.charCodeAt(n - 1);
        n -= 1; // to make eslint happy
      }
      return new File([u8arr], filename, { type: mime });
    },

    upload() {
      this.$setLoading(this, true);
      this.cropImage();
      var file = this.dataURLtoFile(this.cropImg, this.filename);
      const data = new FormData();
      data.append("picture", file, file.name);

      // now upload
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      this.$api.post(`${this.url}`, data, config).then((response) => {
        this.$emit("updateObject", response.data);
        this.$setLoading(this, false);
      });
    },
  },
};
</script>

<style>
input[type="file"] {
  display: none;
}
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

