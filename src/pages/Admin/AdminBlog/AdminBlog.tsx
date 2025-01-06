import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input, Form, message } from 'antd';
import axios from 'axios';

const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [editBlog, setEditBlog] = useState<any>(null);

  const API_URL = 'http://api.example.com/blogs';

  // Sample data for blogs
  const sampleData = [
    { id: 1, title: 'Trip to Paris', author: 'Admin', date: '2025-01-10', content: 'This is a detailed blog post about my trip to Paris.' },
    { id: 2, title: 'Business Trip to Tokyo', author: 'Admin', date: '2025-01-12', content: 'This blog post covers my business trip to Tokyo.' },
    { id: 3, title: 'Summer Vacation in Bali', author: 'Admin', date: '2025-01-15', content: 'A fun-filled blog post about my summer vacation in Bali.' },
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        // Simulate fetching data from API
        // In a real-world scenario, use axios to fetch actual data from API
        setBlogs(sampleData);
      } catch (err) {
        setError('Failed to load blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleCreate = () => {
    form.resetFields();
    setIsEditing(false);
    setIsModalVisible(true);
  };

  const handleEdit = (blog: any) => {
    setEditBlog(blog);
    setIsEditing(true);
    form.setFieldsValue(blog);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      // Simulate deletion by removing it from the list
      setBlogs(blogs.filter(blog => blog.id !== id));
      message.success('Blog deleted successfully!');
    } catch (err) {
      message.error('Failed to delete blog');
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (isEditing && editBlog) {
        // Update blog
        setBlogs(blogs.map(blog => blog.id === editBlog.id ? { ...blog, ...values } : blog));
        message.success('Blog updated successfully!');
      } else {
        // Create new blog
        const newBlog = { id: Date.now(), ...values };
        setBlogs([...blogs, newBlog]);
        message.success('Blog created successfully!');
      }

      setIsModalVisible(false);
      form.resetFields();
      setEditBlog(null);
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
      render: (_: any, blog: any) => (
        <div className="d-flex gap-2">
          <Button type="primary" onClick={() => handleEdit(blog)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(blog.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="blog-container">
      <h2>Blog Management</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <Button type="primary" onClick={handleCreate} className="mb-3">
        Create New Blog
      </Button>

      <Table
        columns={columns}
        dataSource={blogs}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title={isEditing ? 'Edit Blog' : 'Create Blog'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSubmit}
        okText={isEditing ? 'Save' : 'Create'}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please input the blog title!' }]}>
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
            rules={[{ required: true, message: 'Please input the blog content!' }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BlogPage;
