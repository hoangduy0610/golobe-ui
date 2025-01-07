import React, { useState } from "react";
import { Card, Row, Col, Button, Input, Rate, Pagination } from "antd";
import { Link } from "react-router-dom";
import "./Services.scss";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import hotelImage from "@/assets/hotel.jpg";

interface Service {
    id: number;
    title: string;
    description: string;
    price: string;
    rating: number;
    image: string;
    link: string;
}

const servicesData: Service[] = [
    {
        id: 1,
        title: "Hotel Booking",
        description: "Book your stay at the best hotels with amazing deals and offers.",
        price: "$200 per night",
        rating: 4.5,
        image: hotelImage,
        link: "/services/hotel-booking",
    },
    {
        id: 2,
        title: "Flight Booking",
        description: "Find the best flights to your favorite destinations at unbeatable prices.",
        price: "$499 per flight",
        rating: 4.0,
        image: hotelImage,
        link: "/services/flight-booking",
    },
    {
        id: 3,
        title: "Tour Packages",
        description: "Explore exclusive tour packages to various exotic destinations.",
        price: "$1500 for 7 days",
        rating: 5.0,
        image: hotelImage,
        link: "/services/tour-packages",
    },
    {
        id: 4,
        title: "Car Rental",
        description: "Rent a car to make your travel more convenient and enjoyable.",
        price: "$50 per day",
        rating: 4.2,
        image: hotelImage,
        link: "/services/car-rental",
    },
    {
        id: 5,
        title: "Spa Services",
        description: "Relax and rejuvenate with our luxurious spa services.",
        price: "$100 per session",
        rating: 4.7,
        image: hotelImage,
        link: "/services/spa-services",
    },
    {
        id: 6,
        title: "Restaurant Reservation",
        description: "Reserve a table at the best restaurants with ease.",
        price: "Varies",
        rating: 4.8,
        image: hotelImage,
        link: "/services/restaurant-reservation",
    },
];

const Services: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const servicesPerPage = 6;
    const indexOfLastService = currentPage * servicesPerPage;
    const indexOfFirstService = indexOfLastService - servicesPerPage;
    const currentServices = servicesData.slice(indexOfFirstService, indexOfLastService);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
            <div className="services-page">
                <div className="app">
                    <div className="container-fluid">
                        <Header />
                        <div className="container">
                            <section className="card shadow my-4 px-4 border-0">
                                <div className="card-body">
                                    <Input className="bg-secondary py-3" placeholder="Search" />
                                </div>
                            </section>
                            <h1 className="page-title">Discovery</h1>
                            <Row gutter={16}>
                                {currentServices.map((service) => (
                                    <Col key={service.id} sm={24} md={8} lg={8}>
                                        <Link to={`/services/${service.id}`}>
                                            <Card
                                                hoverable
                                                cover={<img alt={service.title} src={service.image} />}
                                                bordered={false}
                                                className="service-card"
                                            >
                                                <h3>{service.title}</h3>
                                                <Rate disabled defaultValue={service.rating} />
                                                <p>{service.description}</p>
                                                <p><strong>Price:</strong> {service.price}</p>
                                                <Link to={service.link}>
                                                    <Button className="service-button" type="primary">View Details</Button>
                                                </Link>
                                            </Card>
                                        </Link>
                                    </Col>
                                ))}
                            </Row>
                            {/* Pagination */}
                            <Pagination
                                current={currentPage}
                                total={servicesData.length}
                                pageSize={servicesPerPage}
                                onChange={handlePageChange}
                                className="pagination-custom"
                                showSizeChanger={false}
                                style={{ textAlign: "center", marginTop: "20px" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Services;
