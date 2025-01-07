import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input, Form, message, Select, Upload } from 'antd';
import axios from 'axios';
import AdminApiRequest from '@/redux/apis/AdminApiRequest';
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnRedo, BtnStrikeThrough, BtnStyles, BtnUnderline, BtnUndo, Editor, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { title } from 'process';

const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [content, setContent] = useState<string>('');
  const [listService, setListService] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [editBlog, setEditBlog] = useState<any>(null);
  const [imgUrl, setImgUrl] = useState<string>('');
  const [previewContent, setPreviewContent] = useState<string>('');
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await AdminApiRequest.get('/blog/list');
      setBlogs(res.data);
      // setBlogs(sampleData);
    } catch (err) {
      setError('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await AdminApiRequest.get('/service/list');
      setListService(res.data);
    } catch (err) {
      setError('Failed to load services');
    }
  }

  useEffect(() => {
    fetchServices();
    fetchBlogs();
  }, []);

  const handleCreate = () => {
    form.resetFields();
    setIsEditing(false);
    setIsModalVisible(true);
  };

  const handleEdit = (blog: any) => {
    setEditBlog(blog);
    setIsEditing(true);
    form.setFieldsValue(blog);
    setContent(blog.content);
    setImgUrl(blog.image);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      // Simulate deletion by removing it from the list
      setBlogs(blogs.filter(blog => blog.id !== id));
      message.success('Blog deleted successfully!');
    } catch (err) {
      message.error('Failed to delete blog');
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const data = {
        ...values,
        image: imgUrl,
        content,
      }

      if (isEditing && editBlog) {
        // Update blog
        await AdminApiRequest.put(`/blog/${editBlog.id}`, data);
        setBlogs(blogs.map(blog => blog.id === editBlog.id ? { ...blog, ...data } : blog));
        message.success('Blog updated successfully!');
      } else {
        // Create new blog
        const res = await AdminApiRequest.post('/blog', data);
        // const newBlog = { id: Date.now(), ...data };
        setBlogs([...blogs, res.data]);
        message.success('Blog created successfully!');
      }

      setIsModalVisible(false);
      form.resetFields();
      setEditBlog(null);
    } catch (errorInfo) {
      console.error('Validation Failed:', errorInfo);
    }
  };

  const handleDuplicate = async (blog: any) => {
    try {
      const data = {
        image: blog.image,
        title: blog.title,
        content: blog.content,
        linkedServiceIds: blog.linkedServices.map((service: any) => service.id),
      }
      const res = await AdminApiRequest.post(`/blog/`, data);
      setBlogs([...blogs, res.data]);
      message.success('Blog duplicated successfully!');
    } catch (err) {
      message.error('Failed to duplicate blog');
    }
  };

  const columns = [
    {
      title: 'Thumbnail',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => <img src={image} alt="thumbnail" style={{ width: 100 }} />,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Preview Content',
      dataIndex: 'content',
      key: 'content',
      render: (content: string) => <Button onClick={() => {
        setPreviewContent(content)
        setShowPreview(true)
      }}>Preview</Button>,
    },
    {
      title: 'Author',
      dataIndex: 'user',
      key: 'user',
      render: (user: any) => user?.name,
    },
    {
      title: 'Linked Services',
      dataIndex: 'linkedServices',
      key: 'linkedServices',
      render: (services: any[]) => services.map(service => <div>{service.name}</div>),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => moment(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, blog: any) => (
        <div className="d-flex gap-2">
          <Button type="primary" onClick={() => handleDuplicate(blog)}>
            Duplicate
          </Button>
          <Button type="primary" onClick={() => handleEdit(blog)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(blog.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleUpload = async (file: any) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await AdminApiRequest.post('/file/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setImgUrl(res.data.url);
    } catch (err) {
      message.error('Failed to upload image');
    }
  }

  return (
    <div className="blog-container">
      <h2>Blog Management</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <Button type="primary" onClick={handleCreate} className="mb-3">
        Create New Blog
      </Button>

      <Table
        columns={columns}
        dataSource={blogs}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title="Preview"
        open={showPreview}
        onCancel={() => setShowPreview(false)}
        footer={null}
        width={800}
      >
        <div dangerouslySetInnerHTML={{ __html: previewContent }} />
      </Modal>

      <Modal
        title={isEditing ? 'Edit Blog' : 'Create Blog'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSubmit}
        okText={isEditing ? 'Save' : 'Create'}
        width={800}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="image"
            label="Image"
            rules={[{ required: true, message: 'Please input the blog image!' }]}>
            <Upload
              listType='picture-card'
              fileList={imgUrl ? [{
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: imgUrl,
              }] : []}
              beforeUpload={handleUpload}
            >
              <UploadOutlined />
            </Upload>
          </Form.Item>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please input the blog title!' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: 'Please input the blog content!' }]}>
            {/* <Input.TextArea rows={4} /> */}
            <Editor value={content} onChange={(e) => setContent(e.target.value)} >
              <Toolbar>
                <BtnUndo />
                <BtnRedo />
                <Separator />
                <BtnBold />
                <BtnItalic />
                <BtnUnderline />
                <BtnStrikeThrough />
                <Separator />
                <BtnNumberedList />
                <BtnBulletList />
                <Separator />
                <BtnLink />
                <BtnClearFormatting />
                <HtmlButton />
                <Separator />
                <BtnStyles />
              </Toolbar>
            </Editor>
          </Form.Item>
          <Form.Item
            name="linkedServiceIds"
            label="Linked Services"
            rules={[{ required: true, message: 'Please select linked services!' }]}>
            <Select mode="multiple">
              {listService.map(service => (
                <Select.Option key={service.id} value={service.id}>
                  {service.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BlogPage;
