import React from "react";
import facebookIcon from "@/assets/facebook_icon.svg";
import footerLogo from "@/assets/footer_logo.svg";
import instagramIcon from "@/assets/instagram_icon.svg";
import newsletter from "@/assets/newsletter.svg";
import twitterIcon from "@/assets/twitter_icon.svg";
import youtubeIcon from "@/assets/youtube_icon.svg";
import "./Footer.scss";


export default function Footer() {
    return (
        <footer>
            <div className="newsletter">
                <div className="row">
                    <div className="col-8">
                        <h1 style={{ margin: "15px 0px" }}>
                            Subscribe <br /> Newsletter
                        </h1>
                        <strong>The Travel</strong>
                        <p>Get inspired! Receive travel discounts, tips and behind the scenes stories.</p>
                        <form className="d-flex d-none d-md-flex w-75 flex-row align-items-center">
                            <input
                                type="text"
                                className="form-control py-3 me-3"
                                placeholder="Your email address"
                            />
                            <button
                                type="submit"
                                className="btn btn-dark py-3"
                                style={{ background: "#112211" }}
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                    <div className="col-4">
                        <img
                            src={newsletter}
                            style={{ width: "auto", height: "100%", maxWidth: "100%" }}
                            alt="Newsletter"
                        />
                    </div>
                    <div className="col-12 col-md-8 d-md-none">
                        <form className="d-flex w-md-75 flex-row align-items-center">
                            <input
                                type="text"
                                className="form-control py-3 me-3"
                                placeholder="Your email address"
                            />
                            <button
                                type="submit"
                                className="btn btn-dark py-3"
                                style={{ background: "#112211" }}
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="row footer-content">
                <div className="col-6 col-md-3">
                    <img src={footerLogo} alt="Footer Logo" />
                    <div className="row mt-3">
                        <div className="col">
                            <img src={facebookIcon} alt="Facebook" />
                            <img src={twitterIcon} className="ms-2" alt="Twitter" />
                            <img src={instagramIcon} className="ms-2" alt="Instagram" />
                            <img src={youtubeIcon} className="ms-2" alt="YouTube" />
                        </div>
                    </div>
                </div>

                <div className="col-6 col-md-3 p-nm">
                    <h5 className="fw-bold">Travel Blog</h5>
                    <p>Bali Travel Guide</p>
                    <p>Sri Lanka Travel Guide</p>
                    <p>Maldives Travel Guide</p>
                    <p>Thailand Travel Guide</p>
                </div>

                <div className="col-6 col-md-3 p-nm">
                    <h5 className="fw-bold">About Us</h5>
                    <p>Our Story</p>
                    <p>Work With Us</p>
                </div>

                <div className="col-6 col-md-3 p-nm">
                    <h5 className="fw-bold">Contact Us</h5>
                    <p>Our Story</p>
                    <p>Work With Us</p>
                </div>
            </div>
        </footer>
    );
}
