import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Modal, Input, Form, message } from 'antd';
import { LocationType } from '@/types/types';
import './Location.scss';
import { fetchLocations, createLocation, updateLocation, deleteLocation } from '@/redux/reducers/locationReducer';

const LocationPage: React.FC = () => {
  const dispatch = useDispatch();
  const { locations, loading, error } = useSelector((state: any) => state.location);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [editLocation, setEditLocation] = useState<LocationType | null>(null);

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  const handleCreate = () => {
    form.resetFields();
    setIsEditing(false);
    setIsModalVisible(true);
  };

  const handleEdit = (location: LocationType) => {
    setEditLocation(location);
    setIsEditing(true);
    form.setFieldsValue(location);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    await dispatch(deleteLocation(id));
    message.success('Location deleted successfully!');
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (isEditing && editLocation) {
        dispatch(updateLocation({ ...editLocation, ...values }));
        message.success('Location updated successfully!');
      } else {
        dispatch(createLocation(values));
        message.success('Location created successfully!');
      }

      setIsModalVisible(false);
      form.resetFields();
      setEditLocation(null);
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
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Feature Image',
      dataIndex: 'featureImage',
      key: 'featureImage',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, location: LocationType) => (
        <div className="d-flex gap-2">
          <Button type="primary" onClick={() => handleEdit(location)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(location.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="location-container">
      <h2>Location Management</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
  
      <Button type="primary" onClick={handleCreate} className="mb-3">
        Create New Location
      </Button>
  
      <Table
        columns={columns}
        dataSource={locations}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
  
      <Modal
        title={isEditing ? 'Edit Location' : 'Create Location'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSubmit}
        okText={isEditing ? 'Save' : 'Create'}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please input the address!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input />
          </Form.Item>
          <Form.Item name="featureImage" label="Feature Image">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default LocationPage;
