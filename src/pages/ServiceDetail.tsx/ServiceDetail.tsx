import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb, Card, Typography, Row, Col, Divider, Carousel, Button, List, Input, Rate, Modal } from "antd";
import { EnvironmentOutlined, PhoneOutlined, GlobalOutlined, DollarOutlined } from "@ant-design/icons";
import "./ServiceDetail.scss";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import hotelImage from "@/assets/hotel.jpg";
import CustomComment from "./CustomComment";

const { Title, Text } = Typography;
const { TextArea } = Input;

const ServiceDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Lấy ID từ URL

    // Dữ liệu mẫu dịch vụ
    const service = {
        id,
        title: "Hotel Booking",
        description: "Book your stay at the best hotels with amazing deals and offers.",
        reviews: 125,
        type: "Travel & Accommodation",
        images: [hotelImage, hotelImage, hotelImage],
        address: "123 Main Street, City Center, Hometown",
        phone: "(123) 456-7890",
        website: "www.example.com",
        price: "$200 per night",
    };

    // Dữ liệu mẫu đánh giá
    const reviews = [
        {
            author: "John Doe",
            content: "Great experience! The hotel was clean and the staff was friendly.",
            rating: 5,
        },
        {
            author: "Jane Smith",
            content: "Good location but the rooms were a bit small.",
            rating: 4,
        },
    ];

    // Trạng thái để điều khiển modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [rating, setRating] = useState(0); // Số sao
    const [reviewContent, setReviewContent] = useState(""); // Nội dung đánh giá

    const handleShowModal = () => {
        setIsModalVisible(true); // Mở modal
    };

    const handleCloseModal = () => {
        setIsModalVisible(false); // Đóng modal
    };

    const handleSubmitReview = () => {
        // Xử lý khi người dùng gửi đánh giá
        console.log("Review Submitted:", { rating, reviewContent });
        // Đóng modal sau khi gửi đánh giá
        setIsModalVisible(false);
    };

    return (
        <div className="service-details-page">
            <div className="app">
                <div className="container-fluid">
                    <Header />
                    <div className="container">
                        <Breadcrumb className="my-3">
                            <Breadcrumb.Item>
                                <Link to="/">Home</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to="/services">Service</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>{service.title}</Breadcrumb.Item>
                        </Breadcrumb>

                        {/* Tiêu đề */}
                        <Title level={1}>{service.title}</Title>
                        <Text type="secondary" className="service-meta">
                            <strong>{service.reviews} reviews</strong> | <strong>Type:</strong> {service.type}
                        </Text>

                        {/* Card "About" */}
                        <Card className="about-card my-4">
                            <Row gutter={[16, 16]} align="middle">
                                <Col xs={24} md={14}>
                                    <Title level={3}>About</Title>
                                    <Text>{service.description}</Text>
                                </Col>
                                <Col xs={24} md={10}>
                                    {/* Carousel cho ảnh */}
                                    <Carousel autoplay className="carousel">
                                        {service.images.map((image, index) => (
                                            <div key={index}>
                                                <img src={image} alt={`Slide ${index + 1}`} />
                                            </div>
                                        ))}
                                    </Carousel>
                                </Col>
                            </Row>
                        </Card>

                        {/* Thông tin chi tiết */}
                        <Card className="details-card">
                            <Title level={3}>Details</Title>
                            <Divider />
                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={12}>
                                    <Text>
                                        <EnvironmentOutlined /> <strong>Address:</strong> {service.address}
                                    </Text>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Text>
                                        <PhoneOutlined /> <strong>Phone:</strong> {service.phone}
                                    </Text>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Text>
                                        <GlobalOutlined /> <strong>Website:</strong>{" "}
                                        <a href={`https://${service.website}`} target="_blank" rel="noopener noreferrer">
                                            {service.website}
                                        </a>
                                    </Text>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Text>
                                        <DollarOutlined /> <strong>Price:</strong> {service.price}
                                    </Text>
                                </Col>
                            </Row>
                        </Card>

                        {/* Phần Review */}
                        <Card className="review-card my-4">
                            <Row align="middle" justify="space-between">
                                <Col>
                                    <Title level={3}>Reviews</Title>
                                </Col>
                                <Col>
                                    <Row align="middle" gutter={8}>
                                        <Col>
                                            <Rate allowHalf disabled defaultValue={4.5} />
                                        </Col>
                                        <Col>
                                            <Text type="secondary">({service.reviews} reviews)</Text>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Button type="primary" className="my-2" onClick={handleShowModal}>
                                Write a Review
                            </Button>
                            <Divider />
                            <List
                                dataSource={reviews}
                                renderItem={(item) => (
                                    <CustomComment
                                        author={item.author}
                                        content={item.content}
                                        rating={item.rating}
                                    />
                                )}
                                pagination={{
                                    pageSize: 2,
                                    showSizeChanger: true,
                                    showTotal: (total) => `Total ${total} reviews`,
                                }}
                            />
                        </Card>
                    </div>
                </div>
            </div>
            <Footer />

            {/* Modal để viết đánh giá */}
            <Modal
                title="Tell us, how was your experience"
                visible={isModalVisible}
                onCancel={handleCloseModal}
                onOk={handleSubmitReview}
                okText="Submit Review"
            >
                <div>
                    <Rate value={rating} onChange={setRating} />
                    <TextArea
                        rows={4}
                        placeholder="Write your review here"
                        value={reviewContent}
                        onChange={(e) => setReviewContent(e.target.value)}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default ServiceDetails;
