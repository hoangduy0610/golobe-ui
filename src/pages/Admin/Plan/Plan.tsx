import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input, Form, message } from 'antd';
import axios from 'axios';

const PlanPage: React.FC = () => {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [editPlan, setEditPlan] = useState<any>(null);

  const API_URL = 'http://api.example.com/plans';

  // Sample data for plans
  const sampleData = [
    { id: 1, title: 'Trip to Paris', destination: 'Paris, France', startDate: '2025-06-01', endDate: '2025-06-10', description: 'A week-long vacation to Paris with sightseeing.' },
    { id: 2, title: 'Business Trip to Tokyo', destination: 'Tokyo, Japan', startDate: '2025-07-15', endDate: '2025-07-20', description: 'Business meetings and conferences in Tokyo.' },
    { id: 3, title: 'Summer Vacation in Bali', destination: 'Bali, Indonesia', startDate: '2025-08-01', endDate: '2025-08-15', description: 'A relaxing summer vacation to enjoy the beaches and culture of Bali.' },
  ];

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      try {
        // Simulate fetching data from API
        // In a real-world scenario, use axios to fetch actual data from API
        setPlans(sampleData);
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
    form.setFieldsValue(plan);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      // Simulate deletion by removing it from the list
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
        setPlans(plans.map(plan => plan.id === editPlan.id ? { ...plan, ...values } : plan));
        message.success('Plan updated successfully!');
      } else {
        // Create new plan
        const newPlan = { id: Date.now(), ...values };
        setPlans([...plans, newPlan]);
        message.success('Plan created successfully!');
      }

      setIsModalVisible(false);
      form.resetFields();
      setEditPlan(null);
    } catch (errorInfo) {
      console.error('Validation Failed:', errorInfo);
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Destination',
      dataIndex: 'destination',
      key: 'destination',
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
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, plan: any) => (
        <div className="d-flex gap-2">
          <Button type="primary" onClick={() => handleEdit(plan)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(plan.id)}>
            Delete
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

      <Button type="primary" onClick={handleCreate} className="mb-3">
        Create New Plan
      </Button>

      <Table
        columns={columns}
        dataSource={plans}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
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
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please input the plan title!' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="destination"
            label="Destination"
            rules={[{ required: true, message: 'Please input the destination!' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[{ required: true, message: 'Please select the start date!' }]}>
            <Input type="date" />
          </Form.Item>
          <Form.Item
            name="endDate"
            label="End Date"
            rules={[{ required: true, message: 'Please select the end date!' }]}>
            <Input type="date" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input the plan description!' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PlanPage;
