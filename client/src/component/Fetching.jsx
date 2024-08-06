import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Fetching.css';

const Fetching = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    console.log('API request sent');
    axios.get('http://localhost:8895/api/appliances')
      .then(response => {
        console.log('Response status:', response.status);
        
        if (response.status === 200) {
          const fetched = response.data;
          console.log('Fetched data structure:', typeof fetched, Array.isArray(fetched.appliances));
          console.log('Number of appliances:', fetched.appliances.length); 
          setProducts(fetched.appliances);
          if (fetched.appliances.length > 0) {
            setHeaders(Object.keys(fetched.appliances[0]));
          }
          console.log('Products state:', fetched.appliances);
        } else {
          console.error('API request failed:', response.status);
        }
      })
      .catch(error => {
        setError(error.message);
        console.error('Error fetching data:', error);
      });
  }, []);
  useEffect(() => {
    console.log('Products state updated:', products);
    console.log('Number of products:', products.length);
  }, [products]);

  const formatValue = (header, value) => {
    if (header === 'location' && typeof value === 'object' && value !== null) {
      return (
        <>
          {Object.entries(value).map(([key, val], index) => (
            <div key={index}>{`${val}`}</div>
          ))}
        </>
      );
    }
    return value;
  };

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='mainhead'>
      {/* <h1>Data Table</h1> */}
      {error && <p>Error: {error}</p>}
      {products.length > 0 ? (
        <>
        <div className="firstlayer">
        <div className="search">
          <input type='search' value='' placeholder='Search' />
        </div>
        <div className="pagination">
            {/* <p>Page {currentPage} of {Math.ceil(products.length / itemsPerPage)}</p> */}
            {Array.from({ length: Math.ceil(products.length / itemsPerPage) }, (_, i) => (
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
                  <th key={index} className='datahead'>{header.split(/(?=[A-Z])/)
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                    .join(" ")}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  {headers.map((header, i) => (
                    <td key={i} className='datadet'>{formatValue(header, item[header])}</td>
                  ))}
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