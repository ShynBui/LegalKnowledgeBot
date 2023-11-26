import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { post } from '~/utils/request';

const QPPL = () => {
    const [law, setLaw] = useState();
    let kw = '23/2023/QH15';

    return (
        <div>
            <form
                style={{ margin: '20px 0 0 20px' }}
                onSubmit={(e) => {
                    e.preventDefault();
                    fetch(
                        `https://vbpl.vn/VBQPPL_UserControls/Publishing/TimKiem/pKetQuaTimKiem.aspx?dvid=13&IsVietNamese=True&SearchIn=VBPQFulltext&type=0&s=0&Keyword=${kw}&stemp=1&TimTrong1=Title&TimTrong1=Title1&order=VBPQNgayBanHanh&TypeOfOrder=False&CoQuanBanHanh=55`,
                    )
                        .then((res) => res.text())
                        .then((txt) => {
                            console.log(txt);
                        });
                }}
            >
                <TextField required label="Từ khóa" />
                <Button type="submit">Tìm kiếm</Button>
            </form>
        </div>
    );
};

export default QPPL;
