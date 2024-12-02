import React from "react";
import LocationTable from "@/components/LocationTable/LocationTable";

const Location = () => {
  const locationData = [
    { continent: "Asia", country: "Vietnam", province: "Hanoi", district: "Hoan Kiem" },
    { continent: "Asia", country: "Vietnam", province: "Hanoi", district: "Cau Giay" },
    { continent: "Europe", country: "France", province: "Ile-de-France", district: "Paris" },
    { continent: "North America", country: "USA", province: "California", district: "Los Angeles" }
  ];

  return (
    <div>
      <h2>Location Management</h2>
      <LocationTable locations={locationData} /> 
    </div>
  );
};

export default Location;
