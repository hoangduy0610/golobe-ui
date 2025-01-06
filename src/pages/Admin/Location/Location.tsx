import { createLocation, deleteLocation, updateLocation } from '@/redux/reducers/locationReducer';
import { LocationType } from '@/types/types';
import { Button, Form, Input, Modal, Table, message } from 'antd';
import React, { useEffect, useState } from 'react';
import './Location.scss';
import AdminApiRequest from '@/redux/apis/AdminApiRequest';
import { render } from '@testing-library/react';

const LocationPage: React.FC = () => {
  const [loadingLocationList, setLoadingLocationList] = useState(false);
  const [locationList, setLocationList] = useState<LocationType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [editLocation, setEditLocation] = useState<LocationType | null>(null);

  const fetchLocations = async () => {
    setLoadingLocationList(true);
    // Fetch location list from API
    const res = await AdminApiRequest.get('/location/list');
    setLocationList(res.data);
    setLoadingLocationList(false);
  }

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
    // await dispatch(deleteLocation(id));
    const res = await AdminApiRequest.delete(`/location/${id}`);
    message.success('Location deleted successfully!');
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (isEditing && editLocation) {
        // dispatch(updateLocation({ ...editLocation, ...values }));
        const res = await AdminApiRequest.put(`/location/${editLocation.id}`, { ...editLocation, ...values });
        message.success('Location updated successfully!');
      } else {
        // dispatch(createLocation(values));
        const res = await AdminApiRequest.post('/location', values);
        message.success('Location created successfully!');
      }

      setIsModalVisible(false);
      form.resetFields();
      setEditLocation(null);
    } catch (errorInfo) {
      console.error('Validation Failed:', errorInfo);
    }
  };

  useEffect(() => {
    if (locationList.length === 0) {
      fetchLocations();
    }
  }, [])

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
      render: (text: string) => <img src={text} alt="feature image" style={{ width: 100 }} />,
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

      <Button type="primary" onClick={handleCreate} className="mb-3">
        Create New Location
      </Button>

      <Table
        columns={columns}
        dataSource={locationList}
        rowKey="id"
        loading={loadingLocationList}
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
