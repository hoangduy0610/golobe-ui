import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input, Form, message } from 'antd';
import AdminApiRequest from '@/redux/apis/AdminApiRequest';
import { useNavigate } from 'react-router-dom';


const PlanPage: React.FC = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [editPlan, setEditPlan] = useState<any>(null);


  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      try {
        const response = await AdminApiRequest.get('/plan/list');
        setPlans(response.data);
      } catch (err) {
        setError('Failed to load plans');
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleCreate = () => {
    form.resetFields();
    setIsEditing(false);
    setIsModalVisible(true);
  };

  const handleEdit = (plan: any) => {
    setEditPlan(plan);
    setIsEditing(true);
    form.setFieldsValue({
      name: plan.name,
      description: plan.description,
      locationId: plan.locationId,
      startDate: plan.startDate.split('T')[0],
      endDate: plan.endDate.split('T')[0],
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await AdminApiRequest.delete(`/plan'/${id}`);
      setPlans(plans.filter(plan => plan.id !== id));
      message.success('Plan deleted successfully!');
    } catch (err) {
      message.error('Failed to delete plan');
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (isEditing && editPlan) {
        // Update plan
        const updatedPlan = {
          ...values,
          startDate: new Date(values.startDate).toISOString(),
          endDate: new Date(values.endDate).toISOString(),
        };
        await AdminApiRequest.put(`/plan'/${editPlan.id}`, updatedPlan);
        setPlans(plans.map(plan => (plan.id === editPlan.id ? { ...plan, ...updatedPlan } : plan)));
        message.success('Plan updated successfully!');
      } else {
        // Create new plan
        const newPlan = {
          ...values,
          startDate: new Date(values.startDate).toISOString(),
          endDate: new Date(values.endDate).toISOString(),
        };
        const response = await AdminApiRequest.post('/plan', newPlan);
        setPlans([...plans, response.data]);
        message.success('Plan created successfully!');
      }

      setIsModalVisible(false);
      form.resetFields();
      setEditPlan(null);
    } catch (errorInfo) {
      console.error('Validation Failed:', errorInfo);
      message.error('Failed to save plan');
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      render: (location: any) => location.name,
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, plan: any) => (
        <div className="d-flex gap-2">
          {/* <Button type="primary" onClick={() => handleEdit(plan)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(plan.id)}>
            Delete
          </Button> */}
          <Button type="primary" onClick={() => navigate(`/trip-detail/${plan.id}`)}>
            <i className="fas fa-link"></i>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="plan-container">
      <h2>Trip Plan Management</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {/* <Button type="primary" onClick={handleCreate} className="mb-3">
        Create New Plan
      </Button> */}

      <Table
        columns={columns}
        dataSource={plans}
        rowKey="id"
        loading={loading}
        pagination={{ showSizeChanger: true }}
      />

      <Modal
        title={isEditing ? 'Edit Trip Plan' : 'Create Trip Plan'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSubmit}
        okText={isEditing ? 'Save' : 'Create'}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the plan title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input the plan description!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="locationId"
            label="Location ID"
            rules={[{ required: true, message: 'Please input the location ID!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[{ required: true, message: 'Please select the start date!' }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            name="endDate"
            label="End Date"
            rules={[{ required: true, message: 'Please select the end date!' }]}
          >
            <Input type="date" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PlanPage;
