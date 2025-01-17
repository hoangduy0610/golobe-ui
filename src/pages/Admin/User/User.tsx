import AdminApiRequest from '@/redux/apis/AdminApiRequest';
import { Button, Form, Input, Modal, Select, Table, Tag, message } from 'antd';
import React, { useEffect, useState } from 'react';

const UserPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [editUser, setEditUser] = useState<any>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await AdminApiRequest.get('/user/list');
      setUsers(res.data);
      // setUsers();
    } catch (err) {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
      const res = await AdminApiRequest.delete(`/user/${id}`);
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
        await AdminApiRequest.put(`/user/${editUser.id}`, values);
        setUsers(users.map(user => user.id === editUser.id ? { ...user, ...values } : user));
        message.success('User updated successfully!');
      } else {
        // Create new user
        const res = await AdminApiRequest.post('/user', values);
        setUsers([...users, res.data]);
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
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
      render: (role: any) => <Tag color={role === 'ROLE_ADMIN' ? 'red' : 'blue'}>{role}</Tag>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, user: any) => (
        <div className="d-flex gap-2">
          <Button type="primary" onClick={() => handleEdit(user)}>
            <i className="fas fa-edit"></i>
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(user.id)}>
            <i className="fas fa-trash"></i>
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
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the username!' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please input the email address!' }]}>
            <Input />
          </Form.Item>

          {
            isEditing ? null : (
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: 'Please input the password!' }]}>
                <Input.Password />
              </Form.Item>
            )
          }
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please select the user role!' }]}>
            <Select>
              <Select.Option value="ROLE_USER">User</Select.Option>
              <Select.Option value="ROLE_ADMIN">Admin</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserPage;
