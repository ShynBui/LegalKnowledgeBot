import { useNavigate, useParams } from 'react-router-dom';
import { useReducer, useEffect, useState } from 'react';
import APIs, { endpoints } from '../../configs/APIs';
import { FaCaretDown } from 'react-icons/fa6';
import { get, post } from '~/utils/request';
import MyUserReducer from '@c/MyUserReducer';
import cookie from 'react-cookies';
import { Avatar } from '@mui/material';
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

    console.log(id);
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

    const isAdmin = user && user.role === '2';
    console.log(formAddTraLoi);
    return (
        <>
            <div className="main " style={{ width: '80%', margin: '0 auto' }}>
                <div className="main_header d-flex flex-col" style={{ border: '2px solid #e8e8e8' }}>
                    <div className="main_question_title">Chủ đề : {question.ten_chu_de}</div>
                    <div className="main_subInfo d-flex">
                        <div className="question_author mr-2">{question.author}</div>
                        <div className="question_time">20/2</div>
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
                            <div className="time">{question.tieu_de}</div>
                            <div className="content">{question.noi_dung}</div>
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
                                            <div className="name">{ans.author_reply}</div>
                                            <div className="role">{isAdmin ? 'admin' : 'user'}</div>
                                        </div>
                                        <div className="info_right h-60 w-11/12 ">
                                            <div className="time">{ans.thoi_gian}</div>
                                            <div className="container pl-4 pt-2">
                                                <div className="title">
                                                    Trả lời câu hỏi : {question.tieu_de} của {question.author}
                                                </div>
                                                <div className="content">Trả lời :{ans.reply}</div>
                                            </div>
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
