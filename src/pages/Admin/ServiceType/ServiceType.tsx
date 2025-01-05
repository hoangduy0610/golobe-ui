import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input, Form, message } from 'antd';

import axios from 'axios'; // Đảm bảo đã cài axios

const ServiceTypePage: React.FC = () => {
  const [serviceTypes, setServiceTypes] = useState<any[]>([]);  // Dữ liệu serviceTypes
  const [loading, setLoading] = useState<boolean>(false); // Trạng thái loading
  const [error, setError] = useState<string | null>(null); // Lỗi khi fetch dữ liệu
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [editServiceType, setEditServiceType] = useState<any>(null);

  // API URL (Thay đổi URL phù hợp với hệ thống của bạn)
  const API_URL = 'http://api.example.com/serviceTypes';

  useEffect(() => {
    // Fetch dữ liệu service types khi component mount
    const fetchServiceTypes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_URL); // Gọi API để lấy dữ liệu
        setServiceTypes(response.data);
      } catch (err) {
        setError('Failed to load service types');
      } finally {
        setLoading(false);
      }
    };

    fetchServiceTypes();
  }, []);

  const handleCreate = () => {
    form.resetFields();
    setIsEditing(false);
    setIsModalVisible(true);
  };

  const handleEdit = (serviceType: any) => {
    setEditServiceType(serviceType);
    setIsEditing(true);
    form.setFieldsValue(serviceType);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`); // Gọi API để xóa
      setServiceTypes(serviceTypes.filter(serviceType => serviceType.id !== id)); // Cập nhật lại danh sách
      message.success('Service Type deleted successfully!');
    } catch (err) {
      message.error('Failed to delete service type');
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (isEditing && editServiceType) {
        // Cập nhật service type
        await axios.put(`${API_URL}/${editServiceType.id}`, values);
        setServiceTypes(serviceTypes.map(serviceType => serviceType.id === editServiceType.id ? { ...serviceType, ...values } : serviceType));
        message.success('Service Type updated successfully!');
      } else {
        // Tạo mới service type
        const response = await axios.post(API_URL, values);
        setServiceTypes([...serviceTypes, response.data]); // Thêm vào danh sách
        message.success('Service Type created successfully!');
      }

      setIsModalVisible(false);
      form.resetFields();
      setEditServiceType(null);
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
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, serviceType: any) => (
        <div className="d-flex gap-2">
          <Button type="primary" onClick={() => handleEdit(serviceType)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(serviceType.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="service-type-container">
      <h2>Service Type Management</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <Button type="primary" onClick={handleCreate} className="mb-3">
        Create New Service Type
      </Button>

      <Table
        columns={columns}
        dataSource={serviceTypes}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title={isEditing ? 'Edit Service Type' : 'Create Service Type'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSubmit}
        okText={isEditing ? 'Save' : 'Create'}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the service type name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input the service type description!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ServiceTypePage;
