import React from "react";
import AccommodationTable from "@/components/AccommodationTable/AccommodationTable"; // Import component mới

const Accommodation = () => {
  const accommodations = [
    {
      location: "Maldives",
      name: "Luxury Resort",
      type: 5,
      price: "$500 per night",
      address: "Malé, Maldives",
      description: "A luxurious resort with amazing views and top-notch amenities.",
      link: "https://example.com/book"
    },
    {
      location: "Paris",
      name: "Parisian Hotel",
      type: 4,
      price: "$250 per night",
      address: "123 Paris St, Paris, France",
      description: "A charming hotel in the heart of Paris with a view of the Eiffel Tower.",
      link: "https://example.com/book"
    },
    {
      location: "New York",
      name: "Central Park Hotel",
      type: 4,
      price: "$300 per night",
      address: "59th St & 7th Ave, New York, NY",
      description: "A luxury hotel offering prime views of Central Park.",
      link: "https://example.com/book"
    }
  ];

  return (
    <div className="accommodation-container">
      <h2>Accommodation Management</h2>
      <AccommodationTable accommodations={accommodations} />
    </div>
  );
};

export default Accommodation;
