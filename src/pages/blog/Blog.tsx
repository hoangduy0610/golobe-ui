import React, { useState } from "react";
import logo from "@/assets/logo.svg";
import share from "@/assets/share.png";
import maldives from "@/assets/maldives.jpg";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Blog.css";
import Header from "@/components/Header/Header";

export function Blog() {
    const categories = [
        { id: 1, name: "Adventure", image: maldives },
        { id: 2, name: "Beach", image: maldives },
        { id: 3, name: "Mountain", image: maldives },
        { id: 4, name: "City", image: maldives },
        { id: 5, name: "Desert", image: maldives },
        { id: 6, name: "Forest", image: maldives },
    ];

    const featuredExplores = [
        { id: 1, title: "Exploring the Maldives", image: maldives, description: "Discover the beauty of the Maldives with our guide.", author: "John Doe" },
        { id: 2, title: "Beach Adventures", image: maldives, description: "Enjoy the best beach adventures around the world.", author: "Jane Smith" },
        { id: 3, title: "Mountain Hiking", image: maldives, description: "Get ready for an unforgettable mountain hiking experience.", author: "Emily Johnson" },
        { id: 4, title: "City Tours", image: maldives, description: "Explore the best cities with our curated tours.", author: "Michael Brown" },
        { id: 5, title: "Desert Safari", image: maldives, description: "Experience the thrilling desert safaris.", author: "Sarah Lee" },
        { id: 6, title: "Forest Trails", image: maldives, description: "Discover hidden forest trails and adventures.", author: "Chris Green" },
        { id: 7, title: "Island Hopping", image: maldives, description: "Hop from one beautiful island to another.", author: "Anna White" },
        { id: 8, title: "Cultural Heritage", image: maldives, description: "Explore cultural heritage sites around the world.", author: "James Black" }
    ];

    const latestBlogs = [
        { id: 1, title: "A Journey Through the Mountains", image: maldives, author: "Laura Martin", date: "Nov 24, 2024", excerpt: "Explore the breathtaking views and challenging trails of the mountains..." },
        { id: 2, title: "City Adventures for the Urban Explorer", image: maldives, author: "Mark Twain", date: "Nov 22, 2024", excerpt: "Discover the hidden gems and vibrant culture of the world's greatest cities..." },
        { id: 3, title: "Beachside Bliss: Top Destinations", image: maldives, author: "Emma Watson", date: "Nov 20, 2024", excerpt: "Find your perfect beach getaway with our top picks for sun, sand, and surf..." },
        { id: 4, title: "Desert Safaris: An Experience Like No Other", image: maldives, author: "Luke Skywalker", date: "Nov 18, 2024", excerpt: "Experience the thrill of a desert safari and uncover the secrets of the sands..." },
    ];

    const handleCategoryClick = (category: string) => {
        alert(`You selected ${category}`);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const totalPages = Math.ceil(featuredExplores.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const displayExplores = featuredExplores.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <div className="arrow-icon next-arrow"><FaArrowRight /></div>,
        prevArrow: <div className="arrow-icon prev-arrow"><FaArrowLeft /></div>,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div>
            <Header />
            <div className="container">
                <section className="card shadow my-4 px-4 border-0">
                    <div className="card-body">
                        <input type="text" className="form-control bg-secondary py-3" placeholder="Search" />
                    </div>
                </section>

                <div className="category-section">
                    <div className="row justify-content-center">
                        <div className="col-md-10 text-center">
                            <h2 className="section-title">Choose a category</h2>
                        </div>
                    </div>

                    <Slider {...settings}>
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className="category-card-container"
                                onClick={() => handleCategoryClick(category.name)}
                            >
                                <div
                                    className="category-card"
                                    style={{
                                        backgroundImage: `url(${category.image})`,
                                    }}
                                >
                                    <div className="category-overlay">
                                        <h3>{category.name}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>

                <section className="my-4 featured-explore-section">
                    <div className="row justify-content-center">
                        <div className="col-md-10 text-center">
                            <h2 className="section-title">Featured explore</h2>
                        </div>
                    </div>

                    <div className="row">
                        {displayExplores.map((explore) => (
                            <div key={explore.id} className="col-md-3 mb-4">
                                <div className="featured-card">
                                    <img src={explore.image} alt={explore.title} className="featured-image" />
                                    <div className="featured-content">
                                        <h4 className="featured-title">{explore.title}</h4>
                                        <p className="featured-description">{explore.description}</p>
                                        <p className="post-by">Post by <strong>{explore.author}</strong></p>
                                        <img src={share} alt="Share" className="share-icon" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                className={`page-button ${currentPage === index + 1 ? "active" : ""}`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </section>

                <section className="latest-blog-section my-4">
                    <div className="row justify-content-center">
                        <div className="col-md-10 text-center">
                            <h2 className="section-title">Latest Blog</h2>
                        </div>
                    </div>

                    <div className="row">
                        {latestBlogs.map((blog) => (
                            <div key={blog.id} className="col-md-10 mb-4 latest-blog-card">
                                <div className="d-flex align-items-center">
                                    <img src={blog.image} alt={blog.title} className="latest-blog-image mr-3" />
                                    <div className="latest-blog-content">
                                        <h4 className="latest-blog-title">{blog.title}</h4>
                                        <p className="latest-blog-author">By {blog.author}</p>
                                        <p className="latest-blog-date">{blog.date}</p>
                                        <p className="latest-blog-excerpt">{blog.excerpt}</p>
                                    </div>
                                    <img src={share} alt="Share" className="share-icon" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
