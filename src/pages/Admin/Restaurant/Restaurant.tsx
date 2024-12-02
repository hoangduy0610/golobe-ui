import React from "react";

const Restaurant = () => {
  const restaurants = [
    {
      location: "Tokyo",
      name: "Sushi Bar",
      type: "Food",
      address: "123 Sushi St, Tokyo, Japan",
      description: "A traditional sushi bar offering fresh sushi and sashimi.",
      website: "https://www.sushibar-tokyo.com"
    },
    {
      location: "New York",
      name: "Coffee House",
      type: "Drink",
      address: "456 Coffee Ave, New York, USA",
      description: "A cozy coffee house with a variety of hot beverages and pastries.",
      website: "https://www.coffeehouse-nyc.com"
    },
    {
      location: "Paris",
      name: "Le Bistro",
      type: "Food",
      address: "789 Paris Blvd, Paris, France",
      description: "A French bistro offering authentic French cuisine with a charming ambiance.",
      website: "https://www.lebistro-paris.com"
    }

  ];

  return (
    <div className="restaurant-container">
      <h2>Restaurant Management</h2>
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
    </div>
  );
};

export default Restaurant;
