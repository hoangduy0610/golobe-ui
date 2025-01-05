import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input, Form, message } from 'antd';
import axios from 'axios';

const ServiceTypePage: React.FC = () => {
  const [serviceTypes, setServiceTypes] = useState<any[]>([]);  
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string | null>(null); 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [editServiceType, setEditServiceType] = useState<any>(null);

  const API_URL = 'http://api.example.com/serviceTypes';

  // Sample data for service types
  const sampleData = [
    { id: 1, name: 'Room Service', description: 'Provides food and drinks delivered directly to the guest room.' },
    { id: 2, name: 'Spa Service', description: 'A wellness service offering massages, facials, and other body treatments.' },
    { id: 3, name: 'Housekeeping', description: 'Cleaning and maintenance service for guest rooms and public areas.' },
    { id: 4, name: 'Laundry Service', description: 'Washing, ironing, and dry cleaning services for guests\' clothes.' },
    { id: 5, name: 'Airport Shuttle', description: 'Transportation service to and from the airport for guests.' }
  ];

  useEffect(() => {
    const fetchServiceTypes = async () => {
      setLoading(true);
      try {
        // Simulate fetching data from API
        // In a real-world scenario, use axios to fetch actual data from API
        setServiceTypes(sampleData);
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
      // Simulate deletion by removing it from the list
      setServiceTypes(serviceTypes.filter(serviceType => serviceType.id !== id)); 
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
        setServiceTypes(serviceTypes.map(serviceType => serviceType.id === editServiceType.id ? { ...serviceType, ...values } : serviceType));
        message.success('Service Type updated successfully!');
      } else {
        // Tạo mới service type
        const newServiceType = { id: Date.now(), ...values };
        setServiceTypes([...serviceTypes, newServiceType]); 
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
            rules={[{ required: true, message: 'Please input the service type name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input the service type description!' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ServiceTypePage;
