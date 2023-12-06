import React, { useState } from 'react';
import APIs, { endpoints } from '../../configs/APIs';

const TimKiemThuatNgu = () => {
    const [terms, setTerms] = useState([]);
    const [findTerms, setfindTerms] = useState({});

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
        <>
            <div style={{ width: '80%', margin: '0 auto' }} className="">
                <h1 className="title d-flex justify-center " style={{ margin: '0 auto', width: '80%' }}>
                    Tìm thuật ngữ trong văn bản
                </h1>
                <form onSubmit={search}>
                    <div className="w-full mb-4 bg-white py-2 border-2 border-dark">
                        <div className="px-4 py-2 ">
                            <textarea
                                name="paragraph"
                                value={findTerms.paragraph}
                                onChange={(e) => setfindTerms({ paragraph: e.target.value })}
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
                <>
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
                            ) : (
                                <></>
                            )}
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
                                                        <td style={{width:'100px'}}>
                                                            {' '}
                                                            <button
                                                                type="submit"
                                                                className="py-2 bg-button text-white border-2 border-dark"
                                                                style={{width:'80px'}}
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
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </>
            </div>
        </>
    );
};

export default TimKiemThuatNgu;
