import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb, Card, Typography, Row, Col, Divider, Carousel, Button, List, Input, Rate, Modal } from "antd";
import { EnvironmentOutlined, PhoneOutlined, GlobalOutlined, DollarOutlined } from "@ant-design/icons";
import "./ServiceDetail.scss";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import hotelImage from "@/assets/hotel.jpg";
import CustomComment from "./CustomComment";
import MainApiRequest from "@/redux/apis/MainApiRequest";

const { Title, Text } = Typography;
const { TextArea } = Input;

type Review = {
    id: number;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    user: any;
};

type Service = {
    id: number;
    name: string;
    images: string[];
    description: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    features: string[];
    priceRange: string;
    price: number | null;
    serviceTypeId: number;
    openingHours: {
        day: string;
        hours: string;
        customHours: {
            open: string;
            close: string;
        };
    }[];
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    serviceType: {
        id: number;
        name: string;
        filters: string[];
        createdAt: string;
        updatedAt: string;
        deletedAt: string | null;
    };
    reviews: Review[];
};

const ServiceDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Lấy ID từ URL

    // Dữ liệu mẫu dịch vụ
    const [service, setService] = useState<Service>();

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

    const handleSubmitReview = async () => {
        const data = {
            rating,
            comment: reviewContent,
            serviceId: parseInt(id || "0"),
        }

        try {
            // Gửi đánh giá lên server
            await MainApiRequest.post("/review", data);
            // Cập nhật lại dữ liệu dịch vụ
            fetchService();
        } catch (error) {
            console.log("Failed to submit review: ", error);
        }
        // Đóng modal sau khi gửi đánh giá
        setIsModalVisible(false);
    };

    const fetchService = async () => {
        try {
            // Gọi API để lấy dữ liệu dịch vụ theo ID
            const res = await MainApiRequest.get(`/service/${id}`);
            setService(res.data);
        } catch (error) {
            console.log("Failed to fetch service details: ", error);
        }
    }

    useEffect(() => {
        fetchService();
    }, []);

    const calculateReview = (reviews: Review[]) => {
        if (reviews.length === 0) return 0;
        const totalRating = reviews.reduce((total, review) => total + review.rating, 0);
        // Round to half star
        return totalRating / reviews.length;
    }

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
                            <Breadcrumb.Item>{service?.name}</Breadcrumb.Item>
                        </Breadcrumb>

                        {/* Tiêu đề */}
                        <Title level={1}>{service?.name}</Title>
                        <Text type="secondary" className="service-meta">
                            <strong>{service?.reviews.length} reviews</strong> | <strong>Type:</strong> {service?.serviceType.name}
                        </Text>

                        {/* Card "About" */}
                        <Card className="about-card my-4">
                            <Row gutter={[16, 16]} align="middle">
                                <Col xs={24} md={14}>
                                    <Title level={3}>About</Title>
                                    <Text>{service?.description}</Text>
                                </Col>
                                <Col xs={24} md={10}>
                                    {/* Carousel cho ảnh */}
                                    <Carousel autoplay className="carousel">
                                        {service?.images.map((image, index) => (
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
                                        <EnvironmentOutlined /> <strong>Address:</strong> {service?.address}
                                    </Text>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Text>
                                        <PhoneOutlined /> <strong>Phone:</strong> {service?.phone}
                                    </Text>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Text>
                                        <GlobalOutlined /> <strong>Website:</strong>{" "}
                                        <a href={`https://${service?.website}`} target="_blank" rel="noopener noreferrer">
                                            {service?.website}
                                        </a>
                                    </Text>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Text>
                                        <DollarOutlined /> <strong>Price Range:</strong> {service?.priceRange} {service?.price && `($${service.price})`}
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
                                            <Rate allowHalf disabled value={calculateReview(service?.reviews || [])} />
                                        </Col>
                                        <Col>
                                            <Text type="secondary">({service?.reviews.length} reviews)</Text>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Button type="primary" className="my-2" onClick={handleShowModal}>
                                Write a Review
                            </Button>
                            <Divider />
                            <List
                                dataSource={service?.reviews}
                                renderItem={(item) => (
                                    <CustomComment
                                        author={item?.user?.name}
                                        content={item.comment}
                                        rating={item.rating}
                                    />
                                )}
                                pagination={{
                                    pageSize: 5,
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
