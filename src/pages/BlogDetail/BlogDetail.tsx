import React from "react";
import { Breadcrumb, Button, Card } from "antd";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import "./BlogDetail.scss";
import Header from "@/components/Header/Header";
import beachImage from "@/assets/Beach.jpg";
import Footer from "@/components/Footer/Footer";

const BlogDetail = () => {
    const { id } = useParams();

    // Dữ liệu mẫu
    const blogData = {
        id: 1,
        title: "Exploring the Maldives",
        author: "John Doe",
        date: "Nov 24, 2024",
        content: `
      The Maldives is a tropical paradise known for its white sandy beaches, crystal-clear waters, and luxury resorts. 
      In this guide, we’ll explore the best places to visit, activities to try, and tips for making the most of your Maldives adventure.
    `,
        image: beachImage,
    };

    return (
        <>
            <div className="blog-detail-page">
                <div className="app">
                    <div className="container-fluid">
                        <Header />
                        <div className="container">
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
                                <Col md={11}>
                                    <Card
                                        cover={<img alt={blogData.title} src={blogData.image} className="blog-detail-image" />}
                                    >
                                        <h1 className="blog-title">{blogData.title}</h1>
                                        <p className="blog-meta">
                                            By <strong>{blogData.author}</strong> | {blogData.date}
                                        </p>
                                        <p className="blog-content">{blogData.content}</p>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default BlogDetail;
