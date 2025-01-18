import AdminApiRequest from '@/redux/apis/AdminApiRequest';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Table, Tag, Upload, message } from 'antd';
import React, { useEffect, useState } from 'react';
import './Service.scss';

interface ServiceType {
  id?: number;
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
  locationId: number;
  openingHours: Array<Record<string, any>>;
}

const ServicePage: React.FC = () => {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [location, setLocation] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [showCustom, setShowCustom] = useState<Record<string, boolean>>({
    'Monday': false,
    'Tuesday': false,
    'Wednesday': false,
    'Thursday': false,
    'Friday': false,
    'Saturday': false,
    'Sunday': false,
  });
  const [serviceTypes, setServiceTypes] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [editService, setEditService] = useState<ServiceType | null>(null);
  const watchPriceRange = Form.useWatch('priceRange', form);

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

  const fetchServiceTypes = async () => {
    try {
      const response = await AdminApiRequest.get('/service-type/list');
      setServiceTypes(response.data);
    } catch (err) {
      setError('Failed to fetch service types');
    }
  }

  const fetchLocation = async () => {
    try {
      const response = await AdminApiRequest.get('/location/list');
      setLocation(response.data);
    } catch (err) {
      setError('Failed to fetch location');
    }
  }

  useEffect(() => {
    fetchLocation();
    fetchServiceTypes();
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
    setFileList(service.images.map((url, index) => ({ uid: index, url })));
    setShowCustom({
      'Monday': service?.openingHours[0]?.hours === 'Custom',
      'Tuesday': service?.openingHours[1]?.hours === 'Custom',
      'Wednesday': service?.openingHours[2]?.hours === 'Custom',
      'Thursday': service?.openingHours[3]?.hours === 'Custom',
      'Friday': service?.openingHours[4]?.hours === 'Custom',
      'Saturday': service?.openingHours[5]?.hours === 'Custom',
      'Sunday': service?.openingHours[6]?.hours === 'Custom',
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (id?: number) => {
    try {
      if (!id) {
        return;
      }
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
      const mappingDate = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      const data: ServiceType = {
        name: values.name,
        serviceTypeId: values.serviceTypeId,
        description: values.description,
        address: values.address,
        phone: values.phone,
        email: values.email,
        website: values.website,
        features: values.features,
        priceRange: values.priceRange,
        mapMarker: editService?.mapMarker || '',
        price: values?.price || '0',
        images: fileList.map((file) => file.url),
        openingHours: values.openingHours.map((hours: any, index: number) => {
          if (!hours.hours) {
            return {
              day: mappingDate[index],
              hours: 'Always',
            };
          }

          if (hours.hours === 'Custom') {
            return {
              day: mappingDate[index],
              hours: hours.hours,
              customHours: {
                open: hours.customHours.open,
                close: hours.customHours.close,
              },
            };
          }

          return {
            day: mappingDate[index],
            hours: hours.hours,
          };
        }),
        locationId: values.locationId,
      }

      if (isEditing && editService) {
        const updatedService = { ...data };
        await AdminApiRequest.put(`/service/${editService?.id}`, updatedService);
        setServices(
          services.map(service =>
          (service.id === editService.id
            ? {
              id: editService.id,
              ...updatedService
            }
            : service))
        );
        message.success('Service updated successfully!');
      } else {
        const response = await AdminApiRequest.post('/service', data);
        setServices([...services, response.data]);
        message.success('Service created successfully!');
      }

      setIsModalVisible(false);
      form.resetFields();
      setEditService(null);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
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
    // {
    //   title: 'Email',
    //   dataIndex: 'email',
    //   key: 'email',
    // },
    // {
    //   title: 'Website',
    //   dataIndex: 'website',
    //   key: 'website',
    // },
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
            <i className="fas fa-edit"></i>
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(service?.id)}>
            <i className="fas fa-trash"></i>
          </Button>
        </div>
      ),
    },
  ];

  const beforeUpload = async (file: any) => {
    // Call the API to upload the image
    const formData = new FormData();
    formData.append('file', file);
    const response = await AdminApiRequest.post('/file/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    file.url = response.data.url;
    setFileList([...fileList, file]);
    return false;
  };

  const handleChangeImage = (info: any) => {
    setFileList(info.fileList);
  };

  const handleRemoveImage = (file: any) => {
    setFileList(fileList.filter((f: any) => f.uid !== file.uid));
  };

  return (
    <div className="service-container">
      <h2>Service Management</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <Button type="primary" onClick={handleCreate} className="mb-3">
        Create New Service
      </Button>

      <Table
        tableLayout='auto'
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
          <Form.Item name="images" label="Images" rules={[{ required: true, message: 'Please upload at least one image!' }]}>
            <Upload
              listType="picture-card"
              fileList={fileList}
              beforeUpload={beforeUpload}
              onRemove={handleRemoveImage}
              onChange={handleChangeImage}
            >
              <UploadOutlined /> Upload
            </Upload>
          </Form.Item>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the service name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="locationId"
            label="Location"
            rules={[{ required: true, message: 'Please select the location!' }]}
          >
            <Select>
              {location.map((loc) => (
                <Select.Option key={loc.id} value={loc.id}>
                  {loc.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="serviceTypeId"
            label="Service Type"
            rules={[{ required: true, message: 'Please select the service type!' }]}
          >
            <Select>
              {serviceTypes.map((serviceType) => (
                <Select.Option key={serviceType.id} value={serviceType.id}>
                  {serviceType.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input the service description!' }]}
          >
            <Input />
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
          <Form.Item name="website" label="Website" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="features"
            label="Features"
            rules={[{ required: true, message: 'Please input the features!' }]}
          >
            <Select mode="tags" style={{ width: '100%' }} placeholder="Features" />
          </Form.Item>
          <Form.Item
            name="priceRange"
            label="Price Range"
            rules={[{ required: true, message: 'Please input the price range!' }]}
          >
            <Select style={{ width: '100%' }} placeholder="Price Range">
              <Select.Option value="cheap">Cheap</Select.Option>
              <Select.Option value="moderate">Moderate</Select.Option>
              <Select.Option value="expensive">Expensive</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: false, message: 'Please input the service price!' }]}
            hidden={watchPriceRange !== 'custom'}>
            <Input type="number" />
          </Form.Item>
          {/* Opening hours */}
          <>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
              <div key={index} className="d-flex gap-2 my-2">
                <span style={{ width: 100 }}>{day}</span>
                <Form.Item name={['openingHours', index, 'day']} noStyle hidden>
                  <Input hidden readOnly value={day} />
                </Form.Item>
                <Form.Item name={['openingHours', index, 'hours']} noStyle>
                  <Select style={{ width: 100 }} defaultValue="Always" placeholder="Select" onChange={(e) => {
                    if (e === 'Custom') {
                      setShowCustom({ ...showCustom, [day]: true });
                    } else {
                      setShowCustom({ ...showCustom, [day]: false });
                    }
                  }}>
                    <Select.Option value="Always">Open</Select.Option>
                    <Select.Option value="Closed">Close</Select.Option>
                    <Select.Option value="Custom">Custom</Select.Option>
                  </Select>
                </Form.Item>
                <>
                  <Form.Item
                    hidden={!showCustom[day]}
                    name={['openingHours', index, 'customHours', 'open']}
                    noStyle
                    rules={[{ required: false, message: 'Please input the opening time!' }]}
                  >
                    <Input type="time" placeholder="Open" style={{ width: 'calc(50% - 112px)' }} />
                  </Form.Item>
                  <Form.Item
                    hidden={!showCustom[day]}
                    name={['openingHours', index, 'customHours', 'close']}
                    noStyle
                    rules={[{ required: false, message: 'Please input the closing time!' }]}
                  >
                    <Input type="time" placeholder="Close" style={{ width: 'calc(50% - 112px)' }} />
                  </Form.Item>
                </>
              </div>
            ))}
          </>
        </Form>
      </Modal>
    </div>
  );
};

export default ServicePage;
