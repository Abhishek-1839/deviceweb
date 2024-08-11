import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <nav aria-label="breadcrumb" className="breadcrumbs">
      <ol className="breadcrumb" style={{listStyle:'none', display: 'flex',margin:'0px'}}>
      <li className="breadcrumb-item">
          <Link to="/">Devices</Link>
          {pathnames.length > 0 && ' > '}
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li
              key={to}
              className={`breadcrumb-item ${isLast ? 'active' : ''}`}
              aria-current={isLast ? 'page' : undefined}
            >
              {isLast ? (
                value.charAt(0).toUpperCase() + value.slice(1)
              ) : (
                <Link to={to}>{value.charAt(0).toUpperCase() + value.slice(1)}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;