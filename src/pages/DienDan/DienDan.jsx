import { useReducer, useEffect, useState } from 'react';
import APIs, { endpoints } from '../../configs/APIs';
import { FaCaretDown } from 'react-icons/fa6';
import { get, post } from '~/utils/request';
import MyUserReducer from '@c/MyUserReducer';
import cookie from 'react-cookies';
import { Link, useNavigate } from 'react-router-dom';

const DienDan = () => {
    const [topics, setTopics] = useState([]);
    const navigate = useNavigate();

    const [selectedTopic, setSelectedTopic] = useState(null);
    const [listQuestions, setListQuestions] = useState([]);
    const [user, dispatch] = useReducer(MyUserReducer, cookie.load('user') || null);
    useEffect(() => {
        getTopics();
    }, []);

    const [formAddQuestion, setFormAddQuestion] = useState({
        tieu_de: '',
        noi_dung: '',
        chu_de_id: null,
        user_id: null,
    });

    const changeTopic = (event) => {
        setSelectedTopic(event.target.value);
    };

    useEffect(() => {
        getQuestion();
    }, [selectedTopic]);

    const getTopics = async () => {
        try {
            const res = await APIs.get(endpoints['chu_de_phap_dien']);
            if (res.status === 200) {
                setTopics(res.data);
            }
        } catch (ex) {
            console.error(ex);
        }
    };

    const getQuestion = async () => {
        try {
            const url = endpoints.cau_hoi_theo_chu_de(selectedTopic);
            const res = await APIs.get(url);

            setListQuestions(res.data);
        } catch (ex) {
            console.error(ex);
        }
    };

    const addQuestion = async () => {
        try {
            const res = await get('/add_cau_hoi', formAddQuestion);
            console.log(res);
        } catch (ex) {
            console.error(ex);
        }
    };

    const handleAddQuestion = async () => {
        if (user != null && selectedTopic != null) {
            try {
                const updatedForm = {
                    ...formAddQuestion,
                    chu_de_id: selectedTopic,
                    user_id: user.id,
                };

                setFormAddQuestion(updatedForm);
                await post('/add_cau_hoi', updatedForm).then((res) => {
                    setFormAddQuestion({
                        tieu_de: '',
                        noi_dung: '',
                        chu_de_id: null,
                        user_id: null,
                    });
                    getQuestion();
                });
            } catch (ex) {
                console.error(ex);
            }
        }
    };
    console.log(listQuestions);
    return (
        <>
            <div className="div" style={{width:'80%', margin: '0 auto'}}>
                <h1 className="text-4xl font-bold mb-6 d-flex justify-center">Diễn đàn hỏi đáp pháp luật</h1>

                <div className="relative">
                    <select onChange={changeTopic} className="select-title p-3 ml-5 border rounded-md bg-white">
                        <option value="">-- Xem câu hỏi theo chủ đề --</option>
                        {topics &&
                            topics.map((topic) => (
                                <option key={topic.id} value={topic.id}>
                                    {topic.ten_chu_de}
                                </option>
                            ))}
                    </select>
                </div>

                <div className="question_wrapper bg-gray-100 p-6 rounded-md">
                    <div className="question_header mb-4">
                        <h2 className="text-2xl font-bold">Gửi câu hỏi mới</h2>
                    </div>
                    <div className="question_body">
                        <input
                            className="focus:outline-none bg-white border border-gray-300 p-2 rounded-md mb-4 w-full"
                            type="text"
                            value={formAddQuestion.tieu_de}
                            placeholder="Nhập tiêu đề câu hỏi..."
                            onChange={(e) => setFormAddQuestion({ ...formAddQuestion, tieu_de: e.target.value })}
                        />
                        <div className="question_input">
                            <textarea
                                value={formAddQuestion.noi_dung}
                                className="focus:outline-none bg-white border border-gray-300 p-2 rounded-md w-full"
                                placeholder="Nhập câu hỏi..."
                                onChange={(e) => setFormAddQuestion({ ...formAddQuestion, noi_dung: e.target.value })}
                            ></textarea>
                        </div>
                    </div>
                    <div className="question_action mt-4">
                        <button onClick={handleAddQuestion} className="bg-red-500 text-white py-2 px-4 rounded-md">
                            Gửi câu hỏi
                        </button>
                    </div>
                </div>

                <div className="question_forum_wrapper mb-4 h-100 bg-wheat-700">
                    {listQuestions.map((question, index) => (
                        <div
                            key={index}
                            className="question_forum d-flex justify-between px-5 py-3 mb-2 items-center "
                            style={{ border: '2px solid #e8e8e8' }}
                        >
                            <div className="forum_header d-flex">
                                <img
                                    className="rounded-full w-12 h-12"
                                    src="src/asset/logo.png"
                                    alt=""
                                />
                                <div className="sub_header pl-5">
                                    <div className="header_title">{question.tieu_de}</div>
                                    <div className="header_content d-flex ">
                                        <div className="author mr-4">{question.author}</div>
                                        <div className="time">{question.thoi_gian}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="form_body d-flex ">
                                <div className="reply"></div>
                            </div>
                            <div className="forum_action bg-sky-500 hover:bg-sky-700 mg-10 cursor-pointer p-3 rounded-lg ">
                                <button onClick={() => navigate(`/cauhoi/${question.id}`)} className="text-white">
                                    Xem chi tiết
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default DienDan;
