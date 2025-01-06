import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input, Form, message } from 'antd';
import MainApiRequest from '@/redux/apis/MainApiRequest'; 

const ServiceTypePage: React.FC = () => {
  const [serviceTypes, setServiceTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [editServiceType, setEditServiceType] = useState<any>(null);

  useEffect(() => {
    const fetchServiceTypes = async () => {
      setLoading(true);
      try {
        const response = await MainApiRequest.get('/serviceTypes'); 
        setServiceTypes(response.data);
      } catch (err) {
        setError('Failed to fetch service types');
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
      await MainApiRequest.delete(`/serviceTypes/${id}`); // Gửi request xóa service type
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
        const updatedServiceType = { ...editServiceType, ...values };
        await MainApiRequest.put(`/serviceTypes/${editServiceType.id}`, updatedServiceType); 
        setServiceTypes(serviceTypes.map(serviceType => (serviceType.id === updatedServiceType.id ? updatedServiceType : serviceType)));
        message.success('Service Type updated successfully!');
      } else {
        // Tạo mới service type
        const response = await MainApiRequest.post('/serviceTypes', values); 
        setServiceTypes([...serviceTypes, response.data]);
        message.success('Service Type created successfully!');
      }

      setIsModalVisible(false);
      form.resetFields();
      setEditServiceType(null);
    } catch (errorInfo) {
      message.error('Failed to submit service type');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Filters',
      dataIndex: 'filters',
      key: 'filters',
      render: (filters: string[]) => filters.join(', '), 
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
            name="filters"
            label="Filters"
            rules={[{ required: true, message: 'Please input the filters!' }]}
          >
            <Input placeholder="Enter filters separated by commas" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ServiceTypePage;
