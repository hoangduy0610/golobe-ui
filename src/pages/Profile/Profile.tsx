import Footer from '@/components/Footer/Footer';
import MiniHeader from '@/components/Header/MiniHeader';
import "./Profile.scss";
import cover from '@/assets/cover_profile.jpeg';
import avatar from '@/assets/avatar.jpeg';
import { Button, Card, Form, Input, Spin, message } from 'antd';
import { useEffect, useState } from 'react';
import MainApiRequest from '@/redux/apis/MainApiRequest';

export function Profile() {
    const [form] = Form.useForm();

    const [user, setUser] = useState<any>({});
    const [isUpdating, setIsUpdating] = useState(false);

    const fetchUserInfo = async () => {
        const res = await MainApiRequest.get('/auth/callback');
        setUser(res.data.data);
        form.setFieldsValue({
            name: res.data.data.name,
            email: res.data.data.email,
        });
    }

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const handleUpdate = async () => {
        setIsUpdating(true);
        const values = form.getFieldsValue();
        const data = {
            name: values.name,
            email: values.email,
        }
        const res = await MainApiRequest.put(`/user/${user?.id}`, data)
            .then(() => {
                setIsUpdating(false);
                message.success('Update successful');
                fetchUserInfo();
            })
            .catch(() => {
                message.error('Update failed');
                setIsUpdating(false);
            });
    }

    return (
        <>
            <MiniHeader />
            <div className="profile-page">
                <div className="app">
                    <div className="container">
                        <div className="cover mt-4">
                            <img src={cover} style={{ width: '100%' }} />

                            <div className="avatar">
                                <img src={avatar} alt="Avatar" />
                            </div>
                        </div>
                        <div className="profile-content" style={{ marginTop: 50 }}>
                            <h4 className="text-center fw-bold">{user?.name || 'N/A'}</h4>
                            <p className="text-center">{user?.email || 'N/A'}</p>
                        </div>
                        <center>
                            <Card className="mt-4 w-75">
                                <Form
                                    form={form}
                                    layout="vertical"
                                    name="basic"
                                >
                                    <Form.Item
                                        label="Name"
                                        name="name"
                                        rules={[{ required: true, message: 'Please input your name!' }]}
                                    >
                                        <Input style={{ height: 40 }} type="text" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={[{ required: true, message: 'Please input your email!' }]}
                                    >
                                        <Input style={{ height: 40 }} type="email" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Phone"
                                        name="phone"
                                        rules={[{ required: true, message: 'Please input your phone!' }]}
                                    >
                                        <Input style={{ height: 40 }} type="text" disabled readOnly placeholder='Not available' />
                                    </Form.Item>
                                    <Form.Item
                                        label="Address"
                                        name="address"
                                        rules={[{ required: true, message: 'Please input your address!' }]}
                                    >
                                        <Input style={{ height: 40 }} type="text" disabled readOnly placeholder='Not available' />
                                    </Form.Item>

                                    <button className="btn btn-primary mt-4 w-100" onClick={handleUpdate} disabled={isUpdating}>
                                        {isUpdating ? <Spin /> : 'Update'}
                                    </button>
                                </Form>
                            </Card>
                        </center>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
