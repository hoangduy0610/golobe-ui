import Footer from "@/components/Footer/Footer";
import MiniHeader from "@/components/Header/MiniHeader";
import React, { useEffect } from "react";
import "./Chat.scss";
import { Card } from "antd";
import MainApiRequest from "@/redux/apis/MainApiRequest";
import { message as antMessage } from "antd"
import { markDownToHtml } from "@/utils/string";

const ChatHeading: React.FC = () => {
    return (
        <div className="d-flex flex-row py-2 gap-3">
            <div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFaMha-LdQVxj5O-HLk5sa2EpWD_sCZSH1gQ&s" alt="avatar" className="rounded-circle" style={{ maxHeight: 50 }} />
            </div>
            <div className="d-flex flex-column">
                <h5 className="mb-0">Golobe Asisstant</h5>
                <p className="text-muted mb-0">Hello, how can I help you?</p>
            </div>
        </div>
    );
}

type ChatHistory = {
    message: string;
    isSender: boolean;
    isTemp: boolean;
}

const ChatContent = ({ chatHistory }: { chatHistory: ChatHistory[] }) => {
    return (
        <div className="chat-content" style={{ overflowY: 'scroll', height: '100%' }}>
            <div className="d-flex flex-column gap-3">
                {/* <div className="d-flex flex-row align-items-center gap-3 m-3 justify-content-end">
                    <div className="chat-bubble bg-primary text-white py-1 px-3 rounded">
                        Hello
                    </div>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmpoQaaw13BKAmYv1iRPzkz9AkM0ZskCqK_g&s" alt="avatar" className="rounded-circle" style={{ maxHeight: 50 }} />
                </div>
                <div className="d-flex flex-row align-items-center gap-3 m-3">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFaMha-LdQVxj5O-HLk5sa2EpWD_sCZSH1gQ&s" alt="avatar" className="rounded-circle" style={{ maxHeight: 50 }} />
                    <div className="chat-bubble bg-secondary text-dark py-1 px-3 rounded">
                        I want to know more about your services
                    </div>
                </div> */}
                {
                    chatHistory.map((chat, index) => (
                        <div key={index} className={`d-flex flex-row align-items-center gap-3 m-3 ${chat.isSender ? 'justify-content-end' : ''}`}>
                            {!chat.isSender &&
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFaMha-LdQVxj5O-HLk5sa2EpWD_sCZSH1gQ&s" alt="avatar" className="rounded-circle" style={{ maxHeight: 50 }} />
                            }
                            <div className={`chat-bubble ${chat.isSender ? 'bg-primary text-white' : 'bg-secondary text-dark'} py-1 px-3 rounded`}>
                                {chat.isSender ?
                                    chat.message :
                                    <div dangerouslySetInnerHTML={{ __html: markDownToHtml(chat.message) }}></div>
                                }
                            </div>
                            {chat.isSender &&
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmpoQaaw13BKAmYv1iRPzkz9AkM0ZskCqK_g&s" alt="avatar" className="rounded-circle" style={{ maxHeight: 50 }} />
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

const ChatInput = ({ onSend }: { onSend: (message: string) => void }) => {
    const [message, setMessage] = React.useState("");

    const handleSend = () => {
        onSend(message);
        setMessage("");
    }

    return (
        <div className="chat-input mx-2">
            <div className="input-group">
                <input type="text" className="form-control" placeholder="Type a message..." value={message} onChange={e => setMessage(e.target.value)} />
                <button className="btn btn-primary" onClick={handleSend}>Send</button>
            </div>
        </div>
    );
}

const Chat: React.FC = () => {
    const [chatHistory, setChatHistory] = React.useState<ChatHistory[]>([
        { message: "Hello! How can I help?", isSender: false, isTemp: false },
    ]);

    const callApiSendMessage = (message: string) => {
        MainApiRequest.post('/chat', { message }).then(res => {
            if (res.status === 200) {
                setChatHistory(
                    [
                        ...chatHistory, {
                            message: res.data,
                            isSender: false,
                            isTemp: false
                        }].filter(chat => !chat.isTemp)
                );
            }
        }).catch(err => {
            console.log(err);
            antMessage.error('Error sending message');
            setChatHistory(chatHistory.filter(chat => !chat.isTemp || chat.isSender));
        });
    }

    const handleSend = (message: string) => {
        setChatHistory([...chatHistory, { message: message, isSender: true, isTemp: false }]);
    }

    useEffect(() => {
        if (chatHistory.length === 1) return;

        if (chatHistory[chatHistory.length - 1].isSender) {
            setChatHistory([...chatHistory, { message: "Typing...", isSender: false, isTemp: true }]);
            setTimeout(() => callApiSendMessage(chatHistory[chatHistory.length - 1].message), 100);
        }
    }, [chatHistory]);

    return (
        <>
            <div className="app">
                <div className="container-fluid">
                    <MiniHeader />
                    <div className="container mt-3">
                        <h1 className="text-center">Chat with Golobe</h1>

                        <Card
                            title={<ChatHeading />}
                            actions={[<ChatInput onSend={handleSend} />]}
                            styles={{
                                body: {
                                    width: "100%",
                                    height: "700px",
                                    // overflow: 'scroll',
                                    padding: 0,
                                }
                            }}
                        >
                            <ChatContent chatHistory={chatHistory} />
                        </Card>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Chat;
