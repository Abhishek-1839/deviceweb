export const setFilters = (filters) => ({
    type: 'filters/set',
    payload: filters,
  });
  
  export const resetFilters = () => ({
    type: 'filters/reset',
  });
  
  // reducers.js
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
      set: (state, action) => {
        return { ...state, ...action.payload };
      },
      reset: () => initialState,
    },
  });
  
  export const { set, reset } = filtersSlice.actions;
  export default filtersSlice.reducer;
  