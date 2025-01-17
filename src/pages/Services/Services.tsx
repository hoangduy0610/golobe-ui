import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button, Input, Rate, Pagination } from "antd";
import { Link } from "react-router-dom";
import "./Services.scss";
import MiniHeader from "@/components/Header/MiniHeader";
import Footer from "@/components/Footer/Footer";
import hotelImage from "@/assets/hotel.jpg";
import MainApiRequest from "@/redux/apis/MainApiRequest";
import Paragraph from "antd/es/typography/Paragraph";

interface Service {
    id: number;
    name: string;
    description: string;
    priceRange: string;
    reviews: any[];
    images: string[];
    website: string;
}

const Services: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const servicesPerPage = 6;
    const [servicesData, setServicesData] = useState<Service[]>([]);
    const [currentServices, setCurrentServices] = useState<Service[]>([]);
    // const indexOfLastService = currentPage * servicesPerPage;
    // const indexOfFirstService = indexOfLastService - servicesPerPage;
    // const currentServices = servicesData.slice(indexOfFirstService, indexOfLastService);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const calculateReview = (reviews: any[]) => {
        if (reviews.length === 0) return 0;
        const totalRating = reviews.reduce((total, review) => total + review.rating, 0);
        return totalRating / reviews.length;
    }

    const fetchServices = async () => {
        try {
            const res = await MainApiRequest.get('/service/list');
            setServicesData(res.data);
        } catch (error) {
            console.log("Failed to fetch services list: ", error);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    useEffect(() => {
        const indexOfLastService = currentPage * servicesPerPage;
        const indexOfFirstService = indexOfLastService - servicesPerPage;
        setCurrentServices(servicesData.slice(indexOfFirstService, indexOfLastService));
    }, [currentPage, servicesData]);

    return (
        <>
            <div className="services-page">
                <div className="app">
                    <div className="container-fluid">
                        <MiniHeader />
                        <div className="container">
                            {/* <section className="card shadow my-4 px-4 border-0">
                                <div className="card-body">
                                    <Input className="bg-secondary py-3" placeholder="Search" />
                                </div>
                            </section> */}
                            <h1 className="page-title">Discovery</h1>
                            <Row gutter={16}>
                                {currentServices.map((service) => (
                                    <Col key={service.id} sm={24} md={8} lg={8}>
                                        <Link to={`/services/${service.id}`}>
                                            <Card
                                                hoverable
                                                cover={<img alt={service.name} src={service.images[0]} />}
                                                bordered={false}
                                                className="service-card"
                                            >
                                                <h3>{service.name}</h3>
                                                <Rate disabled allowHalf value={calculateReview(service?.reviews || [])} />
                                                <Paragraph
                                                    ellipsis={{
                                                        rows: 3
                                                    }}
                                                >
                                                    {service.description}
                                                </Paragraph>
                                                <p><strong>Price Range:</strong> {service.priceRange.toUpperCase()}</p>
                                                <Button
                                                    className="service-button btn w-100 btn-outline-primary"
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        e.stopPropagation()
                                                        window.open(service.website, "_blank")
                                                    }}
                                                >Booking</Button>
                                                <Link to={`/services/${service.id}`}>
                                                    <Button className="service-button" type="primary">Details</Button>
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
            </div >
            <Footer />
        </>
    );
};

export default Services;
