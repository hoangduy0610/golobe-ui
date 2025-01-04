import React from "react";

// Định nghĩa kiểu dữ liệu cho Restaurant
interface Restaurant {
  location: string;
  name: string;
  type: string;  // Food or Drink
  address: string;
  description: string;
  website: string;
}

interface RestaurantTableProps {
  restaurants: Restaurant[]; // Dữ liệu nhà hàng truyền vào từ bên ngoài
}

const RestaurantTable: React.FC<RestaurantTableProps> = ({ restaurants }) => {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Location</th>
          <th>Name</th>
          <th>Type (Food or Drink)</th>
          <th>Address</th>
          <th>Description</th>
          <th>Website</th>
        </tr>
      </thead>
      <tbody>
        {restaurants.map((restaurant, index) => (
          <tr key={index}>
            <td>{restaurant.location}</td>
            <td>{restaurant.name}</td>
            <td>{restaurant.type}</td>
            <td>{restaurant.address}</td>
            <td>{restaurant.description}</td>
            <td>
              <a href={restaurant.website} target="_blank" rel="noopener noreferrer">
                {restaurant.website}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RestaurantTable;
