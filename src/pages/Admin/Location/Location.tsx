import { createLocation, deleteLocation, updateLocation } from '@/redux/reducers/locationReducer';
import { LocationType } from '@/types/types';
import { Button, Form, Input, Modal, Table, message } from 'antd';
import React, { useEffect, useState } from 'react';
import './Location.scss';
import AdminApiRequest from '@/redux/apis/AdminApiRequest';
import { render } from '@testing-library/react';
import Upload from 'antd/es/upload/Upload';
import { PlusOutlined } from '@ant-design/icons';

const LocationPage: React.FC = () => {
  const [loadingLocationList, setLoadingLocationList] = useState(false);
  const [locationList, setLocationList] = useState<LocationType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [featImg, setFeatImg] = useState<string>('');
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
    setFeatImg(location.featureImage);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    // await dispatch(deleteLocation(id));
    const res = await AdminApiRequest.delete(`/location/${id}`);
    message.success('Location deleted successfully!');
    fetchLocations();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const data = { ...values, featureImage: featImg };

      if (isEditing && editLocation) {
        // dispatch(updateLocation({ ...editLocation, ...values }));
        const res = await AdminApiRequest.put(`/location/${editLocation.id}`, { ...editLocation, ...data });
        message.success('Location updated successfully!');
      } else {
        // dispatch(createLocation(values));
        const res = await AdminApiRequest.post('/location', data);
        message.success('Location created successfully!');
      }
      fetchLocations();
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

  const handleUpload = async (file: any) => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await AdminApiRequest.post('/file/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    setFeatImg(res.data.url);
  }

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
            <i className="fas fa-edit"></i>
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(location.id)}>
            <i className="fas fa-trash"></i>
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
        pagination={{ showSizeChanger: true }}
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
            {/* <Input /> */}
            <Upload
              fileList={featImg ? [{
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: featImg,
              }] : []}
              listType="picture-card"
              beforeUpload={handleUpload}
            >
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default LocationPage;
