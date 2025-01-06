import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Pagination, Input } from "antd";  // Sử dụng Pagination và Input từ Ant Design
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import beachImage from "@/assets/Beach.jpg";
import share from "@/assets/share.png";
import './Blog.scss'; // Sử dụng SCSS cho styling

export function Blog() {
    const featuredExplores = [
        { id: 1, title: "Exploring the Maldives", image: beachImage, description: "Discover the beauty of the Maldives with our guide.", author: "John Doe" },
        { id: 2, title: "Beach Adventures", image: beachImage, description: "Enjoy the best beach adventures around the world.", author: "Jane Smith" },
        { id: 3, title: "Mountain Hiking", image: beachImage, description: "Get ready for an unforgettable mountain hiking experience.", author: "Emily Johnson" },
        { id: 4, title: "City Tours", image: beachImage, description: "Explore the best cities with our curated tours.", author: "Michael Brown" },
        { id: 5, title: "Desert Safari", image: beachImage, description: "Experience the thrilling desert safaris.", author: "Sarah Lee" },
        { id: 6, title: "Forest Trails", image: beachImage, description: "Discover hidden forest trails and adventures.", author: "Chris Green" },
        { id: 7, title: "Island Hopping", image: beachImage, description: "Hop from one beautiful island to another.", author: "Anna White" },
        { id: 8, title: "Cultural Heritage", image: beachImage, description: "Explore cultural heritage sites around the world.", author: "James Black" }
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Mỗi trang hiển thị 6 item
    const totalPages = Math.ceil(featuredExplores.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const displayExplores = featuredExplores.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="blog_page">
            <div className="app">
                <div className="container-fluid">
                    <Header />
                    <div className="container">
                        <section className="card shadow my-4 px-4 border-0">
                            <div className="card-body">
                                <Input className="search-input" placeholder="Search" />
                            </div>
                        </section>

                        {/* Featured Explore Section */}
                        <section className="featured-explore-section my-4">
                            <div className="row justify-content-center">
                                <div className="col-md-10 text-center">
                                    <h2 className="section-title">Featured Explore</h2>
                                </div>
                            </div>

                            <div className="row">
                                {displayExplores.map((explore) => (
                                    <div key={explore.id} className="col-md-4 mb-4"> {/* Chuyển sang 3 cột */}
                                        <Link to="/blog-detail" className="text-decoration-none">
                                            <div className="featured-card">
                                                <img src={explore.image} alt={explore.title} className="featured-image" />
                                                <div className="featured-content">
                                                    <h4 className="featured-title">{explore.title}</h4>
                                                    <p className="featured-description">{explore.description}</p>
                                                    <p className="post-by">Post by <strong>{explore.author}</strong></p>
                                                    <img src={share} alt="Share" className="share-icon" />
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="pagination-container">
                                <Pagination
                                    current={currentPage}
                                    pageSize={itemsPerPage}
                                    total={featuredExplores.length}
                                    onChange={handlePageChange}
                                    showSizeChanger={false}
                                    showQuickJumper
                                />
                            </div>
                        </section>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}
