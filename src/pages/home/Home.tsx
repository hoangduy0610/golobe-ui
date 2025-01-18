import Footer from '@/components/Footer/Footer';
import Header from "@/components/Header/Header";
import MainApiRequest from '@/redux/apis/MainApiRequest';
import { LoadingOverlay } from '@achmadk/react-loading-overlay';
import { faCalendarDays, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Input, Rate, Row } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Home.scss";

export function Home() {
    const navigate = useNavigate();
    const [services, setServices] = useState<any[]>([]);
    const [trips, setTrips] = useState<any[]>([]);
    const [reviews, setReviews] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchServices = async () => {
        const res = await MainApiRequest.get('/service/list');
        const services = res.data;
        if (services.length > 6) {
            setServices(services.slice(0, 6));
        } else {
            setServices(services);
        }
    }

    const fetchTrips = async () => {
        const res = await MainApiRequest.get('/plan/list');
        if (res.data.length > 2) {
            setTrips(res.data.slice(0, 2));
        } else {
            setTrips(res.data);
        }
    }

    const fetchReviews = async () => {
        const res = await MainApiRequest.get('/review/top3');
        setReviews(res.data);
    }

    useEffect(() => {
        setIsLoading(true);
        fetchServices();
        fetchTrips();
        fetchReviews();
    }, []);

    useEffect(() => {
        if (services.length > 0 && trips.length > 0 && reviews.length > 0) {
            setIsLoading(false);
        }
    }, [services, trips, reviews]);

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
            <div className="home_page">
                <div className="app">
                    <div className="container-fluid">
                        <Header />
                        <div className="container">
                            {/* Search Input */}
                            {/* <section className="card shadow my-4 px-4 border-0">
                                <div className="card-body">
                                    <Input className="bg-secondary py-3" placeholder="Search" />
                                </div>
                            </section> */}

                            {/* Plan your perfect trip */}
                            <section className="my-4">
                                <div className="d-flex flex-row justify-content-between section-header-custom">
                                    <h2 className="d-md-flex">Plan your perfect trip</h2>
                                    <Button className="custom-button" onClick={() => { navigate("/services") }}>See more services</Button>
                                </div>
                                <Row gutter={16}>
                                    {
                                        services.map((service, index) => (
                                            <Col key={index} md={8} sm={12} xs={24} className="mt-4">
                                                <Card hoverable>
                                                    <div className="d-flex align-items-center">
                                                        <div className="squircle-img">
                                                            <img src={service.images[0]} className="w-100 h-100" alt="destination" />
                                                        </div>
                                                        <div className="d-flex ms-2 flex-column">
                                                            <p style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>{service.name}</p>
                                                            <p style={{ fontSize: 14, margin: 0 }}>{service.serviceType.name}</p>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </Col>
                                        ))
                                    }
                                </Row>
                            </section>

                            {/* My trips */}
                            <section className="my-4">
                                <div className="d-flex flex-row justify-content-between section-header-custom">
                                    <h2>My trips</h2>
                                    <Button className="custom-button" onClick={() => { navigate("/trips") }}>See more trips</Button>
                                </div>
                                <Row gutter={16}>
                                    {
                                        trips.map((trip, index) => (
                                            <Col key={index} md={24} className="mt-4">
                                                <Card hoverable>
                                                    <div className="d-flex align-items-center">
                                                        <div className="squircle-img squircle-img-lg">
                                                            <img src={trip.location.featureImage} className="w-100" alt="trip" />
                                                        </div>
                                                        <div className="d-flex ms-2 flex-column">
                                                            <p style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 4 }}>{trip.name}</p>
                                                            <p style={{ fontSize: 14, margin: 0 }}>
                                                                <FontAwesomeIcon icon={faCalendarDays} style={{ marginRight: 4 }} />
                                                                {moment(trip.endDate).diff(moment(trip.startDate), 'day')} days
                                                            </p>
                                                            <p style={{ fontSize: 14, margin: 0 }}>
                                                                <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: 4 }} />
                                                                {trip.location.name}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </Col>
                                        ))
                                    }
                                </Row>
                            </section>

                            {/* Reviews */}
                            <section className="my-4">
                                <Row gutter={16} align="middle">
                                    <Col span={20}>
                                        <h2>Latest Reviews</h2>
                                    </Col>
                                    <Col span={4}>
                                        {/* <Button className="custom-button" onClick={() => { navigate("/trips") }}>See all</Button> */}
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    {
                                        reviews.map((review, index) => (
                                            <Col key={index} md={8} sm={12} xs={24} className="mt-4">
                                                <Card hoverable className="card-review">
                                                    <div className="card-body">
                                                        <h4>{review.service.name}</h4>
                                                        <p>{review.comment}</p>
                                                        <strong style={{ float: 'right' }}>View more</strong><br />
                                                        <div className="rating" style={{ margin: '20px 0px' }}>
                                                            <Rate disabled value={review.rating} style={{ fontSize: '24px', color: '#FFC107' }} />
                                                        </div>
                                                        <strong>{review.user.name}</strong>
                                                        <p>{moment(review.user.createdAt).format('DD/MM/YYYY')}</p>
                                                        <div className="review-img">
                                                            <img src={review.service.images[0]} className="w-100" alt="review" />
                                                        </div>
                                                    </div>
                                                </Card>
                                            </Col>
                                        ))
                                    }
                                </Row>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </LoadingOverlay>
    );
}
