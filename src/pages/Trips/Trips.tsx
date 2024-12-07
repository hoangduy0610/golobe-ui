import React, { useState } from 'react';
import Header from "@/components/Header/Header";
import Accordion from 'react-bootstrap/Accordion';
import "./Trips.css";
import maldives from "@/assets/maldives.jpg";
import facebookIcon from "@/assets/facebook_icon.svg";
import footerLogo from "@/assets/footer_logo.svg";
import instagramIcon from "@/assets/instagram_icon.svg";
import sharePlan from "@/assets/share_plan.png";
import setting from "@/assets/setting.png";
import invite from "@/assets/invite.png";
import thingtodo from "@/assets/thingtodo.png";
import bed from "@/assets/bed.png";
import food from "@/assets/food.png";
import logo from "@/assets/logo.svg";
import newsletter from "@/assets/newsletter.svg";
import reviewImg from "@/assets/review_img.jpg";
import twitterIcon from "@/assets/twitter_icon.svg";
import youtubeIcon from "@/assets/youtube_icon.svg";
import { faCalendarDays, faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown } from 'react-bootstrap';

export function Trips() {
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [isAddTabOpen, setIsAddTabOpen] = useState(false);
    const [isDetailTabOpen, setIsDetailTabOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        tripName: '',
        destination: '',
        datesOrTripLength: ' days',
        description: '',
        privacy: 'public',
    });

    const toggleAddTab = (itemType: string) => {
        setIsAddTabOpen(!isAddTabOpen);
        setSelectedItem({ type: itemType });
    };

    const [activeTab, setActiveTab] = useState('itinerary');
    const [selectedItems, setSelectedItems] = useState<any[]>([]);

    const toggleEditModal = () => {
        setIsEditModalOpen(!isEditModalOpen);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAction = (action: 'duplicate' | 'delete') => {
        if (action === 'duplicate') {
            alert('Duplicate action triggered');
        } else if (action === 'delete') {
            alert('Delete action triggered');
        }
    };

    const handleItemClick = (item: any) => {
        setSelectedItem(item);
        setIsDetailTabOpen(true);
    };

    const closeDetailTab = () => {
        setIsDetailTabOpen(false);
        setSelectedItem(null);
    };

    const toggleItemSelected = (item: any) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter(i => i !== item));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };


    const handleAddToItinerary = () => {
        // Handle the logic to add selected items to the itinerary
        console.log('Adding to itinerary:', selectedItems);
        setIsAddTabOpen(false);
        setSelectedItems([]);
    };

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
                    <div className="frame" style={{ backgroundImage: `url(${maldives})` }}>
                        <div className="frame-header">
                            <button className="button button-invite">
                                <img src={invite} alt="Invite" className="button-icon" /> Invite
                            </button>
                            <button className="button button-share">
                                <img src={sharePlan} alt="Share" className="button-icon" />
                            </button>
                            <button className="button button-edit" onClick={toggleEditModal}>
                                <img src={setting} alt="Edit" className="button-icon" />
                            </button>
                        </div>
                        <div className="frame-body"></div>
                        <div className="frame-footer">
                            <div className="image-title">{formData.tripName}</div>
                            <div className="days">{formData.datesOrTripLength || '5 days'}</div>
                        </div>
                    </div>
                    <div className="tabs-container">
                        <button
                            className={`tab-button ${activeTab === 'itinerary' ? 'active' : ''}`}
                            onClick={() => setActiveTab('itinerary')}
                        >
                            Itinerary
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'favourite' ? 'active' : ''}`}
                            onClick={() => setActiveTab('favourite')}
                        >
                            Favourite
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'foryou' ? 'active' : ''}`}
                            onClick={() => setActiveTab('foryou')}
                        >
                            For You
                        </button>
                    </div>
                    <div className="tab-content">
                        {activeTab === 'itinerary' && (
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header><strong style={{ fontSize: '1.25rem' }}>Day 1</strong></Accordion.Header>
                                    <Accordion.Body>
                                        <Accordion>
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header>
                                                    <strong>
                                                        <img src={thingtodo} alt="Things to Do" className="accordion-icon" />
                                                        Things to Do
                                                    </strong></Accordion.Header>
                                                <Accordion.Body>
                                                    <div className="item" onClick={() => handleItemClick({ name: "Visit the local beach", image: reviewImg, website: "https://example.com", description: "A beautiful beach to visit." })}>
                                                        <img src={reviewImg} alt="Things to Do" className="item-image" />
                                                        <span className="item-name">Visit the local beach</span>
                                                    </div>
                                                    <div className="item" onClick={() => handleItemClick({ name: "Explore the city center", image: reviewImg, website: "https://example.com", description: "Explore the heart of the city." })}>
                                                        <img src={reviewImg} alt="Things to Do" className="item-image" />
                                                        <span className="item-name">Explore the city center</span>
                                                    </div>
                                                    <div className="item" onClick={() => handleItemClick({ name: "Go for a guided tour", image: reviewImg, website: "https://example.com", description: "Join a guided tour to learn more about the place." })}>
                                                        <img src={reviewImg} alt="Things to Do" className="item-image" />
                                                        <span className="item-name">Go for a guided tour</span>
                                                    </div>
                                                    <button className="btn-add" onClick={() => toggleAddTab('things_to do')}>+ Add</button>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="1">
                                                <Accordion.Header>
                                                    <strong>
                                                        <img src={bed} alt="Place to Stay" className="accordion-icon" />
                                                        Place to Stay
                                                    </strong></Accordion.Header>
                                                <Accordion.Body>
                                                    <div className="place-to-stay">
                                                        <div className="item" onClick={() => handleItemClick({ name: "Luxury Resort", image: reviewImg, website: "https://example.com", description: "A luxurious resort by the beach." })}>
                                                            <img src={reviewImg} alt="Place to Stay" className="item-image" />
                                                            <span className="item-name">Luxury Resort</span>
                                                        </div>
                                                        <div className="item" onClick={() => handleItemClick({ name: "Budget Hotel", image: reviewImg, website: "https://example.com", description: "Affordable hotel with great amenities." })}>
                                                            <img src={reviewImg} alt="Place to Stay" className="item-image" />
                                                            <span className="item-name">Budget Hotel</span>
                                                        </div>
                                                        <div className="item" onClick={() => handleItemClick({ name: "Beachside Cabins", image: reviewImg, website: "https://example.com", description: "Cozy cabins near the beach." })}>
                                                            <img src={reviewImg} alt="Place to Stay" className="item-image" />
                                                            <span className="item-name">Beachside Cabins</span>
                                                        </div>
                                                    </div>
                                                    <button className="btn-add" onClick={() => toggleAddTab('place_to stay')}>+ Add</button>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="2">
                                                <Accordion.Header>
                                                    <strong>
                                                        <img src={food} alt="Food & Drink" className="accordion-icon" />
                                                        Food & Drink
                                                    </strong></Accordion.Header>
                                                <Accordion.Body>
                                                    <div className="food-drink">
                                                        <div className="item" onClick={() => handleItemClick({ name: "Try local seafood", image: reviewImg, website: "https://example.com", description: "Taste the fresh seafood from the local market." })}>
                                                            <img src={reviewImg} alt="Food & Drink" className="item-image" />
                                                            <span className="item-name">Try local seafood</span>
                                                        </div>
                                                        <div className="item" onClick={() => handleItemClick({ name: "Visit a rooftop restaurant", image: reviewImg, website: "https://example.com", description: "Dine with a view at a rooftop restaurant." })}>
                                                            <img src={reviewImg} alt="Food & Drink" className="item-image" />
                                                            <span className="item-name">Visit a rooftop restaurant</span>
                                                        </div>
                                                        <div className="item" onClick={() => handleItemClick({ name: "Enjoy fresh tropical fruits", image: reviewImg, website: "https://example.com", description: "Indulge in tropical fruits at a local market." })}>
                                                            <img src={reviewImg} alt="Food & Drink" className="item-image" />
                                                            <span className="item-name">Enjoy fresh tropical fruits</span>
                                                        </div>
                                                    </div>
                                                    <button className="btn-add" onClick={() => toggleAddTab('food_& drink')}>+ Add</button>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        )}
                        <div className="tab-content">
                            {activeTab === 'favourite' && (
                                 <Accordion defaultActiveKey="0">
                                 <Accordion.Item eventKey="0">
                                     <Accordion.Header><strong style={{ fontSize: '1.25rem' }}>Your Saves</strong></Accordion.Header>
                                     <Accordion.Body>
                                         <Accordion>
                                             <Accordion.Item eventKey="0">
                                                 <Accordion.Header>
                                                     <strong>
                                                         <img src={thingtodo} alt="Things to Do" className="accordion-icon" />
                                                         Things to Do
                                                     </strong></Accordion.Header>
                                                 <Accordion.Body>
                                                     <div className="item" onClick={() => handleItemClick({ name: "Visit the local beach", image: reviewImg, website: "https://example.com", description: "A beautiful beach to visit." })}>
                                                         <img src={reviewImg} alt="Things to Do" className="item-image" />
                                                         <span className="item-name">Visit the local beach</span>
                                                     </div>
                                                     <div className="item" onClick={() => handleItemClick({ name: "Explore the city center", image: reviewImg, website: "https://example.com", description: "Explore the heart of the city." })}>
                                                         <img src={reviewImg} alt="Things to Do" className="item-image" />
                                                         <span className="item-name">Explore the city center</span>
                                                     </div>
                                                     <div className="item" onClick={() => handleItemClick({ name: "Go for a guided tour", image: reviewImg, website: "https://example.com", description: "Join a guided tour to learn more about the place." })}>
                                                         <img src={reviewImg} alt="Things to Do" className="item-image" />
                                                         <span className="item-name">Go for a guided tour</span>
                                                     </div>
                                                     {/* <button className="btn-add" onClick={() => toggleAddTab('things_to do')}>+ Add</button> */}
                                                 </Accordion.Body>
                                             </Accordion.Item>
                                             <Accordion.Item eventKey="1">
                                                 <Accordion.Header>
                                                     <strong>
                                                         <img src={bed} alt="Place to Stay" className="accordion-icon" />
                                                         Place to Stay
                                                     </strong></Accordion.Header>
                                                 <Accordion.Body>
                                                     <div className="place-to-stay">
                                                         <div className="item" onClick={() => handleItemClick({ name: "Luxury Resort", image: reviewImg, website: "https://example.com", description: "A luxurious resort by the beach." })}>
                                                             <img src={reviewImg} alt="Place to Stay" className="item-image" />
                                                             <span className="item-name">Luxury Resort</span>
                                                         </div>
                                                         <div className="item" onClick={() => handleItemClick({ name: "Budget Hotel", image: reviewImg, website: "https://example.com", description: "Affordable hotel with great amenities." })}>
                                                             <img src={reviewImg} alt="Place to Stay" className="item-image" />
                                                             <span className="item-name">Budget Hotel</span>
                                                         </div>
                                                         <div className="item" onClick={() => handleItemClick({ name: "Beachside Cabins", image: reviewImg, website: "https://example.com", description: "Cozy cabins near the beach." })}>
                                                             <img src={reviewImg} alt="Place to Stay" className="item-image" />
                                                             <span className="item-name">Beachside Cabins</span>
                                                         </div>
                                                     </div>
                                                     {/* <button className="btn-add" onClick={() => toggleAddTab('place_to stay')}>+ Add</button> */}
                                                 </Accordion.Body>
                                             </Accordion.Item>
                                             <Accordion.Item eventKey="2">
                                                 <Accordion.Header>
                                                     <strong>
                                                         <img src={food} alt="Food & Drink" className="accordion-icon" />
                                                         Food & Drink
                                                     </strong></Accordion.Header>
                                                 <Accordion.Body>
                                                     <div className="food-drink">
                                                         <div className="item" onClick={() => handleItemClick({ name: "Try local seafood", image: reviewImg, website: "https://example.com", description: "Taste the fresh seafood from the local market." })}>
                                                             <img src={reviewImg} alt="Food & Drink" className="item-image" />
                                                             <span className="item-name">Try local seafood</span>
                                                         </div>
                                                         <div className="item" onClick={() => handleItemClick({ name: "Visit a rooftop restaurant", image: reviewImg, website: "https://example.com", description: "Dine with a view at a rooftop restaurant." })}>
                                                             <img src={reviewImg} alt="Food & Drink" className="item-image" />
                                                             <span className="item-name">Visit a rooftop restaurant</span>
                                                         </div>
                                                         <div className="item" onClick={() => handleItemClick({ name: "Enjoy fresh tropical fruits", image: reviewImg, website: "https://example.com", description: "Indulge in tropical fruits at a local market." })}>
                                                             <img src={reviewImg} alt="Food & Drink" className="item-image" />
                                                             <span className="item-name">Enjoy fresh tropical fruits</span>
                                                         </div>
                                                     </div>
                                                     {/* <button className="btn-add" onClick={() => toggleAddTab('food_& drink')}>+ Add</button> */}
                                                 </Accordion.Body>
                                             </Accordion.Item>
                                         </Accordion>
                                     </Accordion.Body>
                                 </Accordion.Item>
                             </Accordion>
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
                            <h2>Add {selectedItem?.type.replace('_', ' ')}</h2>
                            <button className="btn-close" onClick={() => setIsAddTabOpen(false)}>&times;</button>
                        </div>
                        <div className="add-tab-body">
                            <input type="text" className="search-input" placeholder="Search..." />
                            <div className="add-items">
                                {['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'].map(item => (
                                    <div
                                        key={item}
                                        className={`item ${selectedItems.includes(item) ? 'selected' : ''}`}
                                        onClick={() => toggleItemSelected(item)}
                                    >
                                        <img src={reviewImg} alt={item} className="item-image" />
                                        <span className="item-name">{item}</span>
                                    </div>
                                ))}
                            </div>
                            <button className="btn-add-to-itinerary" onClick={handleAddToItinerary}>Add to Itinerary</button>
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
                                    name="tripName"
                                    value={formData.tripName}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="Enter trip name"
                                />
                            </div>
                            <div className="form-group">
                                <label>Destination</label>
                                <input
                                    type="text"
                                    name="destination"
                                    value={formData.destination}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="Enter destination"
                                />
                            </div>
                            <div className="form-group">
                                <label>Dates or Trip Length</label>
                                <input
                                    type="text"
                                    name="datesOrTripLength"
                                    value={formData.datesOrTripLength}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="Enter dates or trip length"
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="Enter description"
                                />
                            </div>

                            {/* Privacy Section */}
                            <div className="form-group">
                                <label className="privacy-title">Privacy and who can view your trip</label>
                                <div className="privacy-options">
                                    <div className="privacy-option">
                                        <input
                                            type="radio"
                                            id="public"
                                            name="privacy"
                                            value="public"
                                            checked={formData.privacy === 'public'}
                                            onChange={handleInputChange}
                                        />
                                        <label htmlFor="public">Public</label>
                                    </div>
                                    <div className="privacy-option">
                                        <input
                                            type="radio"
                                            id="private"
                                            name="privacy"
                                            value="private"
                                            checked={formData.privacy === 'private'}
                                            onChange={handleInputChange}
                                        />
                                        <label htmlFor="private">Private</label>
                                    </div>
                                </div>
                            </div>

                            {/* Nút Duplicate, Delete và Save Changes */}
                            <div className="form-actions">
                                <button
                                    type="button"
                                    className="btn btn-duplicate"
                                    onClick={() => handleAction('duplicate')}
                                >
                                    Duplicate
                                </button>
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
                                    onClick={() => { /* Lưu thay đổi ở đây */ }}
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
                <div className="detail-overlay" onClick={closeDetailTab}></div>
            )}

            {/* Detail Tab */}
            {isDetailTabOpen && selectedItem && (
                <div className="detail-tab">
                    <div className="detail-tab-header">
                        <button className="btn-close" onClick={closeDetailTab}>×</button>
                    </div>
                    <div className="detail-tab-content">
                        <div className="detail-tab-image">
                            <img src={selectedItem.image} alt="Item" />
                        </div>
                        <div className="detail-tab-info">
                            <h3>{selectedItem.name}</h3>
                            <p><strong>Website: </strong><a href={selectedItem.website} target="_blank" rel="noopener noreferrer">{selectedItem.website}</a></p>
                            <p>{selectedItem.description}</p>
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
    );
}

export default Trips;
