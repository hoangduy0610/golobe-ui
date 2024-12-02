import React from "react";

const Accommodation = () => {
  // Dữ liệu mẫu cho bảng Accommodation
  const accommodations = [
    {
      location: "Maldives",
      name: "Luxury Resort",
      type: 5, // Number of stars
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
    // Thêm dữ liệu vào đây nếu cần
  ];

  return (
    <div className="accommodation-container">
      <h2>Accommodation Management</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Location</th>
            <th>Name</th>
            <th>Type (Stars)</th>
            <th>Price</th>
            <th>Address</th>
            <th>Description</th>
            <th>Link to Book</th>
          </tr>
        </thead>
        <tbody>
          {accommodations.map((accommodation, index) => (
            <tr key={index}>
              <td>{accommodation.location}</td>
              <td>{accommodation.name}</td>
              <td>{accommodation.type} Stars</td>
              <td>{accommodation.price}</td>
              <td>{accommodation.address}</td>
              <td>{accommodation.description}</td>
              <td>
                <a href={accommodation.link} target="_blank" rel="noopener noreferrer">
                  Book Now
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Accommodation;
