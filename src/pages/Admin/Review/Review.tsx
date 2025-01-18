import React, { useState, useEffect } from 'react';
import { Table, Button, message, Rate } from 'antd';
import axios from 'axios';
import AdminApiRequest from '@/redux/apis/AdminApiRequest';
import { render } from '@testing-library/react';
import { title } from 'process';

const ReviewPage: React.FC = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = 'http://api.example.com/reviews';

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const res = await AdminApiRequest.get('/review/list');
        setReviews(res.data);
      } catch (err) {
        setError('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const res = await AdminApiRequest.delete(`/review/${id}`);
      if (res.status === 200) {
        message.success('Review deleted successfully');
        setReviews(reviews.filter((review) => review.id !== id));
      } else {
        message.error('Failed to delete review');
      }
    } catch (err) {
      message.error('Failed to delete review');
    }
  };

  const columns = [
    {
      title: 'Username',
      dataIndex: 'user',
      key: 'user',
      render: (user: any) => user.name,
    },
    {
      title: 'Service Name',
      dataIndex: 'service',
      key: 'service',
      render: (service: any) => service.name,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      width: 200,
      render: (rating: number) => (<Rate disabled value={rating} />),
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: any) => (
        <Button danger onClick={() => handleDelete(record.id)}>
          <i className="fas fa-trash"></i>
        </Button>
      ),
    }
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
        pagination={{
          showSizeChanger: true,
        }}
      />
    </div>
  );
};

export default ReviewPage;
