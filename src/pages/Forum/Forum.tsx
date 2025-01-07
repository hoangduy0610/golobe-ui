import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Input, Form, message } from 'antd';
import { Link } from 'react-router-dom'; // Đảm bảo import Link từ react-router-dom
import { Container, Row, Col } from 'react-bootstrap';
import Footer from '@/components/Footer/Footer';
import Headers from '@/components/Header/Header';
import './Forum.scss';
import axios from 'axios';
import moment from 'moment';
import MainApiRequest from '@/redux/apis/MainApiRequest';

interface Topic {
    id: number;
    title: string;
    user: any;
    content: string;
    replies: any[];
    reacts: any[];
}

const Forum: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [forumTopics, setForumTopics] = useState<Topic[]>([]);

    const showModal = () => setIsModalVisible(true);
    const handleCancel = () => setIsModalVisible(false);

    const fetchForumTopics = async () => {
        try {
            const response = await MainApiRequest.get('/forum/main');
            setForumTopics(response.data);
        } catch (error) {
            console.log('Failed to fetch forum topics: ', error);
        }
    }

    useEffect(() => {
        fetchForumTopics();
    }, []);

    // Gửi yêu cầu POST đến API
    const handlePost = () => {
        form.validateFields().then(async (values) => {
            try {
                const response = await MainApiRequest.post('/forum', {
                    title: values.title,
                    content: values.content
                });

                setForumTopics([...forumTopics, response.data]);
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
            title: 'Author',
            dataIndex: 'user',
            key: 'user',
            render: (user: any) => user?.name,
        },
        {
            title: 'Topic',
            dataIndex: 'title',
            key: 'title',
            render: (text: string, record: Topic) => (
                <Link to={`/forum/${record?.id}`}>{text}</Link> // Link chuyển đến trang chi tiết của bài đăng
            ),
        },
        {
            title: 'Replies',
            dataIndex: 'replies',
            key: 'replies',
            render: (replies: any[]) => replies?.length || 0,
        },
        {
            title: 'Last Post',
            dataIndex: 'replies',
            key: 'lastPost',
            render: (replies: any[]) => replies?.length > 0 ? moment(replies[replies?.length - 1]?.createdAt).fromNow() : 'Never',
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
                                        dataSource={forumTopics}
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
