import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col, Avatar, Typography, Space, Pagination, Card, Breadcrumb, Input, Form } from 'antd';
import './PostDetail.scss';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Meta } = Card;

const PostDetail: React.FC = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const [post, setPost] = useState<any | null>(null); // Dữ liệu bài đăng
    const [page, setPage] = useState(1); // Trạng thái cho phân trang
    const [replyContent, setReplyContent] = useState(''); // Nội dung trả lời

    // Giả lập lấy dữ liệu từ API
    useEffect(() => {
        // API call giả định lấy thông tin bài đăng
        // Thay thế bằng API thực tế khi có sẵn
        const fetchPostData = () => {
            setPost({
                author: 'John Doe',
                avatar: 'https://i.pravatar.cc/150?img=3',
                postTime: '2 hours ago',
                title: 'How to travel to the Maldives',
                content: 'Content of the post will be displayed here. It is very detailed and informative.',
                likes: 23,
            });
        };
        fetchPostData();
    }, [id]);

    // Xử lý chuyển trang
    const handlePageChange = (page: number) => {
        setPage(page);
        // Tải lại các bình luận hoặc nội dung tương ứng với trang
    };

    // Xử lý thay đổi nội dung trả lời
    const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReplyContent(e.target.value);
    };

    // Xử lý gửi trả lời
    const handlePostReply = () => {
        if (replyContent) {
            alert('Reply posted: ' + replyContent);
            setReplyContent(''); // Xóa nội dung sau khi gửi
        }
    };

    // Xử lý hủy bỏ trả lời
    const handleCancelReply = () => {
        setReplyContent(''); // Xóa nội dung nếu hủy
    };

    return (
        <>
            <div className="post-detail-container">
                <div className="app">
                    <div className="container-fluid">
                        <Header />
                        <div className="container">
                            <Breadcrumb className="my-3">
                                <Breadcrumb.Item>
                                    <Link to="/">Home</Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    <Link to="/forum">Forum</Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>{post?.title}</Breadcrumb.Item>
                            </Breadcrumb>

                            <Row justify="end" className="pagination-container">
                                <Pagination current={page} total={50} onChange={handlePageChange} />
                            </Row>

                            {post ? (
                                <Row gutter={[24, 24]}>
                                    <Col span={24}>
                                        {/* Card chứa Avatar và Tên */}
                                        <Card bordered={false} className="post-card">
                                            <Meta
                                                avatar={<Avatar src={post.avatar} />}
                                                title={post.author}
                                                description={post.postTime}
                                            />
                                            <Title level={2}>{post.title}</Title>
                                            <p>{post.content}</p>

                                            <Button type="primary" onClick={() => alert('Liked!')} icon={<i className="fas fa-thumbs-up" />}>
                                                Like {post.likes}
                                            </Button>
                                        </Card>

                                        {/* Trường nhập liệu trả lời */}
                                        <div className="reply-container">
                                            <Form>
                                                <Form.Item>
                                                    <TextArea
                                                        rows={4}
                                                        value={replyContent}
                                                        onChange={handleReplyChange}
                                                        placeholder="Write your reply here..."
                                                    />
                                                </Form.Item>
                                                <Form.Item>
                                                    <Space>
                                                        <Button onClick={handleCancelReply}>Cancel</Button>
                                                        <Button type="primary" onClick={handlePostReply}>
                                                            Post Reply
                                                        </Button>
                                                    </Space>
                                                </Form.Item>
                                            </Form>
                                        </div>
                                    </Col>
                                </Row>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                        
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PostDetail;
