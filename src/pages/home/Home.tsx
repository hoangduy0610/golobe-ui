import facebookIcon from "@/assets/facebook_icon.svg";
import footerLogo from "@/assets/footer_logo.svg";
import instagramIcon from "@/assets/instagram_icon.svg";
import logo from "@/assets/logo.svg";
import maldives from "@/assets/maldives.jpg";
import newsletter from "@/assets/newsletter.svg";
import reviewImg from "@/assets/review_img.jpg";
import twitterIcon from "@/assets/twitter_icon.svg";
import youtubeIcon from "@/assets/youtube_icon.svg";
import { faCalendarDays, faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import "./Home.css";

export function Home() {
    return (
        <div className="app">
            <div className="container-fluid">
                <header className="app-header">
                    <div className="logo">
                        <img src={logo} alt="Logo" />
                    </div>
                    <nav className="navbar">
                        <ul className="nav-links">
                            <li>Hotels</li>
                            <li>Restaurants</li>
                            <li>Trips</li>
                            <li>Thing to do</li>
                            <li><Link to="/blog">Blog</Link></li>
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

                    <section className="my-4">
                        <div className="row">
                            <div className="col col-md-10">
                                <h2 className="d-flex flex-1">Plan your perfect trip</h2>
                            </div>
                            <div className="col col-md-2">
                                <button type="button" className="btn btn-outline-primary">See more places</button>
                            </div>
                        </div>
                        <div className="row">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div key={index} className="col col-md-4 mt-4">
                                    <div className="card shadow border-0">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center">
                                                <div className="squircle-img">
                                                    <img src={maldives} className="w-100" />
                                                </div>
                                                <div className="d-flex ms-2 flex-column">
                                                    <p style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>Malé, Maldives</p>
                                                    <p style={{ fontSize: 14, margin: 0 }}>Restaurants • Hotels • Things to do</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="my-4">
                        <div className="row">
                            <div className="col col-md-10">
                                <h2 className="d-flex flex-1">My trips</h2>
                            </div>
                            <div className="col col-md-2">
                                <button type="button" className="btn btn-outline-primary">See more places</button>
                            </div>
                        </div>
                        <div className="row">
                            {Array.from({ length: 2 }).map((_, index) => (
                                <div key={index} className="col col-md-12 mt-4">
                                    <div className="card shadow border-0">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center">
                                                <div className="squircle-img squircle-img-lg">
                                                    <img src={maldives} className="w-100" />
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
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="my-4">
                        <div className="row">
                            <div className="col col-md-10">
                                <h2 className="d-flex flex-1">Reviews</h2>
                            </div>
                            <div className="col col-md-2">
                                <button type="button" className="btn btn-outline-primary">See more places</button>
                            </div>
                        </div>
                        <div className="row">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <div key={index} className="col col-md-4 mt-4">
                                    <div className="card shadow border-0 card-review">
                                        <div className="card-body">
                                            <h4>“A real sense of community, nurtured”</h4>
                                            <p>Really appreciate the help and support from the staff during these tough times.
                                                Shoutout to Katie for helping me always, even when I was out of the country.
                                                And always available when needed.</p>
                                            <strong style={{ float: 'right' }}>View more</strong><br />
                                            <div className="rating" style={{ margin: '20px 0px' }}>
                                                <FontAwesomeIcon icon={faStar} style={{ color: "#FFC107", fontSize: 24 }} />
                                                <FontAwesomeIcon icon={faStar} style={{ color: "#FFC107", fontSize: 24 }} />
                                                <FontAwesomeIcon icon={faStar} style={{ color: "#FFC107", fontSize: 24 }} />
                                                <FontAwesomeIcon icon={faStar} style={{ color: "#FFC107", fontSize: 24 }} />
                                                <FontAwesomeIcon icon={faStar} style={{ color: "#FFC107", fontSize: 24 }} />
                                            </div>
                                            <strong>Olga</strong>
                                            <p>Weave Studios - Kai Tak</p>
                                            <div className="review-img">
                                                <img src={reviewImg} className="w-100" />
                                            </div>
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