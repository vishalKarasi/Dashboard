import { createSlice } from "@reduxjs/toolkit";

export const getInitialMode = () => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const initialState = {
  mode: getInitialMode(),
  theme: "royalblue",
  menu: false,
  visible: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMode(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
      document.documentElement.style.colorScheme = state.mode;
      document.body.className = state.mode;
    },

    setTheme(state, action) {
      state.theme = action.payload;
      document.documentElement.style.setProperty("--clr-primary", state.theme);
    },

    toggle(state, { payload }) {
      state[payload] = !state[payload];
    },
  },
});

export const { toggleMode, setTheme, toggle } = uiSlice.actions;
export default uiSlice.reducer;
