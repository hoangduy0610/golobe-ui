import facebookIcon from "@/assets/facebook_icon.svg";
import footerLogo from "@/assets/footer_logo.svg";
import instagramIcon from "@/assets/instagram_icon.svg";
import newsletter from "@/assets/newsletter.svg";
import twitterIcon from "@/assets/twitter_icon.svg";
import youtubeIcon from "@/assets/youtube_icon.svg";
import Header from "@/components/Header/Header";
import "./Trips.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faLocation, faLocationPin } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import MainApiRequest from "@/redux/apis/MainApiRequest";
import moment from "moment";
import { useNavigate, useNavigation } from "react-router-dom";

function Trips() {
    const navigate = useNavigate();
    const [location, listLocation] = useState<any[]>([]);
    const [listTrips, setListTrips] = useState<any[]>([]);
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const fetchTrips = async () => {
        const response = await MainApiRequest.get('/plan/list');
        setListTrips(response.data);
    }

    const fetchLocation = async () => {
        const response = await MainApiRequest.get('/location/list');
        listLocation(response.data);
    }

    useEffect(() => {
        if (listTrips.length === 0) {
            fetchTrips();
        }

        if (location.length === 0) {
            fetchLocation();
        }
    }, []);

    const handleOpenCreateModal = () => {
        setShowCreateModal(true);
    }

    const handleCloseCreateModal = () => {
        setShowCreateModal(false);
    }

    const createPlan = async () => {
        const tripName = (document.getElementById('tripName') as HTMLInputElement).value;
        const tripDescription = (document.getElementById('tripDescription') as HTMLInputElement).value;
        const tripStartDate = startDate;
        const tripEndDate = endDate;
        const tripLocation = (document.getElementById('tripLocation') as HTMLSelectElement).value;

        const response = await MainApiRequest.post('/plan', {
            name: tripName,
            description: tripDescription,
            startDate: tripStartDate,
            endDate: tripEndDate,
            locationId: parseInt(tripLocation)
        });

        if (response.status === 200) {
            fetchTrips();
            setShowCreateModal(false);
        }
    }

    const navigateToDetail = (id: number) => () => {
        navigate(`/trips/${id}`);
    }

    return (
        <div className="app">
            <div className="container-fluid">
                <Header />
                <div className="container">
                    <section className="card shadow my-4 px-4 border-0">
                        <div className="card-body">
                            <input type="text" className="form-control bg-secondary py-3" placeholder="Search" />
                        </div>
                    </section>

                    <section>
                        <h2>My Trips</h2>
                        <button className="btn btn-primary" onClick={handleOpenCreateModal}>Create a new trip</button>
                        {listTrips.map((trip, index) => (
                            <div className="card mb-3" onClick={navigateToDetail(trip.id)}>
                                <div className="row g-0">
                                    <div className="col-md-4" style={{ maxHeight: 200, overflow: 'hidden', borderRadius: '16px 0px 0px 16px' }} >
                                        <div style={{
                                            backgroundImage: `url(${trip.location.featureImage})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            width: '100%',
                                            height: '100%'
                                        }}></div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">{trip.name}</h5>
                                            <p className="card-text">{trip.description}</p>
                                            <p className="card-text">
                                                <FontAwesomeIcon icon={faCalendar} /> {moment(trip.startDate).format('DD-MM-YYYY')} - {moment(trip.endDate).format('DD-MM-YYYY')}
                                            </p>
                                            <p className="card-text">
                                                <FontAwesomeIcon icon={faLocation} /> {trip.location.name}, {trip.location.address}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>
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

            {
                showCreateModal && (
                    <div className="modal" role="dialog" style={{ display: 'block', background: '#000000a0' }} onClick={(e) => {
                        if (e.target !== e.currentTarget)
                            return;
                        handleCloseCreateModal();
                    }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Create a new trip</h5>
                                    <button type="button" className="btn-close" onClick={handleCloseCreateModal}>
                                        <span>
                                            &times;
                                        </span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="tripName" className="form-label">Trip Name</label>
                                            <input type="text" className="form-control" id="tripName" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="tripDescription" className="form-label">Description</label>
                                            <textarea className="form-control" id="tripDescription" rows={3}></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="tripStartDate" className="form-label">Start Date</label>
                                            <input type="date" className="form-control" id="tripStartDate" value={startDate} onChange={(e) => { setStartDate(e.target.valueAsDate?.toISOString()?.split('T')[0] || '') }} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="tripEndDate" className="form-label">End Date</label>
                                            <input type="date" className="form-control" id="tripEndDate" value={endDate} onChange={(e) => { setEndDate(e.target.valueAsDate?.toISOString()?.split('T')[0] || '') }} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="tripLocation" className="form-label">Location</label>
                                            <select className="form-control" id="tripLocation">
                                                {location.map((loc, index) => (
                                                    <option key={index} value={loc.id}>{loc.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <button type="button" className="btn btn-primary" onClick={createPlan}>Create</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Trips;
