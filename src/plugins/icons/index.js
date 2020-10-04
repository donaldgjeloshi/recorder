import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlay,
  faStop,
  faRedo,
  faDownload,
  faTrashAlt,
  faInfo,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faPlay,
  faStop,
  faRedo,
  faDownload,
  faTrashAlt,
  faInfo,
  faInfoCircle
);

Vue.component("font-awesome-icon", FontAwesomeIcon);
