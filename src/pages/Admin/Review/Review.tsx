import React, { useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';
import axios from 'axios';

const ReviewPage: React.FC = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = 'http://api.example.com/reviews';

  // Sample data for reviews
  const sampleReviews = [
    { id: 1, username: 'john_doe', serviceName: 'Hotel Booking', rating: 5, comment: 'Great service, very satisfied!' },
    { id: 2, username: 'jane_smith', serviceName: 'Tour Package', rating: 4, comment: 'Good experience, but could be improved in some areas.' },
    { id: 3, username: 'alice_johnson', serviceName: 'Car Rental', rating: 3, comment: 'It was okay, but the car had some issues.' },
  ];

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        // Simulate fetching data from API
        setReviews(sampleReviews);
      } catch (err) {
        setError('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Service Name',
      dataIndex: 'serviceName',
      key: 'serviceName',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
    },
  ];

  return (
    <div className="review-container">
      <h2>Customer Reviews</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <Table
        columns={columns}
        dataSource={reviews}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default ReviewPage;
