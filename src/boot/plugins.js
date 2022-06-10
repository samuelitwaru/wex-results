import { boot } from "quasar/wrappers";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";

export default boot(({ app }) => {
  app.use(VueCropper);
});
