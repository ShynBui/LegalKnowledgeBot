import { useEffect, useState, useRef } from 'react';
import { Box, TextField, Button, Typography, Avatar, Grid, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const Chat = () => {
    const [input, setInput] = useState('');

    const [messages, setMessages] = useState([
        { id: 1, text: 'Chào bạn!', sender: 'bot' },
        { id: 2, text: 'Xin chào!', sender: 'user' },
        { id: 3, text: 'Tôi có thể giúp gì cho bạn?', sender: 'bot' },
    ]);

    const handleSend = () => {
        if (input.trim() !== '') {
            setMessages([...messages, { id: messages.length + 1, text: input.trim(), sender: 'user' }]);
            setInput('');

            setTimeout(() => {
                let response = {
                    text: 'ok',
                    refs: ['Chủ đề 2', 'Chủ đề 6 đề mục 4'],
                };
                setMessages([
                    ...messages,
                    { id: messages.length + 1, text: input.trim(), sender: 'user' },
                    { id: messages.length + 1, sender: 'bot', ...response },
                ]);
            }, 100);
        }
    };

    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'grey.200',
            }}
        >
            <MessageView messages={messages} />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    mb: 2,
                    mr: 2,
                    gap: 2,
                }}
            >
                {['chào', 'hello'].map((q, index) => (
                    <Button
                        key={index}
                        size="small"
                        variant="outlined"
                        onClick={() => {
                            setMessages([
                                ...messages,
                                { id: messages.length + 1, text: q, sender: 'user' },
                                { id: messages.length + 2, text: 'Ok', sender: 'bot' },
                            ]);
                        }}
                    >
                        {q}
                    </Button>
                ))}
            </Box>
            <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Grid container spacing={2}>
                    <Grid item xs={10}>
                        <TextField
                            size="small"
                            fullWidth
                            placeholder="Type a message"
                            variant="outlined"
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            fullWidth
                            color="primary"
                            variant="contained"
                            endIcon={<SendIcon />}
                            onClick={handleSend}
                        >
                            Send
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

const MessageView = ({ messages }) => {
    useEffect(() => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const messagesEndRef = useRef(null);

    return (
        <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
            {messages.map((message) => (
                <Message key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
        </Box>
    );
};

const Message = ({ message }) => {
    const isBot = message.sender === 'bot';

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: isBot ? 'flex-start' : 'flex-end',
                mb: 2,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: isBot ? 'row' : 'row-reverse',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ bgcolor: isBot ? 'primary.main' : 'secondary.main' }}>{isBot ? 'B' : 'U'}</Avatar>
                <Paper
                    variant="outlined"
                    sx={{
                        p: 2,
                        ml: isBot ? 1 : 0,
                        mr: isBot ? 0 : 1,
                        backgroundColor: isBot ? 'white' : 'primary.light',
                        borderRadius: isBot ? '20px 20px 20px 5px' : '20px 20px 5px 20px',
                    }}
                >
                    <Typography variant="body1">{message.text}</Typography>
                    {isBot && message.refs && (
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2,
                                borderTop: '1px solid',
                                mt: 2,
                                pt: 1,
                            }}
                        >
                            {message.refs.map((r, i) => (
                                <Typography key={i}>{r}</Typography>
                            ))}
                        </Box>
                    )}
                </Paper>
            </Box>
        </Box>
    );
};

export default Chat;
