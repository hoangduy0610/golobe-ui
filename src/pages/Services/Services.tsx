import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button, Input, Rate, Pagination, Select } from "antd";
import { Link } from "react-router-dom";
import "./Services.scss";
import MiniHeader from "@/components/Header/MiniHeader";
import Footer from "@/components/Footer/Footer";
import hotelImage from "@/assets/hotel.jpg";
import MainApiRequest from "@/redux/apis/MainApiRequest";
import Paragraph from "antd/es/typography/Paragraph";
import { LoadingOverlay } from "@achmadk/react-loading-overlay";

interface Service {
    id: number;
    name: string;
    description: string;
    priceRange: string;
    reviews: any[];
    images: string[];
    website: string;
    serviceTypeId: number;
    locationId: number;
}

const Services: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const servicesPerPage = 6;
    const [servicesData, setServicesData] = useState<Service[]>([]);
    const [filteredServices, setFilteredServices] = useState<Service[]>([]);
    const [currentServices, setCurrentServices] = useState<Service[]>([]);
    const [serviceTypes, setServiceTypes] = useState<any[]>([]);
    const [locations, setLocations] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchLocation, setSearchLocation] = useState<number | null>(null);
    const [searchServiceType, setSearchServiceType] = useState<number | null>();
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
        setIsLoading(true);
        try {
            const res = await MainApiRequest.get('/service/list');
            setServicesData(res.data);

            const uniqueServiceTypes: any[] = [];
            const uniqueLocations: any[] = [];
            res.data.forEach((service: any) => {
                if (!uniqueServiceTypes.find((type) => type?.id === service?.serviceType?.id)) {
                    uniqueServiceTypes.push(service.serviceType);
                }

                if (!uniqueLocations.find((location) => location?.id === service?.location?.id)) {
                    uniqueLocations.push(service.location);
                }
            });

            setServiceTypes(uniqueServiceTypes);
            setLocations(uniqueLocations);
        } catch (error) {
            console.log("Failed to fetch services list: ", error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchServices();
    }, []);

    useEffect(() => {
        const indexOfLastService = currentPage * servicesPerPage;
        const indexOfFirstService = indexOfLastService - servicesPerPage;
        setCurrentServices(filteredServices.slice(indexOfFirstService, indexOfLastService));
    }, [currentPage, filteredServices]);

    useEffect(() => {
        setFilteredServices(servicesData);
    }, [servicesData]);

    useEffect(() => {
        const filteredServices = servicesData.filter((service) => {
            if (searchServiceType && service.serviceTypeId !== searchServiceType) {
                return false;
            }

            if (searchLocation && service.locationId !== searchLocation) {
                return false;
            }

            return true;
        });

        setFilteredServices(filteredServices);
    }, [searchServiceType, searchLocation]);

    return (
        <LoadingOverlay
            active={isLoading}
            styles={{
                wrapper: {
                    height: "100vh"
                },
                overlay: {
                    position: "fixed",
                    height: "100%",
                    width: "100%",
                    top: 0,
                    left: 0,
                    display: "flex",
                    textAlign: "center",
                    fontSize: "1.2em",
                    color: "#FFF",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    zIndex: 800,
                    WebkitTransition: "opacity 500ms ease-in",
                    transition: "opacity 500ms ease-in",
                    opacity: 1,
                }
            }}
            spinner
        >
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
                            {/* Filters */}
                            <h4>Filters</h4>
                            <div className="row my-4">
                                <div className="col-12 col-md-3 mt-2">
                                    <Select
                                        placeholder="Service Type"
                                        className="w-100"
                                        allowClear
                                        onChange={(value) => {
                                            setSearchServiceType(value);
                                        }}
                                        onClear={() => {
                                            setSearchServiceType(null);
                                        }}
                                    >
                                        {serviceTypes.map((type) => (
                                            <Select.Option key={type.id} value={type.id}>{type.name}</Select.Option>
                                        ))}
                                    </Select>
                                </div>
                                <div className="col-12 col-md-3 mt-2">
                                    <Select
                                        placeholder="Location"
                                        className="w-100"
                                        allowClear
                                        onChange={(value) => {
                                            setSearchLocation(value);
                                        }}
                                        onClear={() => {
                                            setSearchLocation(null);
                                        }}
                                    >
                                        {locations.map((location) => (
                                            <Select.Option key={location.id} value={location.id}>{location.name}</Select.Option>
                                        ))}
                                    </Select>
                                </div>
                            </div>

                            <h4 style={{ marginTop: 50 }}>Results</h4>
                            <Row gutter={16}>
                                {currentServices.map((service) => (
                                    <Col style={{ marginTop: 20 }} key={service.id} sm={24} md={8} lg={8}>
                                        <Link to={`/services/${service.id}`}>
                                            <Card
                                                hoverable
                                                cover={
                                                    <img style={{ width: '100%', height: 200, borderRadius: 20 }} alt={service.name} src={service.images[0]} />
                                                }
                                                bordered={false}
                                                className="service-card h-100"
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
        </LoadingOverlay>
    );
};

export default Services;
