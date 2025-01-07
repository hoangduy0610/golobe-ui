import React from "react";
import { Breadcrumb, Button, Card } from "antd";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import "./BlogDetail.scss";
import Header from "@/components/Header/Header";
import beachImage from "@/assets/Beach.jpg";
import Footer from "@/components/Footer/Footer";
import MainApiRequest from "@/redux/apis/MainApiRequest";
import moment from "moment";

const BlogDetail = () => {
    const { id } = useParams();

    // Dữ liệu mẫu
    const [blogData, setBlogData] = React.useState<any>({});

    const fetchBlogData = async () => {
        const res = await MainApiRequest.get(`/blog/${id}`);
        setBlogData(res.data);
    }

    React.useEffect(() => {
        fetchBlogData();
    }, []);

    return (
        <>
            <div className="blog-detail-page">
                <div className="app">
                    <div className="container-fluid">
                        <Header />
                        <div className="container-fluid w-75">
                            <Breadcrumb className="my-3">
                                <Breadcrumb.Item>
                                    <Link to="/">Home</Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    <Link to="/blog">Blog</Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>{blogData.title}</Breadcrumb.Item>
                            </Breadcrumb>

                            <Row>
                                <Col md={8}>
                                    <Card
                                        cover={<img alt={blogData.title} src={blogData.image} className="blog-detail-image" />}
                                    >
                                        <h1 className="blog-title">{blogData.title}</h1>
                                        <p className="blog-meta">
                                            By <strong>{blogData?.user?.name}</strong> | {moment(blogData.createdAt).format('DD/MM/YYYY HH:mm')}
                                        </p>
                                        <div
                                            className="blog-content"
                                            dangerouslySetInnerHTML={{ __html: blogData.content }}
                                        />
                                    </Card>
                                </Col>
                                <Col md={4}>
                                    {/* Linked Services */}
                                    <div className="linked-services">
                                        <h3>Linked Services</h3>
                                        <ul className="p-0">
                                            {blogData.linkedServices?.map((service: any) => (
                                                <Card key={service.id} className="mt-3">
                                                    <Row>
                                                        <Col
                                                            md={3}
                                                        >
                                                            <img
                                                                src={service.images[0]}
                                                                alt={service.name}
                                                                style={{ width: "100%", height: 'auto' }}
                                                            />
                                                        </Col>
                                                        <Col
                                                            md={8}
                                                        >
                                                            <h4>{service.name}</h4>
                                                            <Button type="primary" onClick={() => {
                                                                window.location.href = `/services/${service.id}`;
                                                            }}>View Service</Button>
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            ))}
                                        </ul>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div >
            </div >
            <Footer />
        </>
    );
};

export default BlogDetail;
