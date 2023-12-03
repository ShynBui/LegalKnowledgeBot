import { createContext, useEffect, useState } from 'react';
import TreeView from './components/TreeView';
import './style.css';
import { FaCaretDown } from 'react-icons/fa6';
import APIs, { endpoints } from '../../configs/APIs';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { get, post } from '~/utils/request';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const FileContext = createContext();

const PhapDienV2 = () => {
    const [html, setHTML] = useState();
    const [file, setFile] = useState();
    const [topics, setTopics] = useState([]);
    const [subTopics, setSubTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState('');
    const [filterTopic, setFilterTopic] = useState(null);
    const [selectedSubTopic, setSelectedSubTopic] = useState('');
    const [filterSubTopic, setFilterSubTopic] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const [listThuatNgu, setListThuatNgu] = useState([]);

    useEffect(() => {
        getTopics();
    }, []);

    useEffect(() => {
        let url = import.meta.env.VITE_PUBLIC_URL + file + '.html';
        let url2 = 'http://localhost:5051/api/thuat_ngu/' + file;

        getHtml(url);
        console.log('id', url2);
        post(url2).then((res) => {
            setListThuatNgu(res);
        });
    }, [file]);
    console.log(listThuatNgu);
    useEffect(() => {
        if (selectedTopic.length > 0) {
            getSubTopic(selectedTopic);
            setFilterTopic(topics.filter((topic) => String(topic.id) === selectedTopic));
        } else {
            setFilterTopic(topics);
        }
    }, [selectedTopic, topics]);

    useEffect(() => {
        if (selectedTopic.length > 0) {
            setFilterSubTopic(subTopics.filter((subTopic) => String(subTopic.id) === selectedSubTopic));
        } else {
            setFilterTopic(subTopics);
        }
    }, [selectedSubTopic, subTopics]);

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

    const escapeRegExp = (text) => {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    };
    const getHtml = async (url) => {
        try {
            const res = await fetch(url);
            if (res.status === 200) {
                let text = await res.text();
                let parser = new DOMParser();
                let doc = parser.parseFromString(text, 'text/html');
                let imgs = doc.getElementsByTagName('img');
                while (imgs.length > 0) {
                    imgs[0].parentNode.removeChild(imgs[0]);
                }
                text = doc.body.innerHTML;
                // listThuatNgu.map((tn, index) => {});
                // const highlightedText = text.replace(
                //     /(An ninh)/g,
                //     '<span class="highlight" style="text-decoration: underline; cursor: pointer;">$1</span>',
                // );
                const listThuatNguFake = ['An ninh', 'chính sách', 'Cộng hòa'];
                // console.log(listThuatNgu);
                // const temp = listThuatNgu.map((tn, index) => {

                //     console.log(tn.id)
                // })
                // Tìm kiếm và làm nổi bật các cụm từ trong mảng thuật ngữ
                const regex = new RegExp(`(${listThuatNguFake.join('|')})`, 'gi');

                const highlightedText = text.replace(
                    regex,
                    '<span class="highlight" style="text-decoration: underline; cursor: pointer;">$1</span>',
                );

                setHTML(highlightedText);
            }
        } catch (ex) {
            console.error(ex);
        }
    };

    const handleMouseOver = (event) => {
        if (event.target.classList.contains('highlight')) {
            setModalContent(event.target.innerText);
            setIsModalOpen(true);
        }
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const getSubTopic = async (id) => {
        console.log('da vao');

        try {
            const url = endpoints.de_muc_phap_dien(id);
            const res = await APIs.get(url);
            setSubTopics(res.data);
        } catch (ex) {
            console.error(ex);
        }
    };
    const changeTopic = (event) => {
        setSelectedTopic(event.target.value);
    };

    const changeSubTopic = (event) => {
        setSelectedSubTopic(event.target.value);
    };
    return (
        <>
            <div className="wrapper d-flex">
                <div style={{ width: '80%', margin: '' }}>
                    <h1
                        className="title"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            fontSize: '30px',
                            fontWeight: '900',
                            marginBottom: '35px',
                        }}
                    >
                        Bộ pháp điển điện tử
                    </h1>
                    <div className="search-grid">
                        <div className="relative">
                            <select onChange={changeTopic} className="select-title">
                                <option value="">-- Xem theo chủ đề --</option>
                                <>
                                    {topics &&
                                        topics.map((topic, index) => {
                                            return (
                                                <option key={index} value={topic.id}>
                                                    {topic.ten_chu_de}
                                                </option>
                                            );
                                        })}
                                </>
                            </select>
                            {/* <FaCaretDown className="arrow" /> */}
                        </div>
                        <div className="relative">
                            <select onChange={changeSubTopic} className="select-title">
                                <option>-- Xem theo Đề mục --</option>
                                {subTopics.map((subTopic, index) => (
                                    <option key={index} value={subTopic.id}>
                                        {subTopic.ten_de_muc}
                                    </option>
                                ))}
                            </select>
                            {/* <FaCaretDown className="arrow" /> */}
                        </div>
                        <div>
                            <input className="search-input" type="text" placeholder="Nhập từ khóa để tìm kiếm" />
                        </div>
                    </div>
                    <Modal
                        open={isModalOpen}
                        onClose={closeModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                {modalContent}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Dinh nghia
                            </Typography>
                        </Box>
                    </Modal>
                    <FileContext.Provider value={{ file, setFile, topics, subTopics }}>
                        <div className="p-2 lg:p-10 grid grid-cols-10">
                            <div className="col-span-10 lg:col-span-3 border-r-0 border-b-2 lg:border-r-2 lg:border-b-0 border-dark p-2">
                                <div className="boPhapDien">
                           
                                    <TreeView data={filterTopic ? filterTopic : topics}></TreeView>
                                </div>
                            </div>

                            <div className="col-span-10 lg:col-span-7 px-5">
                                {html && (
                                    <div
                                        onClick={handleMouseOver}
                                        className="px-10 py-5 bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1)] h-[120rem] overflow-y-auto"
                                        dangerouslySetInnerHTML={{ __html: html }}
                                    />
                                )}
                            </div>
                        </div>
                    </FileContext.Provider>
                </div>
                <div style={{ width: '20%' }}>
                    <h1 style={{display:'flex', justifyContent:'center', fontSize:'28px', fontWeight:'900', marginBottom:'37px'}}>Danh sách thuật ngữ</h1>
                    <div className="list_thuat_ngu" style={{height:'1000px', overflow:'scroll', border:'1px solid', padding:'10px'}}>
                        {Object.entries(listThuatNgu).map(([term, meaning], index) => (
                            <li key={index}>
                                <strong>{term}:</strong> {meaning}
                            </li>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PhapDienV2;
