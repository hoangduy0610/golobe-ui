import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input, Form, message } from 'antd';
import axios from 'axios';

const ForumPage: React.FC = () => {
  const [forumPosts, setForumPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [editPost, setEditPost] = useState<any>(null);

  const API_URL = 'http://api.example.com/forumPosts';

  // Sample data for forum posts
  const sampleData = [
    { id: 1, title: 'How to plan your next trip?', author: 'John Doe', content: 'Planning a trip can be difficult. Here are some tips...', date: '2025-01-10' },
    { id: 2, title: 'Best hotels in Paris', author: 'Jane Smith', content: 'Looking for a great hotel in Paris? Here are my recommendations...', date: '2025-01-12' },
    { id: 3, title: 'Tips for traveling to Tokyo', author: 'Admin', content: 'Tokyo is a great city to visit. Here are some tips...', date: '2025-01-15' },
  ];

  useEffect(() => {
    const fetchForumPosts = async () => {
      setLoading(true);
      try {
        // Simulate fetching data from API
        // In a real-world scenario, use axios to fetch actual data from API
        setForumPosts(sampleData);
      } catch (err) {
        setError('Failed to load forum posts');
      } finally {
        setLoading(false);
      }
    };

    fetchForumPosts();
  }, []);

  const handleCreate = () => {
    form.resetFields();
    setIsEditing(false);
    setIsModalVisible(true);
  };

  const handleEdit = (post: any) => {
    setEditPost(post);
    setIsEditing(true);
    form.setFieldsValue(post);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      // Simulate deletion by removing it from the list
      setForumPosts(forumPosts.filter(post => post.id !== id));
      message.success('Forum post deleted successfully!');
    } catch (err) {
      message.error('Failed to delete forum post');
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (isEditing && editPost) {
        // Update forum post
        setForumPosts(forumPosts.map(post => post.id === editPost.id ? { ...post, ...values } : post));
        message.success('Forum post updated successfully!');
      } else {
        // Create new forum post
        const newPost = { id: Date.now(), ...values };
        setForumPosts([...forumPosts, newPost]);
        message.success('Forum post created successfully!');
      }

      setIsModalVisible(false);
      form.resetFields();
      setEditPost(null);
    } catch (errorInfo) {
      console.error('Validation Failed:', errorInfo);
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, post: any) => (
        <div className="d-flex gap-2">
          <Button type="primary" onClick={() => handleEdit(post)}>
            Edit
          </Button>
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

      <Button type="primary" onClick={handleCreate} className="mb-3">
        Create New Forum Post
      </Button>

      <Table
        columns={columns}
        dataSource={forumPosts}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title={isEditing ? 'Edit Forum Post' : 'Create Forum Post'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSubmit}
        okText={isEditing ? 'Save' : 'Create'}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please input the forum post title!' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="author"
            label="Author"
            rules={[{ required: true, message: 'Please input the author name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: 'Please select the date!' }]}>
            <Input type="date" />
          </Form.Item>
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: 'Please input the forum post content!' }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ForumPage;
