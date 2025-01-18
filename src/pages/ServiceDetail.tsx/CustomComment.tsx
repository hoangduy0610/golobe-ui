import React from "react";
import { Avatar, Rate, Typography } from "antd";
import "./CustomComment.scss";
import avatarDefault from '@/assets/avatar.jpeg';

const { Text } = Typography;

interface CustomCommentProps {
    avatarAuthor?: string;
    author: string;
    content: string;
    rating: number;
}

const CustomComment: React.FC<CustomCommentProps> = ({ avatarAuthor, author, content, rating }) => {
    return (
        <div className="custom-comment">
            <div className="comment-header">
                <Avatar src={avatarAuthor || avatarDefault} />
                <div className="comment-author">
                    <Text strong>{author}</Text>
                    <Rate disabled defaultValue={rating} />
                </div>
            </div>
            <div className="comment-content">
                <Text>{content}</Text>
            </div>
        </div>
    );
};

export default CustomComment;
