import React, { useState } from 'react';
import { Table, Button, Modal, Input, Form, message } from 'antd';
import { Link } from 'react-router-dom'; // Đảm bảo import Link từ react-router-dom
import { Container, Row, Col } from 'react-bootstrap';
import Footer from '@/components/Footer/Footer';
import Headers from '@/components/Header/Header';
import './Forum.scss';
import axios from 'axios';

interface Topic {
    id: number;
    title: string;
    author: string;
    posts: number;
    lastPost: string;
}

const Forum: React.FC = () => {
    const [topics, setTopics] = useState<Topic[]>([
        { id: 1, title: 'How to travel to the Maldives', author: 'John Doe', posts: 5, lastPost: '2 hours ago' },
        { id: 2, title: 'Best hiking trails in Europe', author: 'Jane Smith', posts: 8, lastPost: '1 day ago' },
        { id: 3, title: 'Top 10 beach destinations for 2025', author: 'Emily Johnson', posts: 3, lastPost: '3 days ago' },
    ]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => setIsModalVisible(true);
    const handleCancel = () => setIsModalVisible(false);

    // Gửi yêu cầu POST đến API
    const handlePost = () => {
        form.validateFields().then(async (values) => {
            try {
                const response = await axios.post('/forum', {
                    title: values.title,
                    content: values.content,
                    replyToId: 0,
                });

                const newTopic: Topic = {
                    id: topics.length + 1,
                    title: values.title,
                    author: values.author,
                    posts: 0,
                    lastPost: 'Just now',
                };

                setTopics([...topics, newTopic]);
                form.resetFields();
                setIsModalVisible(false);
                message.success('Topic created successfully!');
            } catch (error) {
                message.error('Failed to create topic. Please try again!');
            }
        });
    };

    const columns = [
        {
            title: 'Forum',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'Topic',
            dataIndex: 'title',
            key: 'title',
            render: (text: string, record: Topic) => (
                <Link to={`/forum/${record.id}`}>{text}</Link> // Link chuyển đến trang chi tiết của bài đăng
            ),
        },
        {
            title: 'Replies',
            dataIndex: 'posts',
            key: 'posts',
        },
        {
            title: 'Last Post',
            dataIndex: 'lastPost',
            key: 'lastPost',
        },
    ];

    return (
        <>
            <div className="forum-page">
                <div className="app">
                    <div className="container-fluid">
                        <Headers />
                        <div className="container">
                            <Row className="mb-4">
                                <Col>

                                    <h1 className="text-center">Forum</h1>
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col>
                                    <Button type="primary" onClick={showModal}>
                                        Create New Topic
                                    </Button>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Table
                                        columns={columns}
                                        dataSource={topics}
                                        rowKey="id"
                                        pagination={false}
                                    />
                                </Col>
                            </Row>
                        </div>
                        <Modal
                            title="Create New Topic"
                            visible={isModalVisible}
                            onCancel={handleCancel}
                            footer={[
                                <Button key="cancel" onClick={handleCancel}>
                                    Cancel
                                </Button>,
                                <Button key="post" type="primary" onClick={handlePost}>
                                    Post
                                </Button>,
                            ]}
                            width={800}
                        >
                            <Form form={form} layout="vertical">
                                <Form.Item
                                    label="User"
                                    name="author"
                                    rules={[{ required: true, message: 'Please enter your name' }]} >
                                    <Input placeholder="Enter your name" />
                                </Form.Item>
                                <Form.Item
                                    label="Topic"
                                    name="title"
                                    rules={[{ required: true, message: 'Please enter a topic title' }]} >
                                    <Input placeholder="Enter topic title" />
                                </Form.Item>
                                <Form.Item
                                    label="Content"
                                    name="content"
                                    rules={[{ required: true, message: 'Please enter the content' }]} >
                                    <Input.TextArea rows={4} placeholder="Enter topic content" />
                                </Form.Item>
                            </Form>
                        </Modal>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Forum;
