import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { get } from '~/utils/request';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

const ChiTietPhapDien = () => {
    const [html, setHtml] = useState('');
    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    useEffect(() => {
        fetch(`/BoPhapDienDienTu/demuc/${id}.html`)
            .then((r) => r.text())
            .then((text) => {
                let parser = new DOMParser();
                let doc = parser.parseFromString(text, 'text/html');
                let imgs = doc.getElementsByTagName('img');
                while (imgs.length > 0) {
                    imgs[0].parentNode.removeChild(imgs[0]);
                }
                text = doc.body.innerHTML;

                const highlightedText = text.replace(
                    /(An ninh)/g,
                    '<span class="highlight" style="text-decoration: underline; cursor: pointer;">$1</span>',
                );
                setHtml(highlightedText);
            });
    }, [id]);

    const handleMouseOver = (event) => {
        if (event.target.classList.contains('highlight')) {
            setModalContent(event.target.innerText);
            setIsModalOpen(true);
        }
    };

    const handleClick = (event) => {
        if (event.target.classList.contains('highlight')) {
            event.preventDefault(); // Ngăn chặn hành vi mặc định của liên kết
            // Thực hiện các hành động khác nếu cần
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div onClick={handleMouseOver} dangerouslySetInnerHTML={{ __html: html }} />

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
        </>
    );
};

export default ChiTietPhapDien;
