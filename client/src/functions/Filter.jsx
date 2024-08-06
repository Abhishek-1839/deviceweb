// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { set as setFilters, reset as resetFilters } from './filterReducer';

// const Filter = () => {
//   const filters = useSelector(state => state.filters);
//   const dispatch = useDispatch();
//   const [isOpen, setIsOpen] = useState(false);

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     dispatch(setFilters({ [name]: value }));
//   };

//   const handleResetFilters = () => {
//     dispatch(resetFilters());
//   };

//   return (
//     <div className="filter-container">
//       <button onClick={() => setIsOpen(!isOpen)}>Filter</button>
//       {isOpen && (
//         <div className="filter-popup">
//           <h3>Filters</h3>
//           {Object.entries(filters).map(([key, value]) => (
//             <label key={key}>
//               {key.charAt(0).toUpperCase() + key.slice(1)}:
//               <input
//                 type="text"
//                 name={key}
//                 value={value}
//                 onChange={handleFilterChange}
//               />
//             </label>
//           ))}
//           <button onClick={handleResetFilters}>Reset Filters</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Filter;
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters, resetFilters } from './filterSlice';
import axios from 'axios';

const Filter = () => {
  const filters = useSelector(state => state.filters);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    downloadStatus: [],
    deviceStatus: [],
    avgBandwidth: [],
    location: [],
    bandwidth: []
  });

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await axios.get('http://localhost:8895/api/appliances');
        if (response.status === 200) {
          const appliances = response.data.appliances;
          const options = {
            downloadStatus: [...new Set(appliances.map(item => item.downloadStatus))],
            deviceStatus: [...new Set(appliances.map(item => item.deviceStatus))],
            avgBandwidth: [...new Set(appliances.map(item => item.avgBandwidth))],
            location: [...new Set(appliances.map(item => item.location.city))], // Assuming 'city' is part of location object
            bandwidth: [...new Set(appliances.map(item => item.bandwidth))]
          };
          setFilterOptions(options);
        } else {
          throw new Error('Failed to fetch filter options');
        }
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    };

    fetchFilterOptions();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilters({ [name]: value }));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="filter-container">
      <button onClick={() => setIsOpen(!isOpen)}>Filter</button>
      {isOpen && (
        <div className="filter-popup">
          <h3>Filters</h3>
          {Object.entries(filters).map(([key, value]) => (
            <label key={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}:
              <select name={key} value={value} onChange={handleFilterChange}>
                <option value="">All</option>
                {filterOptions[key]?.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </label>
          ))}
          <button onClick={handleResetFilters}>Reset Filters</button>
        </div>
      )}
    </div>
  );
};

export default Filter;
