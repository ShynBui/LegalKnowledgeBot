import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { get } from '~/utils/request';

const ChiTietPhapDien = () => {
    const [html, setHtml] = useState('');
    const { id } = useParams();

    useEffect(() => {
        fetch(`/BoPhapDienDienTu/demuc/${id}.html`)
            .then((r) => r.text())
            .then((text) => {
                setHtml(text);
            });
    }, []);
    return <div style={{ padding: '0 32px' }} dangerouslySetInnerHTML={{ __html: html }}></div>;
};

export default ChiTietPhapDien;
