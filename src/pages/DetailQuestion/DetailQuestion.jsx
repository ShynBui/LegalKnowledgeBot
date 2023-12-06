import { useNavigate, useParams } from 'react-router-dom';
import { useReducer, useEffect, useState } from 'react';
import APIs, { endpoints } from '../../configs/APIs';
import { FaCaretDown } from 'react-icons/fa6';
import { get, post } from '~/utils/request';
import MyUserReducer from '@c/MyUserReducer';
import cookie from 'react-cookies';
import { Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import axios from 'axios';

const DetailQuestion = () => {
    const { id } = useParams();
    const [user, dispatch] = useReducer(MyUserReducer, cookie.load('user') || null);
    const [question, setQuestion] = useState({
        ten_chu_de: '',
        tieu_de: '',
        noi_dung: '',
        author: '',
        thoi_gian: '',
    });
    const [answer, setAnswer] = useState([]);
    const [formAddTraLoi, setAddTraLoi] = useState();

    useEffect(() => {
        getQuestion();
        getAnswerQuestion();
    }, []);

    const getQuestion = async () => {
        try {
            const url = endpoints.cau_hoi_theo_id(id);
            const res = await APIs.get(url);
            setQuestion(res.data);
        } catch (ex) {
            console.error(ex);
        }
    };
    const getAnswerQuestion = async () => {
        try {
            const url = endpoints.tra_loi(id);
            const res = await APIs.get(url);
            setAnswer(res.data);
        } catch (ex) {
            console.error(ex);
        }
    };

    const addReply = async () => {
        if (user != null) {
            try {
                const updatedForm = {
                    ...formAddTraLoi,
                    question_id: id,
                    user_id: user.id,
                };

                setAddTraLoi(updatedForm);
                await post('/add_tra_loi/', updatedForm).then((res) => {
                    setAddTraLoi({
                        noi_dung: '',
                    });
                    getAnswerQuestion();
                });
            } catch (ex) {
                console.error(ex);
            }
        }
    };

    const deleteQuestion = async (id) => {
        console.log(user);
        const headers = {
            Authorization: `Bearer ${cookie.load('token')}`,
        };
        const temp = `/delete_tra_loi_by_id/${id}`;
        console.log(headers);
        if (user.role != 1) {
            alert('Bạn không phải admin, không có quyền xóa');
        } else {
            await get(`/delete_tra_loi_by_id/${id}/`, {
                headers: headers,
            }).then((res) => {
                console.log(res);
            });
        }
    };

    const isAdmin = user && user.role === '2';

    return (
        <>
            <div className="main " style={{ width: '80%', margin: '0 auto' }}>
                <div
                    className="main_header d-flex flex-col justify-center"
                    style={{ border: '2px solid #e8e8e8', padding: '15px' }}
                >
                    <div className="main_question_title mb-2" style={{ fontSize: '20px', marginBottom: '12px' }}>
                        Chủ đề : {question.ten_chu_de}
                    </div>
                    <div className="main_subInfo d-flex">
                        <div className="question_author mr-2 d-flex items-align " style={{ opacity: 0.8 }}>
                            <AccountCircleIcon style={{ marginRight: '5px' }} />
                            <span style={{ marginRight: '5px' }}>Đăng bởi:</span>
                            {question.author}
                        </div>
                        <div
                            className="question_time d-flex items-align "
                            style={{ opacity: 0.8, marginRight: '10px' }}
                        >
                            <AccessTimeIcon style={{ marginRight: '5px' }} />
                            {question.thoi_gian}
                        </div>
                    </div>
                </div>
                <div className="question_body mt-4">
                    <div className="question_info d-flex w-full" style={{ border: '2px solid #e8e8e8' }}>
                        <div
                            className="info_left pt-3 w-1/12 d-flex  flex-col items-center "
                            style={{ backgroundColor: '#ebeaea', borderRight: '2px solid #e8e8e8' }}
                        >
                            <div className="avatar d-flex ">
                                <Avatar className="d-flex">B</Avatar>
                            </div>
                            <div className="name">{question.author}</div>
                            <div className="role">Member</div>
                        </div>
                        <div className="info_right h-60 w-11/12  ">
                            <div
                                className="reply_info d-flex  w-full  "
                                style={{
                                    border: '2px solid #e8e8e8',
                                    boxShadow: 'rgb(225 225 225) 5px -3px 18px',
                                }}
                            >
                                <div className="info_right h-60 " style={{ position: 'relative', width: '100%' }}>
                                    <div
                                        style={{
                                            borderBottom: '1px solid',
                                            paddingLeft: '10px',
                                            paddingTop: '10px',
                                            opacity: 0.5,
                                            paddingBottom: '10px',
                                        }}
                                        className="time d-flex items-center"
                                    >
                                        Đã đăng : {question.thoi_gian}
                                    </div>
                                    <div className="container pl-4 pt-2">
                                        <div
                                            className="title"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                background: '#dbdbdb',
                                                padding: '10px 30px 14px 20px',
                                                borderLeft: '4px solid #f38306',
                                            }}
                                        >
                                            {question.noi_dung}
                                        </div>
                                        <div className="content" style={{ marginTop: '12px' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {answer != null ? (
                        <>
                            {answer.map((ans, index) => (
                                <>
                                    <div
                                        className="reply_info d-flex mt-3 w-full  "
                                        style={{
                                            border: '2px solid #e8e8e8',
                                            boxShadow: 'rgb(225 225 225) 5px -3px 18px',
                                        }}
                                    >
                                        <div
                                            className="info_left pt-3 w-1/12 d-flex flex-col items-center"
                                            style={{ backgroundColor: '#56aed4', borderRight: '2px solid #e8e8e8' }}
                                        >
                                            <div className="avatar d-flex ">
                                                <Avatar className="d-flex">{isAdmin ? 'A' : 'U'}</Avatar>
                                            </div>
                                            <div className="name mt-2" style={{ fontWeight: '700' }}>
                                                {ans.author_reply}
                                            </div>
                                            <div className="role">{isAdmin ? 'admin' : 'user'}</div>
                                        </div>
                                        <div className="info_right h-60 w-11/12 " style={{ position: 'relative' }}>
                                            <div
                                                style={{
                                                    borderBottom: '1px solid',
                                                    paddingLeft: '10px',
                                                    paddingTop: '10px',
                                                    opacity: 0.5,
                                                    paddingBottom: '10px',
                                                }}
                                                className="time d-flex items-center"
                                            >
                                                Đã trả lời : {ans.thoi_gian}
                                            </div>
                                            <div className="container pl-4 pt-2">
                                                <div
                                                    className="title"
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        background: '#dbdbdb',
                                                        padding: '10px 30px 14px 20px',
                                                        borderLeft: '4px solid #56aed4',
                                                    }}
                                                >
                                                    Trả lời câu hỏi : {question.tieu_de} của {question.author}
                                                </div>
                                                <div className="content" style={{ marginTop: '12px' }}>
                                                    {ans.reply}
                                                </div>
                                            </div>
                                            <button
                                                style={{ position: 'absolute', right: '15px', bottom: '15px' }}
                                                className="bg-red-500 text-white py-2 px-4 rounded-md"
                                                onClick={() => deleteQuestion(ans.id)}
                                            >
                                                Xóa câu trả lời
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </>
                    ) : (
                        <>
                            <h1>Chua co cau tra loi</h1>
                        </>
                    )}
                </div>
                {true && (
                    <>
                        <input
                            value={addReply.noi_dung}
                            className="focus:outline-none bg-white border mt-10 border-gray-300 p-2 rounded-md mb-4 w-full"
                            type="text"
                            placeholder="Nhập câu trả lời của bạn..."
                            onChange={(e) => setAddTraLoi({ ...formAddTraLoi, noi_dung: e.target.value })}
                        />
                        <div className="question_action h-300" style={{ overflow: 'scroll', height: '300px' }}>
                            <button onClick={addReply} className="bg-red-500 text-white py-2 px-4 rounded-md">
                                Gửi câu hỏi
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default DetailQuestion;
