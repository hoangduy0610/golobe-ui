import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input, Form, message } from 'antd';
import './Service.scss';

interface ServiceType {
  id: string;
  name: string;
  description: string;
  price: number;
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
        // Fetch the services from an API or any other source
        const response = await fetch('/api/services');
        const data = await response.json();
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
      // Delete service by calling an API
      await fetch(`/api/services/${id}`, { method: 'DELETE' });
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
        // Update service
        const updatedService = { ...editService, ...values };
        await fetch(`/api/services/${editService.id}`, {
          method: 'PUT',
          body: JSON.stringify(updatedService),
          headers: { 'Content-Type': 'application/json' },
        });
        setServices(services.map(service => service.id === updatedService.id ? updatedService : service));
        message.success('Service updated successfully!');
      } else {
        // Create new service
        const newService = { ...values, id: Date.now().toString() }; // Use a unique ID generator or API to create service
        await fetch('/api/services', {
          method: 'POST',
          body: JSON.stringify(newService),
          headers: { 'Content-Type': 'application/json' },
        });
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
