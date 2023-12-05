import React, { useState } from 'react';
import APIs, { endpoints } from '../../configs/APIs';

const TimKiemThuatNgu = () => {

    const [terms, setTerms] = useState([]);
    const [findTerms, setfindTerms] = useState({});

    const search = async (evt) => {
        evt.preventDefault();
        try {
            const res = await APIs.post(endpoints["search"], findTerms);
            if (res.status === 200) {
                setTerms(res.data);
            }
        } catch (ex) {
            console.error(ex);
        }
    }

    return (
        <>
            <div>
                <h1 className="title d-flex justify-center " style={{margin:'0 auto', width:'80%'}}>Tìm thuật ngữ trong văn bản</h1>
                <form onSubmit={search}>
                    <div className="w-full mb-4 bg-white py-2 shadow-3xl border-2 border-dark">
                        <div className="px-4 py-2 ">
                            <textarea name="paragraph" value={findTerms.paragraph} onChange={(e) => setfindTerms({ "paragraph": e.target.value })} rows="5" className="w-full bg-white p-2 text-lg focus:outline-none" placeholder="Nhập văn bản đề tìm thuật ngữ ..." ></textarea>
                        </div>
                        <div className="flex items-center justify-between px-5 py-5 border-t-2 border-dark">
                            <button type="submit" className='px-4 py-2 bg-button hover:bg-buttonShadow text-white border-2 border-dark'>
                                Tìm thuật ngữ
                            </button>
                        </div>
                    </div>
                </form>
                <>
                    {terms && terms.length > 0 ? <div className="overflow-x-auto my-10">
                        <table className="table">
                            <thead className="text-button font-bold text-lg border-b-2 border-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Thuật ngữ</th>
                                    <th>Định nghĩa</th>
                                </tr>
                            </thead>
                            <tbody className="text-base">
                                {terms.map((term, index) => {
                                    return (<tr key={index + 1} className={`${index !== 49 ? "border-b border-dark" : ""}  hover:bg-blue-100`}>
                                        <th>{index + 1}</th>
                                        <td>{term.word}</td>
                                        <td>{term.mean}</td>
                                    </tr>)
                                })}
                            </tbody>
                        </table>
                    </div> : <></>}
                </>
            </div>
        </>

    );
};

export default TimKiemThuatNgu;