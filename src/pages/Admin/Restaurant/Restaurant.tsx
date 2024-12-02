import React from "react";
import RestaurantTable from "@/components/RestaurantTable/RestaurantTable"; // Import component mới

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
    <div>
      <h2>Restaurant Management</h2>
      <RestaurantTable restaurants={restaurants} />
    </div>
  );
};

export default Restaurant;
