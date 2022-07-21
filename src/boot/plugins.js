import { boot } from "quasar/wrappers";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import store from "src/store";


export default boot(({ app }) => {
  app.use(VueCropper);
  app.config.globalProperties.$store = store()
});
