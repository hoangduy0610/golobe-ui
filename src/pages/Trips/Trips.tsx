import facebookIcon from "@/assets/facebook_icon.svg";
import footerLogo from "@/assets/footer_logo.svg";
import instagramIcon from "@/assets/instagram_icon.svg";
import newsletter from "@/assets/newsletter.svg";
import twitterIcon from "@/assets/twitter_icon.svg";
import youtubeIcon from "@/assets/youtube_icon.svg";
import MiniHeader from "@/components/Header/MiniHeader";
import "./Trips.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faLocation, faLocationPin } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import MainApiRequest from "@/redux/apis/MainApiRequest";
import moment from "moment";
import { useNavigate, useNavigation } from "react-router-dom";
import Footer from "@/components/Footer/Footer";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";

function Trips() {
    const navigate = useNavigate();
    const [location, listLocation] = useState<any[]>([]);
    const [listTrips, setListTrips] = useState<any[]>([]);
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const fetchTrips = async () => {
        const response = await MainApiRequest.get('/plan/mine');
        setListTrips(response.data);
    }

    const fetchLocation = async () => {
        const response = await MainApiRequest.get('/location/list');
        listLocation(response.data);
    }

    const handleRemoveTrip = async (id: number) => {
        const confirmDelete = window.confirm("Are you sure you want to remove this trip?");
        if (confirmDelete) {
            const response = await MainApiRequest.delete(`/plan/${id}`);
            if (response.status === 200) {
                // Cập nhật danh sách sau khi xóa
                fetchTrips();
            }
        }
    };

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
            locationId: parseInt(tripLocation),
            visibility: 'private'
        });

        if (response.status === 200) {
            fetchTrips();
            setShowCreateModal(false);
        }
    }

    const navigateToDetail = (id: number) => () => {
        navigate(`/trip-detail/${id}`);
    }

    return (
        <div className="trips_page">
            <div className="app">
                <div className="container-fluid">
                    <MiniHeader />
                    <div className="container">
                        {/* <section className="card shadow my-4 px-4 border-0">
                            <div className="card-body">
                                <input type="text" className="form-control bg-secondary py-3" placeholder="Search" />
                            </div>
                        </section> */}

                        <section className="my-4">
                            <h2 className="mt-3">My Trips</h2>
                            <button className="btn btn-primary my-2" onClick={handleOpenCreateModal}>Create a new trip</button>
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
                                                {/* Buttons for Edit and Remove */}
                                                <div className="action-buttons">
                                                    <Button
                                                        type="primary"
                                                        icon={<EditOutlined />}
                                                        size="small"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            navigateToDetail(trip.id)();
                                                        }}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        danger
                                                        icon={<DeleteOutlined />}
                                                        size="small"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleRemoveTrip(trip.id);
                                                        }}
                                                    >
                                        
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </section>
                    </div>
                    <Footer />
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
        </div>
    );
}

export default Trips;
