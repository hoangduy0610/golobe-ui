import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input, Form, message } from 'antd';
import axios from 'axios';
import AdminApiRequest from '@/redux/apis/AdminApiRequest';
import { render } from '@testing-library/react';
import moment from 'moment';

const ForumPage: React.FC = () => {
  const [forumPosts, setForumPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchForumPosts = async () => {
    setLoading(true);
    try {
      const res = await AdminApiRequest.get('/forum/list');
      setForumPosts(res.data);
    } catch (err) {
      setError('Failed to load forum posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForumPosts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      // Simulate deletion by removing it from the list
      await AdminApiRequest.delete(`/forum/${id}`);
      setForumPosts(forumPosts.filter(post => post.id !== id));
      message.success('Forum post deleted successfully!');
    } catch (err) {
      message.error('Failed to delete forum post');
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Author',
      dataIndex: 'user',
      key: 'user',
      render: (user: any) => user.name,
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => moment(date).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, post: any) => (
        <div className="d-flex gap-2">
          <Button type="primary" danger onClick={() => handleDelete(post.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="forum-container">
      <h2>Forum Management</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <Table
        columns={columns}
        dataSource={forumPosts}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default ForumPage;
