import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const SignUp = () => {
    return (
        <div className="flex-center">
            <div className=" border-t-8 rounded-sm border-indigo-600 bg-white p-12 shadow-2xl w-96">
                <h1 className="font-bold text-center block text-2xl">Đăng ký</h1>
                <form className="d-flex flex-column g-5" method="POST">
                    <TextField
                        type="email"
                        id="email"
                        name="email"
                        label="Email Address"
                        placeholder="me@example.com"
                        variant="outlined"
                    />
                    <TextField
                        type="text"
                        id="username"
                        name="username"
                        label="Username"
                        placeholder="User name..."
                        variant="outlined"
                    />
                    <TextField
                        type="password"
                        id="password"
                        name="password"
                        label="Mật khẩu"
                        placeholder="••••••••••"
                    />
                    <TextField
                        type="password"
                        id="password2"
                        name="password2"
                        label="Nhập lại mật khẩu"
                        placeholder="••••••••••"
                    />
                    <Button type="submit" variant="contained">
                        Đăng ký
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
