import ChatIcon from '@mui/icons-material/Chat';
import Button from '@mui/material/Button';
import ArticleIcon from '@mui/icons-material/Article';

import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
         <img src="src/asset/banner.png" alt="" />
         <div
            style={{
                display: 'flex',
                gap: 50,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
            }}
        >
            <Link to="/chat">
                <Button variant="outlined" sx={{ flexDirection: 'column' }}>
                    <ChatIcon sx={{ fontSize: 100 }} />
                    <span>Chat</span>
                </Button>
            </Link>
            <Link to="/phap-dien">
                <Button variant="outlined" sx={{ display: 'flex', flexDirection: 'column' }}>
                    <ArticleIcon sx={{ fontSize: 100 }} />
                    <span>Pháp điển</span>
                </Button>
            </Link>
            <Link to="/qppl">
                <Button variant="outlined" sx={{ display: 'flex', flexDirection: 'column' }}>
                    <ArticleIcon sx={{ fontSize: 100 }} />
                    <span>Quy phạm pháp luật</span>
                </Button>
            </Link>
            <Link to="/thuatngu">
                <Button variant="outlined" sx={{ display: 'flex', flexDirection: 'column' }}>
                    <ArticleIcon sx={{ fontSize: 100 }} />
                    <span>Thuật ngữ</span>
                </Button>
            </Link>
        </div>
        </>
       
    );
};

export default Home;
