import facebookIcon from "@/assets/facebook_icon.svg";
import footerLogo from "@/assets/footer_logo.svg";
import instagramIcon from "@/assets/instagram_icon.svg";
import logo from "@/assets/logo.svg";
import maldives from "@/assets/maldives.jpg";
import newsletter from "@/assets/newsletter.svg";
import share from "@/assets/share.png";
import twitterIcon from "@/assets/twitter_icon.svg";
import youtubeIcon from "@/assets/youtube_icon.svg";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./Blog.css";

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

    const handleCategoryClick = (category: string) => {
        alert(`You selected ${category}`);
    };

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
        <div className="app">
            <div className="container-fluid">
                <header className="app-header">
                    <div className="logo">
                        <Link to="/">
                            <img src={logo} alt="Logo" />
                        </Link>
                    </div>
                    <nav className="navbar">
                        <ul className="nav-links">
                            <li>Hotels</li>
                            <li>Restaurants</li>
                            <li>Trips</li>
                            <li>Thing to do</li>
                            <li>Blog</li>
                            <li>Forum</li>
                        </ul>
                        <ul className="btn-group">
                            <li>Partner</li>
                            <li>Login</li>
                            <li className="btn btn-white">Sign Up</li>
                        </ul>
                    </nav>
                    <div className="hero">
                        <h2>Helping Others</h2>
                        <h1>LIVE & TRAVEL</h1>
                        <h4>Special offers to suit your plan</h4>
                    </div>
                </header>
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
                            {featuredExplores.map((explore) => (
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
                    </section>
                </div>
            </div>
            <footer>
                <div className="newsletter">
                    <div className="row">
                        <div className="col-8">
                            <h1 style={{ margin: '15px 0px' }}>
                                Subscribe <br /> Newsletter
                            </h1>
                            <strong>
                                The Travel
                            </strong>
                            <p>Get inspired! Receive travel discounts, tips and behind the scenes stories.</p>
                            <form className="d-flex w-75 flex-row align-items-center">
                                <input type="text" className="form-control py-3 me-3" id="inlineFormInputGroupUsername" placeholder="Your email address" />
                                <button type="submit" className="btn btn-dark py-3" style={{ background: '#112211' }}>Subscribe</button>
                            </form>
                        </div>
                        <div className="col-4">
                            <img src={newsletter} style={{ width: 'auto', height: '100%', maxWidth: '100%' }} />
                        </div>
                    </div>
                </div>
                <div className="row footer-content">
                    <div className="col">
                        <img src={footerLogo} />
                        <div className="row mt-3">
                            <div className="col">
                                <img src={facebookIcon} />
                                <img src={twitterIcon} className="ms-2" />
                                <img src={instagramIcon} className="ms-2" />
                                <img src={youtubeIcon} className="ms-2" />
                            </div>
                        </div>
                    </div>

                    <div className="col p-nm">
                        <h5 className="fw-bold">Travel Blog</h5>
                        <p>Bali Travel Guide</p>
                        <p>Sri Lanka Travel Guide</p>
                        <p>Maldives Travel Guide</p>
                        <p>Thailand Travel Guide</p>
                    </div>

                    <div className="col p-nm">
                        <h5 className="fw-bold">About Us</h5>
                        <p>Our Story</p>
                        <p>Work With Us</p>
                    </div>

                    <div className="col p-nm">
                        <h5 className="fw-bold">Contact Us</h5>
                        <p>Our Story</p>
                        <p>Work With Us</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
