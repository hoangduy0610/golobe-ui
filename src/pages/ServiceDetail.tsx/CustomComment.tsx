import React from "react";
import { Avatar, Rate, Typography } from "antd";
import "./CustomComment.scss";

const { Text } = Typography;

interface CustomCommentProps {
    author: string;
    content: string;
    rating: number;
}

const CustomComment: React.FC<CustomCommentProps> = ({ author, content, rating }) => {
    return (
        <div className="custom-comment">
            <div className="comment-header">
                <Avatar>{author.charAt(0).toUpperCase()}</Avatar>
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
