import React from 'react';

const locationData = [
  { continent: 'Asia', country: 'Vietnam', province: 'Hanoi', district: 'Hoan Kiem' },
  { continent: 'Asia', country: 'Vietnam', province: 'Hanoi', district: 'Cau Giay' },
  { continent: 'Europe', country: 'France', province: 'Ile-de-France', district: 'Paris' },
  { continent: 'North America', country: 'USA', province: 'California', district: 'Los Angeles' },
];

const Location = () => {
  return (
    <div>
      <h2>Location Management</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Continent</th>
            <th>Country</th>
            <th>Province</th>
            <th>District</th>
          </tr>
        </thead>
        <tbody>
          {locationData.map((location, index) => (
            <tr key={index}>
              <td>{location.continent}</td>
              <td>{location.country}</td>
              <td>{location.province}</td>
              <td>{location.district}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Location;
