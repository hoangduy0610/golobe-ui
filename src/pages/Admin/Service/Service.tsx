import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input, Form, message } from 'antd';
import './Service.scss';

interface ServiceType {
  id: string;
  name: string;
  description: string;
  price: number;
}

// Dữ liệu mẫu
const sampleServices = [
  {
    id: '1',
    name: 'Room Cleaning',
    description: 'Thorough cleaning of the room including floors, furniture, and bedding.',
    price: 50,
  },
  {
    id: '2',
    name: 'Laundry Service',
    description: 'Washing and ironing of clothes.',
    price: 30,
  },
  {
    id: '3',
    name: 'Airport Transfer',
    description: 'Pick-up and drop-off from the airport to the hotel.',
    price: 100,
  },
  {
    id: '4',
    name: 'Spa Treatment',
    description: 'Relaxing spa services including massage and aromatherapy.',
    price: 150,
  },
  {
    id: '5',
    name: 'Breakfast Buffet',
    description: 'Enjoy a wide variety of dishes for breakfast.',
    price: 25,
  },
];

const ServicePage: React.FC = () => {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [editService, setEditService] = useState<ServiceType | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        // Thay thế phần fetch với dữ liệu mẫu
        const data = sampleServices;
        setServices(data);
      } catch (err) {
        setError('Failed to fetch services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleCreate = () => {
    form.resetFields();
    setIsEditing(false);
    setIsModalVisible(true);
  };

  const handleEdit = (service: ServiceType) => {
    setEditService(service);
    setIsEditing(true);
    form.setFieldsValue(service);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      // Xóa dịch vụ theo ID
      setServices(services.filter(service => service.id !== id));
      message.success('Service deleted successfully!');
    } catch (error) {
      message.error('Failed to delete service');
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (isEditing && editService) {
        // Cập nhật dịch vụ
        const updatedService = { ...editService, ...values };
        setServices(services.map(service => service.id === updatedService.id ? updatedService : service));
        message.success('Service updated successfully!');
      } else {
        // Tạo mới dịch vụ
        const newService = { ...values, id: Date.now().toString() };
        setServices([...services, newService]);
        message.success('Service created successfully!');
      }

      setIsModalVisible(false);
      form.resetFields();
      setEditService(null);
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
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, service: ServiceType) => (
        <div className="d-flex gap-2">
          <Button type="primary" onClick={() => handleEdit(service)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(service.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="service-container">
      <h2>Service Management</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <Button type="primary" onClick={handleCreate} className="mb-3">
        Create New Service
      </Button>

      <Table
        columns={columns}
        dataSource={services}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title={isEditing ? 'Edit Service' : 'Create Service'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSubmit}
        okText={isEditing ? 'Save' : 'Create'}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the service name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input the service description!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please input the service price!' }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ServicePage;
