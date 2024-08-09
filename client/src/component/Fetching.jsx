// import React, { useState, useEffect, useMemo } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Filter from '../functions/Filter';
// import './Fetching.css';

// const Fetching = () => {
//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState(null);
//   const [headers, setHeaders] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(5);
//   const [searchTerm, setSearchTerm] = useState('');
//   const filters = useSelector(state => state.filters);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:8895/api/appliances');
//         if (response.status === 200) {
//           const fetched = response.data;
//           setProducts(fetched.appliances);
//           if (fetched.appliances.length > 0) {
//             setHeaders(Object.keys(fetched.appliances[0]));
//           }
//         } else {
//           throw new Error('API request failed');
//         }
//       } catch (error) {
//         setError(error.message);
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const filteredProducts = useMemo(() => {
//     return products.filter(product => {
//       const matchesFilters = Object.entries(filters).every(([key, value]) => {
//         if (!value) return true;
//         if (key === 'location' && typeof product[key] === 'object') {
//           return Object.values(product[key]).some(val => 
//             val.toString().toLowerCase().includes(value.toLowerCase())
//           );
//         }
//         return product[key].toString().toLowerCase().includes(value.toLowerCase());
//       });

//       // const matchesSearch = Object.values(product).some(val => 
//       //   val.toString().toLowerCase().includes(searchTerm.toLowerCase())
//       // );
//       const matchesSearch = (product, searchTerm) => {
//         const lowerSearchTerm = searchTerm.toLowerCase();
//         return Object.values(product).reduce((acc, val) => {
//           return acc || val.toString().toLowerCase().includes(lowerSearchTerm);
//         }, false);
//       };      

//       return matchesFilters && matchesSearch;
//     });
//   }, [products, filters, searchTerm]);

//   const statusClassMa = {
//     deviceStatus: {
//       online: 'deviceStatus-active',
//       offline: 'deviceStatus-inactive'
//     },
//     downloadStatus: {
//       downloaded: 'downloadStatus-completed',
//       downloading: 'downloadStatus-in-progress',
//       failed: 'downloadStatus-failed'
//     }
//   };

//   const formatValue = (header, value) => {
//     if (header === 'location' && typeof value === 'object' && value !== null) {
//       return (
//         <>
//           {Object.entries(value).map(([key, val], index) => (
//             <div key={index}>{`${val}`}</div>
//           ))}
//         </>
//       );
//     }

//     // Add conditional styling for deviceStatus and downloadStatus
//     if (statusClassMa[header] && statusClassMa[header][value.toLowerCase()]) {
//       return (
//         <div>
//           <span className={`status-dot ${statusClassMa[header][value.toLowerCase()]}`}></span>
//           {value}
//         </div>
//       );
//     }

//     return value;
//   };


//   // Get current items
//   const currentItems = useMemo(() => {
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     return filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
//   }, [currentPage, itemsPerPage, filteredProducts]);

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const handleView = (device) => {
//     if (device) {
//       navigate(`/device/${device.id}`, { state: { device } });
//     } else {
//       console.error('Device is undefined');
//     }
//   };

//   return (
//     <div className='mainhead'>
//       {error && <p>Error: {error}</p>}
//       {products.length > 0 ? (
//         <>
//           <div className="firstlayer">
//             <div className="search">
//               <input 
//                 type='search' 
//                 value={searchTerm} 
//                 onChange={(e) => setSearchTerm(e.target.value)} 
//                 placeholder='Search' 
//               />
              
//             </div>
//             <div className="filter"><Filter /></div>
            
//             <div className="pagination">
//               {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }, (_, i) => (
//                 <button key={i} onClick={() => paginate(i + 1)}>
//                   {i + 1}
//                 </button>
//               ))}
//             </div>
//           </div>
          
//           <table>
//             <thead>
//               <tr className='datatitle'> 
//                 {headers.map((header, index) => (
//                   <th key={index} className='datahead'>
//                     {header.split(/(?=[A-Z])/)
//                       .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//                       .join(" ")}
//                   </th>
//                 ))}
//                   <th style={{borderBottom : '2px solid black'}}>Details</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentItems.map((item, index) => (
//                 <tr key={index}>
//                   {headers.map((header, i) => (
//                     <td key={i} className='datadet'>{formatValue(header, item[header])}</td>
                    
//                   ))}
//                   <td><button 
//                   style={{backgroundColor :'#475b70', color :'white', cursor :'pointer'}} 
//                   onClick={() => handleView(item)}>
//                     View
//                   </button></td>
//                 </tr>
               
//               ))}
               
//             </tbody>
//           </table>
//         </>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default Fetching;
import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Filter from '../functions/Filter';
import StatusIndicator from './StatusIndicator';
import StatusBar from './StatusBar';
import './Fetching.css';
import './StatusIndicator.css';

const Fetching = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const filters = useSelector(state => state.filters);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8895/api/appliances');
        if (response.status === 200) {
          const fetched = response.data;
          setProducts(fetched.appliances);
          if (fetched.appliances.length > 0) {
            setHeaders(Object.keys(fetched.appliances[0]));
          }
        } else {
          throw new Error('API request failed');
        }
      } catch (error) {
        setError(error.message);
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        if (key === 'location' && typeof product[key] === 'object') {
          return Object.values(product[key]).some(val => 
            val.toString().toLowerCase().includes(value.toLowerCase())
          );
        }
        return product[key].toString().toLowerCase().includes(value.toLowerCase());
      });

      const matchesSearch = (product, searchTerm) => {
        const lowerSearchTerm = searchTerm.toLowerCase();
        return Object.values(product).reduce((acc, val) => {
          return acc || val.toString().toLowerCase().includes(lowerSearchTerm);
        }, false);
      };      

      return matchesFilters && matchesSearch(product, searchTerm);
    });
  }, [products, filters, searchTerm]);

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, itemsPerPage, filteredProducts]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleView = (device) => {
    if (device) {
      navigate(`/device/${device.id}`, { state: { device } });
    } else {
      console.error('Device is undefined');
    }
  };

  return (
    <div className='mainhead'>
      {error && <p>Error: {error}</p>}
      {products.length > 0 ? (
        <>
        <StatusBar products={products} />
          <div className="firstlayer">
            <div className="search">
              <input 
                type='search' 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                placeholder='Search' 
              />
            </div>
            <div className="filter" style={{marginRight:'50px'}}><Filter /></div>
            <div className="pagination">
              {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }, (_, i) => (
                <button key={i} onClick={() => paginate(i + 1)}>
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
          
          
          
          <table>
            <thead>
              <tr className='datatitle'> 
                {headers.map((header, index) => (
                  <th key={index} className='datahead'>
                    {header.split(/(?=[A-Z])/)
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                      .join(" ")}
                  </th>
                ))}
                <th style={{borderBottom : '2px solid black'}}>Details</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  {headers.map((header, i) => (
                    <td key={i} className='datadet'>
                      <StatusIndicator header={header} value={item[header]} />
                    </td>
                  ))}
                  <td>
                    <button 
                      style={{backgroundColor :'#475b70', color :'white', cursor :'pointer'}} 
                      onClick={() => handleView(item)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Fetching;
