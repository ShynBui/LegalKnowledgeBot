import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import APIs, { endpoints } from '../../configs/APIs';
import cookie from 'react-cookies';
import { post } from '~/utils/request';

import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';

const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
);

const TimKiemThuatNgu = () => {
    const [terms, setTerms] = useState([]);
    const [findTerms, setfindTerms] = useState({});
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        noi_dung_van_ban: '',
        noi_dung_bao_cao: '',
        thuat_ngu: '',
        id_user: cookie.load('user').id,
    });

    const search = async (evt) => {
        evt.preventDefault();
        try {
            const res = await APIs.post(endpoints['search'], findTerms);
            if (res.status === 200) {
                setTerms(res.data);
            }
        } catch (ex) {
            console.error(ex);
        }
    };

    return (
        <div style={{ width: '80%', margin: '0 auto' }}>
            <h1 className="title d-flex justify-center " style={{ margin: '0 auto', width: '80%' }}>
                Tìm thuật ngữ trong văn bản
            </h1>
            <form onSubmit={search}>
                <div className="w-full mb-4 bg-white py-2 border-2 border-dark">
                    <div className="px-4 py-2 ">
                        <textarea
                            name="paragraph"
                            value={findTerms.paragraph}
                            onChange={(e) => {
                                setfindTerms({ paragraph: e.target.value });
                                setForm({ ...form, noi_dung_van_ban: e.target.value });
                            }}
                            rows="5"
                            className="w-full bg-white p-2 text-lg focus:outline-none"
                            placeholder="Nhập văn bản đề tìm thuật ngữ ..."
                        ></textarea>
                    </div>
                    <div className="flex items-center justify-between px-3 py-3 border-t-2 border-dark">
                        <button type="submit" className="px-4 py-2 bg-button text-white border-2 border-dark">
                            Tìm thuật ngữ
                        </button>
                    </div>
                </div>
            </form>
            <div className="body_wrapper d-flex justify-center items-center">
                <div className="body_left" style={{ width: '50%' }}>
                    {terms && terms.length > 0 ? (
                        <div className="overflow-x-auto my-10">
                            <table className="table">
                                <thead className="text-button font-bold text-lg border-b-2 border-dark">
                                    <tr>
                                        <th>STT</th>
                                        <th>Thuật ngữ</th>
                                        <th>Định nghĩa</th>
                                    </tr>
                                </thead>
                                <tbody className="text-base">
                                    {terms.map((term, index) => {
                                        console.log(term);
                                        return (
                                            <tr
                                                key={index + 1}
                                                className={`${
                                                    index !== 49 ? 'border-b border-dark' : ''
                                                }  hover:bg-blue-100`}
                                            >
                                                <th>{index + 1}</th>
                                                <td>{term.word}</td>
                                                <td>{term.mean}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : null}
                </div>
                <div className="body_right d-flex" style={{ width: '50%', marginLeft: '15px' }}>
                    {terms && terms.length > 0 ? (
                        <div className="overflow-x-auto my-10">
                            <table className="table">
                                <thead className="text-button font-bold text-lg border-b-2 border-dark">
                                    <tr>
                                        <th>STT</th>
                                        <th>Thuật ngữ</th>
                                        <th>Định nghĩa</th>
                                        <th>Góp ý</th>
                                    </tr>
                                </thead>
                                <tbody className="text-base">
                                    {terms.map((term, index) => {
                                        return (
                                            <tr
                                                key={index + 1}
                                                className={`${
                                                    index !== 49 ? 'border-b border-dark' : ''
                                                }  hover:bg-blue-100`}
                                            >
                                                <th>{index + 1}</th>
                                                <td>{term.word}</td>
                                                <td>{term.mean}</td>
                                                <td style={{ width: '100px' }}>
                                                    {' '}
                                                    <button
                                                        type="submit"
                                                        className="py-2 bg-button text-white border-2 border-dark"
                                                        style={{ width: '80px' }}
                                                        onClick={() => {
                                                            setOpen(true);
                                                            setForm({
                                                                ...form,
                                                                thuat_ngu: term.word,
                                                            });
                                                        }}
                                                    >
                                                        Báo cáo
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : null}
                </div>
            </div>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Báo cáo
                    </Typography>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            let tmp = post('/bao_cao_nguoi_dung/', form);
                            console.log(tmp);
                            setOpen(false);
                        }}
                    >
                        <Textarea
                            aria-label="minimum height"
                            minRows={3}
                            placeholder="Minimum 3 rows"
                            onChange={(e) => {
                                setForm({ ...form, noi_dung_bao_cao: e.target.value });
                            }}
                        />
                        <Button type="submit" variant="contained">
                            Gửi báo cáo
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default TimKiemThuatNgu;
