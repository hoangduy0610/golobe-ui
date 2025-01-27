import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pagination, Input } from "antd";  // Sử dụng Pagination và Input từ Ant Design
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MiniHeader from "@/components/Header/MiniHeader";
import Footer from "@/components/Footer/Footer";
import beachImage from "@/assets/Beach.jpg";
import share from "@/assets/share.png";
import './Blog.scss'; // Sử dụng SCSS cho styling
import MainApiRequest from "@/redux/apis/MainApiRequest";

type Blog = {
    id: number;
    title: string;
    content: string;
    image: string;
    linkedServices: any[];
    user: any;
}

export function Blog() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Mỗi trang hiển thị 6 item
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [displayExplores, setDisplayExplores] = useState<Blog[]>([]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const fetchBlogs = async () => {
        try {
            // Gọi API để lấy danh sách blog
            const res = await MainApiRequest.get('/blog/list');
            setBlogs(res.data);
        } catch (error) {
            console.log("Failed to fetch blog list: ", error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = currentPage * itemsPerPage;
        setDisplayExplores(blogs.slice(startIndex, endIndex));
    }, [currentPage, blogs]);

    const htmlNormalizer = (html: string) => {
        return html.replace(/<[^>]*>?/gm, ' ');
    }

    return (
        <div className="blog_page">
            <div className="app">
                <div className="container-fluid">
                    <MiniHeader />
                    <div className="container">
                        {/* <section className="card shadow my-4 px-4 border-0">
                            <div className="card-body">
                                <Input className="search-input" placeholder="Search" />
                            </div>
                        </section> */}

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
                                        <Link to={`/blog-detail/${explore.id}`} className="text-decoration-none">
                                            <div className="featured-card">
                                                <img src={explore.image} alt={explore.title} className="featured-image" />
                                                <div className="featured-content">
                                                    <h4 className="featured-title">{explore.title}</h4>
                                                    <p className="featured-description">{htmlNormalizer(explore.content).slice(0, 100)}</p>
                                                    <p className="post-by">Post by <strong>{explore.user.name}</strong></p>
                                                    {/* <img src={share} alt="Share" className="share-icon" /> */}
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
                                    total={blogs.length}
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
