import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col, Avatar, Typography, Space, Pagination, Card, Breadcrumb, Input, Form } from 'antd';
import './PostDetail.scss';
import Footer from '@/components/Footer/Footer';
import MiniHeader from '@/components/Header/MiniHeader';
import MainApiRequest from '@/redux/apis/MainApiRequest';
import moment from 'moment';
import avatarDefault from '@/assets/avatar.jpeg';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Meta } = Card;

const PostDetail: React.FC = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const [post, setPost] = useState<any | null>(null); // Dữ liệu bài đăng
    const [page, setPage] = useState(1); // Trạng thái cho phân trang
    const [replyContent, setReplyContent] = useState(''); // Nội dung trả lời

    const fetchPostData = async () => {
        const res = await MainApiRequest.get(`/forum/${id}`);
        setPost(res.data);
    };

    // Giả lập lấy dữ liệu từ API
    useEffect(() => {
        fetchPostData();
    }, []);

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
    const handlePostReply = async () => {
        if (replyContent) {
            const res = await MainApiRequest.post(`/forum`, {
                content: replyContent,
                replyToId: parseInt(id || "0"),
            });
            fetchPostData(); // Tải lại dữ liệu bài đăng
            setReplyContent(''); // Xóa nội dung sau khi gửi
        }
    };

    const handleLike = async (id: number, likeStatus: boolean) => {
        if (likeStatus) {
            const res = await MainApiRequest.delete(`/forum/like/${id}`);
        } else {
            const res = await MainApiRequest.post(`/forum/like/${id}`);
        }
        fetchPostData(); // Tải lại dữ liệu bài
    }

    const checkLiked = (reacts: any[]) => {
        const currentUserId = parseInt(localStorage.getItem('userId') || "0");
        const liked = reacts.find((react) => react.user.id === currentUserId);
        return liked;
    }

    const isLiked = checkLiked(post?.reacts || []);

    const richerContent = (content: string) => {
        // process links
        const linkRegex = /((http|https):\/\/[^\s]+)/g;
        const linkMatch = content.match(linkRegex);
        if (linkMatch) {
            linkMatch.forEach((link) => {
                content = content.replace(link, `<a href="${link}" target="_blank">${link}</a>`);
            });
        }

        // process break lines
        content = content.replace(/\n/g, '<br />');

        return content;
    }

    return (
        <>
            <div className="post-detail-container">
                <div className="app">
                    <div className="container-fluid">
                        <MiniHeader />
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

                            {/* <Row justify="end" className="pagination-container">
                                <Pagination current={page} total={50} onChange={handlePageChange} />
                            </Row> */}

                            {post ? (
                                <Row gutter={[24, 24]}>
                                    <Col span={24}>
                                        {/* Card chứa Avatar và Tên */}
                                        <Card bordered={false} className="post-card">
                                            <Meta
                                                avatar={<Avatar src={post?.user?.avatar || avatarDefault} />}
                                                title={post?.user?.name}
                                                description={moment(post?.createdAt).format('DD/MM/YYYY HH:mm')}
                                            />
                                            <Title level={2}>{post?.title}</Title>
                                            <div dangerouslySetInnerHTML={{ __html: richerContent(post?.content) }}></div>

                                            <Button type="primary" className={isLiked ? 'liked' : ''} onClick={() => handleLike(post?.id || 0, isLiked)} icon={<i className="fas fa-thumbs-up" />}>
                                                {isLiked ? 'Liked' : 'Like'} {post?.reacts?.length}
                                            </Button>
                                        </Card>

                                        {
                                            post?.replies.map((reply: any) => {
                                                const isLikedReply = checkLiked(reply?.reacts || []);
                                                return (
                                                    <Card bordered={false} className="post-card mt-2" style={{
                                                        width: '90%',
                                                        marginLeft: '10%'
                                                    }}>
                                                        <Meta
                                                            avatar={<Avatar src={reply?.user?.avatar || avatarDefault} />}
                                                            title={reply?.user?.name}
                                                            description={moment(reply?.createdAt).format('DD/MM/YYYY HH:mm')}
                                                        />
                                                        {/* Quote replied */}
                                                        <Card bordered={false} className="my-2" style={{ backgroundColor: '#f5f5f5' }}>
                                                            <Text strong>Replying:</Text>
                                                            <p>{post?.content}</p>
                                                        </Card>
                                                        <div dangerouslySetInnerHTML={{ __html: richerContent(reply?.content) }}></div>

                                                        <Button type="primary" className={isLikedReply ? 'liked' : ''} onClick={() => handleLike(reply?.id || 0, isLikedReply)} icon={<i className="fas fa-thumbs-up" />}>
                                                            {isLikedReply ? 'Liked' : 'Like'} {reply?.reacts?.length}
                                                        </Button>
                                                    </Card>
                                                )
                                            })
                                        }

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
