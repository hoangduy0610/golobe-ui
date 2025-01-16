import facebookIcon from "@/assets/facebook_icon.svg";
import footerLogo from "@/assets/footer_logo.svg";
import instagramIcon from "@/assets/instagram_icon.svg";
import invite from "@/assets/invite.png";
import newsletter from "@/assets/newsletter.svg";
import reviewImg from "@/assets/review_img.jpg";
import setting from "@/assets/setting.png";
import sharePlan from "@/assets/share_plan.png";
import twitterIcon from "@/assets/twitter_icon.svg";
import youtubeIcon from "@/assets/youtube_icon.svg";
import Header from "@/components/Header/Header";
import MainApiRequest from "@/redux/apis/MainApiRequest";
import moment from "moment";
import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { useNavigate, useParams } from "react-router-dom";
import "./TripDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhoneAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Form, Input, Modal } from "antd";

function TripDetail() {
    const navigate = useNavigate();
    const [modal, contextHolder] = Modal.useModal()
    const [form] = Form.useForm();
    // Retrive id from route params
    const { id } = useParams<{ id: string }>();
    const [trip, setTrip] = useState<any>(null);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [isAddTabOpen, setIsAddTabOpen] = useState(false);
    const [isDetailTabOpen, setIsDetailTabOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('itinerary');
    const [goingToAddItem, setGoingToAddItem] = useState<any>(null);
    const [location, setListLocation] = useState<any[]>([]);
    const [service, setListService] = useState<any[]>([]);
    const [schedulingDay, setSchedulingDay] = useState(0);

    const fetchLocation = async () => {
        const response = await MainApiRequest.get('/location/list');
        setListLocation(response.data);
    }

    const fetchService = async () => {
        const response = await MainApiRequest.get('/service/list');
        setListService(response.data);
    }

    useEffect(() => {
        if (location.length === 0) {
            fetchLocation();
        }

        if (service.length === 0) {
            fetchService();
        }
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        locationId: '',
        description: '',
        visibility: 'private',
        startDate: moment().format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD'),
    });

    const fetchTrip = async (id?: string) => {
        if (!id) return;
        // Call API to get trip detail by id
        const response = await MainApiRequest.get(`/plan/${id}`);
        setTrip(response.data);
        setFormData({
            name: response.data.name,
            locationId: response.data?.location?.id?.toString(),
            description: response.data.description,
            visibility: response.data.visibility,
            startDate: moment(response.data.startDate).format('YYYY-MM-DD'),
            endDate: moment(response.data.endDate).format('YYYY-MM-DD'),
        });
        console.log('Trip detail:', response.data);
    };

    useEffect(() => {
        if (!trip && id) {
            fetchTrip(id);
        }
    }, [id]);

    const toggleAddTab = (scheduleDay: number) => {
        setIsAddTabOpen(!isAddTabOpen);
        setSchedulingDay(scheduleDay);
    };

    const toggleEditModal = () => {
        setIsEditModalOpen(!isEditModalOpen);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAction = async (action: 'save' | 'delete') => {
        if (action === 'save') {
            // Call API to save changes
            if (formData.locationId === '') {
                alert('Please select a location');
                return;
            }

            await MainApiRequest.put(`/plan/${id}`, {
                ...formData,
                startDate: moment(formData.startDate).format('YYYY-MM-DD'),
                endDate: moment(formData.endDate).format('YYYY-MM-DD'),
                locationId: parseInt(formData.locationId),
            });
            fetchTrip(id);
        } else if (action === 'delete') {
            // Call API to delete trip
            // await MainApiRequest.delete(`/plan/${id}`);
        }
        setIsEditModalOpen(false);
    };

    const handleItemClick = (item: any, day: number) => {
        // setSelectedItem({
        //     ...item,
        //     selectedDay: day,
        // });
        // setIsDetailTabOpen(true);
        navigate(`/services/${item?.service?.id}`);
    };

    const handleRemoveServiceFromDay = async () => {
        if (!selectedItem) return;
        await MainApiRequest.delete(`/plan/schedule/item`, {
            data: {
                planId: trip.id,
                serviceId: selectedItem?.service?.id,
                day: selectedItem.selectedDay,
            }
        });
        fetchTrip(id);
        closeDetailTab();
    }

    const closeDetailTab = () => {
        setIsDetailTabOpen(false);
        setSelectedItem(null);
    };

    const toggleItemSelected = (item: any) => {
        setGoingToAddItem(item);
    };


    const handleAddToItinerary = async () => {
        setIsAddTabOpen(false);
        await MainApiRequest.post(`/plan/schedule/item`, {
            planId: trip.id,
            serviceId: goingToAddItem.id,
            days: [
                schedulingDay
            ],
            startTime: "08:00",
            endTime: "22:00",
            reservationCode: "SADAS",
            note: "remark"
        });
        setGoingToAddItem(null);
        setSchedulingDay(0);
        fetchTrip(id);
    };

    const renderItineraries = () => {
        if (!trip || !trip?.schedule) return null;

        return trip?.schedule.map((schedule: any) => {
            // use momentjs to convert from day 1, day 2, ... to correct day since the trip started
            const scheduleDay = moment(trip.startDate).add(schedule.day - 1, 'days').format('dddd, MMM DD');
            return (
                <Accordion defaultActiveKey="0" style={{ marginTop: 20 }}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header><strong style={{ fontSize: '1.25rem' }}>{scheduleDay} (Day {schedule.day}) - {schedule.location.name}</strong></Accordion.Header>
                        <Accordion.Body>
                            {
                                schedule?.items && schedule.items.map((item: any) => (
                                    <div className="item" onClick={() => handleItemClick(item, schedule.day)}>
                                        <img src={item?.service?.images ? item?.service?.images[0] : ''} alt="Things to Do" className="item-image" />
                                        <span className="item-name">
                                            <h4>{item?.service?.name || ''}</h4>
                                            <p> <FontAwesomeIcon icon={faLocationDot} /> {item?.service?.address}</p>
                                            <p> <FontAwesomeIcon icon={faPhoneAlt} /> {item?.service?.phone}</p>
                                        </span>
                                    </div>
                                ))
                            }
                            {
                                isOwner &&
                                <button className="btn-add" onClick={() => toggleAddTab(schedule.day)}>+ Add</button>
                            }
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            )
        });
    }

    const isOwner = trip?.owner?.id?.toString() === localStorage.getItem('userId');

    const handleShare = async () => {
        let continious = true;
        if (!trip || trip.visibility !== 'public') {
            // Prompt user to change visibility to public
            // message.error('Please change the visibility of the trip to public to share it');
            await modal.confirm({
                title: 'Please change the visibility of the trip to public to share it',
                onOk: async () => {
                    await MainApiRequest.put(`/plan/${id}`, {
                        name: trip?.name,
                        description: trip?.description,
                        locationId: trip?.location?.id,
                        startDate: trip?.startDate,
                        endDate: trip?.endDate,
                        visibility: 'public',
                    });
                    fetchTrip(id);
                },
                onCancel: () => {
                    continious = false;
                }
            });
        }

        if (!continious) return;

        // Call API to share the trip
        await modal.confirm({
            title: 'Share this trip',
            content: (
                <div>
                    <h4>Content publishing to forum</h4>
                    <Form
                        form={form} layout="vertical"
                        initialValues={
                            {
                                title: `My plan for a trip to ${trip?.location?.name || 'a beauty landscape'}`,
                                content: `I'm planning a trip to ${trip?.location?.name || 'a beauty landscape'} and here is my itinerary: ${window.location.href}`
                            }
                        }
                    >
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[{ required: true, message: 'Please input the title!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Content"
                            name="content"
                            rules={[{ required: true, message: 'Please input the content!' }]}
                        >
                            <Input.TextArea rows={4} />
                        </Form.Item>
                    </Form>
                </div>
            ),
            onOk: async () => {
                await MainApiRequest.post('/forum', {
                    title: form.getFieldValue('title'),
                    content: form.getFieldValue('content'),
                });

                await modal.success({
                    title: 'Shared successfully',
                    onOk: () => {

                    },
                    cancelButtonProps: { style: { display: 'none' } }
                });
            },
            onCancel: () => {
                continious = false;
            }
        });

        if (!continious) return;

        window.location.href = '/forum';
    }

    return (
        <div className="trip_detail_page">
            <div className="app">
                <div className="container-fluid">
                    <Header />
                    <div className="container">
                        {contextHolder}
                        <section className="card shadow my-4 px-4 border-0">
                            <div className="card-body">
                                <input type="text" className="form-control bg-secondary py-3" placeholder="Search" />
                            </div>
                        </section>
                        <div className="frame" style={{ backgroundImage: `url(${trip?.location?.featureImage})` }}>
                            <div className="frame-header" hidden={!isOwner}>
                                {/* <button className="button button-invite">
                                    <img src={invite} alt="Invite" className="button-icon" /> Invite
                                </button> */}
                                <button className="button button-share" onClick={handleShare}>
                                    <img src={sharePlan} alt="Share" className="button-icon" />
                                </button>
                                <button className="button button-edit" onClick={toggleEditModal}>
                                    <img src={setting} alt="Edit" className="button-icon" />
                                </button>
                            </div>
                        </div>
                        <div className="tabs-container">
                            <button
                                className={`tab-button ${activeTab === 'itinerary' ? 'active' : ''}`}
                                onClick={() => setActiveTab('itinerary')}
                            >
                                Itinerary
                            </button>

                        </div>
                        <div className="tab-content">
                            {activeTab === 'itinerary' && renderItineraries()}
                            <div className="tab-content">
                                {activeTab === 'favourite' && (
                                    <div>For Favourite</div>
                                )}
                            </div>
                            {activeTab === 'foryou' && <div>For You content goes here</div>}
                        </div>
                    </div>
                </div>

                {/* Add Tab for Things to Do, Place to Stay, etc. */}
                {isAddTabOpen && (
                    <div>
                        <div className="overlay active" onClick={() => setIsAddTabOpen(false)}></div>
                        <div className="add-tab">
                            <div className="add-tab-header">
                                <h2>Add Service for plan</h2>
                                <button className="btn-close" onClick={() => setIsAddTabOpen(false)}>&times;</button>
                            </div>
                            <div className="add-tab-body">
                                <input type="text" className="search-input" placeholder="Search..." />
                                <div className="add-items">
                                    {service.map(item => (
                                        <div
                                            key={item.id}
                                            className={`item ${goingToAddItem?.id === item?.id ? 'selected' : ''}`}
                                            onClick={() => toggleItemSelected(item)}
                                        >
                                            <img src={item.images[0]} alt={item.name} className="item-image" />
                                            <span className="item-name">{item.name}</span>
                                        </div>
                                    ))}
                                </div>
                                <button className="btn-add-to-itinerary" onClick={handleAddToItinerary}>Add to Schedule</button>
                            </div>
                        </div>
                    </div>
                )}


                {/* Edit Modal */}
                {isEditModalOpen && (
                    <div className="edit-modal">
                        <div className="edit-modal-content">
                            <h2>Edit Trip</h2>
                            <form>
                                <div className="form-group">
                                    <label>Trip Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        placeholder="Enter trip name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Visibility</label>
                                    <select
                                        name="visibility"
                                        value={formData.visibility}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    >
                                        <option value="public">Public</option>
                                        <option value="private">Private</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Destination</label>
                                    <select
                                        name="locationId"
                                        value={formData.locationId}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    >
                                        {
                                            location.map((loc: any) => (
                                                <option value={loc.id}>{loc.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Start Date</label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>End Date</label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={formData.endDate}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        placeholder="Enter d</div>escription"
                                    />
                                </div>

                                {/* Nút Duplicate, Delete và Save Changes */}
                                <div className="form-actions">
                                    <button
                                        type="button"
                                        className="btn btn-delete"
                                        onClick={() => handleAction('delete')}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-save"
                                        onClick={() => { handleAction('save') }}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                            {/* Nút Close thay bằng dấu X */}
                            <button className="btn-close" onClick={toggleEditModal}>
                                ×
                            </button>
                        </div>
                    </div>
                )}

                {isDetailTabOpen && selectedItem && (

                    <div className="detail-overlay" onClick={(e) => {
                        if (e.target !== e.currentTarget) {
                            return;
                        }
                        closeDetailTab();
                    }}>
                        <div className="detail-tab">
                            <div className="detail-tab-header">
                                <button className="btn-close" onClick={closeDetailTab}>×</button>
                            </div>
                            <div className="detail-tab-content">
                                <div className="detail-tab-image">
                                    <img src={selectedItem?.service?.images[0]} alt="Item" />
                                </div>
                                <div className="detail-tab-info">
                                    <h3>{selectedItem?.service?.name}</h3>
                                    <p>{selectedItem?.service?.description}</p>
                                    <p><strong>Phone: </strong><a href={'tel:' + selectedItem?.service?.phone} target="_blank" rel="noopener noreferrer">{selectedItem?.service?.phone}</a></p>
                                    <p><strong>Address: </strong>{selectedItem?.service?.address}</p>
                                    <p><strong>Opening Hours: </strong></p>
                                    <ul>
                                        {selectedItem?.service?.openingHours.map((op: any) => (
                                            <li><strong>{op?.day}</strong>: {op?.hours === "Custom" ? (op?.customHours?.open + ' -> ' + op?.customHours?.close) : op?.hours}</li>
                                        ))}
                                    </ul>
                                    <button className="btn btn-outline-danger btn-block" onClick={handleRemoveServiceFromDay}>
                                        <FontAwesomeIcon icon={faTrash} /> Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

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
        </div>
    );
}

export default TripDetail;
