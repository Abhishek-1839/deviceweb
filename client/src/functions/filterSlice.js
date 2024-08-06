import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  downloadStatus: '',
  deviceStatus: '',
  avgBandwidth: '',
  location: '',
  bandwidth: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetFilters: () => initialState,
  },
});

export const { setFilters, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
