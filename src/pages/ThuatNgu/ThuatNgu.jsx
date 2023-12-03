import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import { get } from '~/utils/request';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const PAGE_SIZE = 10;

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

const ThuatNgu = () => {
    const [listThuatNgu, setListThuatNgu] = useState([]);
    const [numberPage, setNumberPage] = useState(1);
    const [start, setStart] = useState(0);
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        setStart((numberPage - 1) * PAGE_SIZE);
    }, [numberPage]);

    useEffect(() => {
        get('/thuat_ngu')
            .then((result) => {
                setListThuatNgu(result);
            })
            .catch((err) => {
                // Handle error
                console.error(err);
            });
    }, []);

    const handleClick = (term) => {
        handleOpen();
        setSelectedTerm(term);
    };

    const handleSearch = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
    };

    const filteredList = listThuatNgu.filter((thuatngu) =>
        thuatngu.thuat_ngu.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <>
            <header
                style={{ display: 'flex', justifyContent: 'center', padding: '10px', width: '90%', margin: '0 auto' }}
            >
                <img src="src/assets/thuatngu.png" alt="" />
            </header>
            <div className="wrapper" style={{ display: 'flex', width: '90%', margin: '0 auto' }}>
                <div className="item_left" style={{ width: '100%' }}>
                    <TextField
                        style={{ marginTop: '10px', marginBottom: '10px' }}
                        value={searchTerm}
                        onChange={handleSearch}
                        required
                        label="Tìm kiếm thuật ngữ"
                    />

                    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                        <thead>
                            <tr>
                                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Thuật ngữ</th>
                                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Nguồn</th>
                                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Hiệu lực</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredList.slice(start, start + PAGE_SIZE).map((thuatngu, index) => (
                                <tr
                                    key={index}
                                    style={{
                                        cursor: 'pointer',
                                    }}
                                >
                                    <td
                                        onClick={() => handleClick(thuatngu)}
                                        style={{ padding: '8px', border: '1px solid #ddd' }}
                                    >
                                        {thuatngu.thuat_ngu}
                                    </td>
                                    <td
                                        style={{
                                            padding: '8px',
                                            border: '1px solid #ddd',
                                            color: thuatngu.link ? 'blue' : 'black', // Change color if there's a link
                                            textDecoration: 'underline',
                                        }}
                                    >
                                        {thuatngu.link ? (
                                            <a href={thuatngu.link} target="_blank" rel="noopener noreferrer">
                                                {thuatngu.nguon}
                                            </a>
                                        ) : (
                                            thuatngu.nguon
                                        )}
                                    </td>
                                    <td
                                        style={{
                                            padding: '8px',
                                            border: '1px solid #ddd',
                                            color: thuatngu.label === 1 ? 'green' : 'red',
                                        }}
                                    >
                                        {thuatngu.label === 1 ? 'Còn hiệu lực' : 'Hết hiệu lực'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div
                        className="pagination"
                        style={{ margin: '0 auto', display: 'flex', justifyContent: 'center', marginTop: '10px' }}
                    >
                        <Stack spacing={2}>
                            <Pagination
                                count={Math.ceil(filteredList.length / PAGE_SIZE)}
                                showFirstButton
                                showLastButton
                                shape="rounded"
                                onChange={(e, p) => {
                                    setNumberPage(p);
                                    setSelectedTerm(null);
                                }}
                            />
                        </Stack>
                    </div>
                </div>

                {selectedTerm && (
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                {selectedTerm.thuat_ngu}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                {selectedTerm.mo_ta}
                            </Typography>
                        </Box>
                    </Modal>
                )}
            </div>
        </>
    );
};

export default ThuatNgu;
