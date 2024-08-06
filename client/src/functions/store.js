
  // store.js
  import { configureStore } from '@reduxjs/toolkit';
//   import filtersReducer from './filterReducer';
import filtersReducer from './filterSlice';
  
  const store = configureStore({
    reducer: {
      filters: filtersReducer,
    },
  });
  
  export default store;