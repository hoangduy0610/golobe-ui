import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input, Form, message } from 'antd';
import axios from 'axios';

const UserPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [editUser, setEditUser] = useState<any>(null);

  const API_URL = 'http://api.example.com/users';

  const sampleUsers = [
    { id: 1, username: 'john_doe', email: 'john@example.com', role: 'User' },
    { id: 2, username: 'jane_smith', email: 'jane@example.com', role: 'Admin' },
    { id: 3, username: 'alice_johnson', email: 'alice@example.com', role: 'User' },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        setUsers(sampleUsers);
      } catch (err) {
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleCreate = () => {
    form.resetFields();
    setIsEditing(false);
    setIsModalVisible(true);
  };

  const handleEdit = (user: any) => {
    setEditUser(user);
    setIsEditing(true);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      setUsers(users.filter(user => user.id !== id));
      message.success('User deleted successfully!');
    } catch (err) {
      message.error('Failed to delete user');
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (isEditing && editUser) {
        // Update user
        setUsers(users.map(user => user.id === editUser.id ? { ...user, ...values } : user));
        message.success('User updated successfully!');
      } else {
        // Create new user
        const newUser = { id: Date.now(), ...values };
        setUsers([...users, newUser]);
        message.success('User created successfully!');
      }

      setIsModalVisible(false);
      form.resetFields();
      setEditUser(null);
    } catch (errorInfo) {
      console.error('Validation Failed:', errorInfo);
    }
  };

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, user: any) => (
        <div className="d-flex gap-2">
          <Button type="primary" onClick={() => handleEdit(user)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(user.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="user-container">
      <h2>User Management</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <Button type="primary" onClick={handleCreate} className="mb-3">
        Create New User
      </Button>

      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title={isEditing ? 'Edit User' : 'Create User'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSubmit}
        okText={isEditing ? 'Save' : 'Create'}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please input the username!' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please input the email address!' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please select the user role!' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserPage;
