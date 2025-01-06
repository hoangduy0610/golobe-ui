import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input, Form, message, Tag } from 'antd';
import AdminApiRequest from '@/redux/apis/AdminApiRequest';
import './Service.scss';
import { title } from 'process';
import { render } from '@testing-library/react';

interface ServiceType {
  id: string;
  name: string;
  images: string[];
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  mapMarker: string;
  features: string[];
  priceRange: string;
  price: string;
  serviceTypeId: number;
  openingHours: Array<Record<string, any>>;
}

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
        const response = await AdminApiRequest.get('/service/list');
        setServices(response.data);
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
      await AdminApiRequest.delete(`/service/${id}`);
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
        const updatedService = { ...editService, ...values };
        await AdminApiRequest.put(`/service/${editService.id}`, updatedService);
        setServices(services.map(service => (service.id === updatedService.id ? updatedService : service)));
        message.success('Service updated successfully!');
      } else {
        const response = await AdminApiRequest.post('/service', values);
        setServices([...services, response.data]);
        message.success('Service created successfully!');
      }

      setIsModalVisible(false);
      form.resetFields();
      setEditService(null);
    } catch (errorInfo) {
      message.error('Failed to submit service');
    }
  };

  const mapColor = (index: number) => {
    const colors = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'];
    return colors[index % colors.length];
  }

  const columns = [
    {
      title: 'Image',
      dataIndex: 'images',
      key: 'images',
      render: (images: string[]) => <img src={images[0]} alt="service" style={{ width: '50px' }} />,
    },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
    },
    {
      title: 'Features',
      dataIndex: 'features',
      key: 'features',
      render: (features: string[]) => features.map((feature, index) => <Tag key={feature} color={mapColor(index)}>{feature}</Tag>),
    },
    {
      title: 'Price Range',
      dataIndex: 'priceRange',
      key: 'priceRange',
      render: (priceRange: string) => <Tag color="blue">{priceRange.toUpperCase()}</Tag>,
    },
    // {
    //   title: 'Opening Hours',
    //   dataIndex: 'openingHours',
    //   key: 'openingHours',
    // },
    // { title: 'Description', dataIndex: 'description', key: 'description' },
    // { title: 'Price', dataIndex: 'price', key: 'price' },
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
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the service name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input the service description!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please input the service price!' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please input the address!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true, message: 'Please input the phone!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input the email!' }]}>
            <Input type="email" />
          </Form.Item>
          <Form.Item name="website" label="Website" rules={[{ required: false }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ServicePage;
