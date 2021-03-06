import Vue from "vue";
import Vuex from "vuex";

import { v4 } from "uuid";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    records: [],
    recorder: {
      state: "deactive",
      timestamp: 0,
      track: [],
      scene: 0,
      input: {
        type: "",
        label: ""
      },
      mouse: {
        relX: 0,
        relY: 0,
        x: 0,
        y: 0,
        buttons: 0,
        timestamp: 0
      },
      keyboard: {
        key: "",
        ctrlKey: false,
        metaKey: false,
        shiftKey: false,
        altKey: false,
        timestamp: 0
      }
    }
  },
  mutations: {
    load(state, records) {
      state.records = JSON.parse(records);
    },
    save(state) {
      localStorage.setItem("recorder-records", JSON.stringify(state.records));
    },
    start(state, scene) {
      state.recorder.state = "active";
      state.recorder.startedOn = Date.now();
      state.recorder.scene = scene;
      state.recorder.track = [];
      state.recorder.mouse.relX = 0;
      state.recorder.mouse.relY = 0;
      state.recorder.mouse.x = 0;
      state.recorder.mouse.y = 0;
      state.recorder.mouse.buttons = 0;
      state.recorder.mouse.timestamp = 0;
      state.recorder.keyboard.key = "";
      state.recorder.keyboard.ctrlKey = false;
      state.recorder.keyboard.metaKey = false;
      state.recorder.keyboard.shiftKey = false;
      state.recorder.keyboard.altKey = false;
      state.recorder.keyboard.timestamp = 0;
    },
    stop(state) {
      state.recorder.state = "deactive";
      state.records.push({
        id: v4(),
        savedOn: Date.now(),
        startedOn: state.recorder.startedOn,
        track: state.recorder.track,
        scene: state.recorder.scene,
        input: {
          type: state.recorder.input.type,
          label: state.recorder.input.label
        }
      });
    },
    updateMouse(state, { relX, relY, x, y, timestamp }) {
      state.recorder.timestamp = timestamp;
      state.recorder.mouse.relX = relX;
      state.recorder.mouse.relY = relY;
      state.recorder.mouse.x = x;
      state.recorder.mouse.y = y;
      const entry = {
        timestamp,
        mouse: {
          relX,
          relY,
          x,
          y
        },
        keyboard: false
      };
      state.recorder.track.push(entry);
    },
    updateKeyboard(
      state,
      { key, ctrlKey, metaKey, shiftKey, altKey, timestamp }
    ) {
      state.recorder.timestamp = timestamp;
      state.recorder.keyboard.key = key;
      state.recorder.keyboard.ctrlKey = ctrlKey;
      state.recorder.keyboard.metaKey = metaKey;
      state.recorder.keyboard.shiftKey = shiftKey;
      state.recorder.keyboard.altKey = altKey;
      state.recorder.keyboard.timestamp = timestamp;
      const entry = {
        timestamp,
        keyboard: {
          key,
          ctrlKey,
          metaKey,
          shiftKey,
          altKey
        },
        mouse: false
      };
      state.recorder.track.push(entry);
    },
    delete(state, id) {
      const idx = state.records.findIndex(e => e.id === id);
      state.records.splice(idx, 1);
    },
    type(state, input) {
      state.recorder.input.type = input.type;
      state.recorder.input.label = input.label;
    }
  },
  getters: {},
  actions: {},
  modules: {}
});

export default store;
