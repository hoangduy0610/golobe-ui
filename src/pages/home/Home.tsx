import { Button, Card, Row, Col, Input, Rate, Form } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faLocationDot, faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import facebookIcon from "@/assets/facebook_icon.svg";
import footerLogo from "@/assets/footer_logo.svg";
import instagramIcon from "@/assets/instagram_icon.svg";
import maldives from "@/assets/maldives.jpg";
import newsletter from "@/assets/newsletter.svg";
import reviewImg from "@/assets/review_img.jpg";
import twitterIcon from "@/assets/twitter_icon.svg";
import youtubeIcon from "@/assets/youtube_icon.svg";
import Header from "@/components/Header/Header";
import "./Home.scss";
import Footer from '@/components/Footer/Footer';

export function Home() {
    return (
        <>
        <div className="home_page">
            <div className="app">
                <div className="container-fluid">
                <Header />
                    <div className="container">
                        {/* Search Input */}
                        <section className="card shadow my-4 px-4 border-0">
                            <div className="card-body">
                                <Input className="bg-secondary py-3" placeholder="Search" />
                            </div>
                        </section>

                        {/* Plan your perfect trip */}
                        <section className="my-4">
                            <Row gutter={16} align="middle">
                                <Col span={20}>
                                    <h2>Plan your perfect trip</h2>
                                </Col>
                                <Col span={4}>
                                    <Button className="custom-button">See more places</Button>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <Col key={index} md={8} sm={12} xs={24} className="mt-4">
                                        <Card hoverable>
                                            <div className="d-flex align-items-center">
                                                <div className="squircle-img">
                                                    <img src={maldives} className="w-100" alt="destination" />
                                                </div>
                                                <div className="d-flex ms-2 flex-column">
                                                    <p style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>Malé, Maldives</p>
                                                    <p style={{ fontSize: 14, margin: 0 }}>Restaurants • Hotels • Things to do</p>
                                                </div>
                                            </div>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </section>

                        {/* My trips */}
                        <section className="my-4">
                            <Row gutter={16} align="middle">
                                <Col span={20}>
                                    <h2>My trips</h2>
                                </Col>
                                <Col span={4}>
                                    <Button className="custom-button">See more places</Button>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                {Array.from({ length: 2 }).map((_, index) => (
                                    <Col key={index} md={24} className="mt-4">
                                        <Card hoverable>
                                            <div className="d-flex align-items-center">
                                                <div className="squircle-img squircle-img-lg">
                                                    <img src={maldives} className="w-100" alt="trip" />
                                                </div>
                                                <div className="d-flex ms-2 flex-column">
                                                    <p style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 4 }}>Malé, Maldives</p>
                                                    <p style={{ fontSize: 14, margin: 0 }}>
                                                        <FontAwesomeIcon icon={faCalendarDays} style={{ marginRight: 4 }} />
                                                        5 days
                                                    </p>
                                                    <p style={{ fontSize: 14, margin: 0 }}>
                                                        <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: 4 }} />
                                                        Maldives
                                                    </p>
                                                </div>
                                            </div>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </section>

                        {/* Reviews */}
                        <section className="my-4">
                            <Row gutter={16} align="middle">
                                <Col span={20}>
                                    <h2>Reviews</h2>
                                </Col>
                                <Col span={4}>
                                    <Button className="custom-button">See all</Button>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <Col key={index} md={8} sm={12} xs={24} className="mt-4">
                                        <Card hoverable className="card-review">
                                            <div className="card-body">
                                                <h4>“A real sense of community, nurtured”</h4>
                                                <p>Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed.</p>
                                                <strong style={{ float: 'right' }}>View more</strong><br />
                                                <div className="rating" style={{ margin: '20px 0px' }}>
                                                    <Rate disabled value={5} style={{ fontSize: '24px', color: '#FFC107' }} />
                                                </div>
                                                <strong>Olga</strong>
                                                <p>Weave Studios - Kai Tak</p>
                                                <div className="review-img">
                                                    <img src={reviewImg} className="w-100" alt="review" />
                                                </div>
                                            </div>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </section>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
}
