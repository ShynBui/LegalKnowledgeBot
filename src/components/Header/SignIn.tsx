import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const SignIn = () => {
    return (
        <div className="flex-center">
            <div className=" border-t-8 rounded-sm border-indigo-600 bg-white p-12 shadow-2xl w-96">
                <h1 className="font-bold text-center block text-2xl">Đăng nhập</h1>
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
                        type="password"
                        id="password"
                        name="password"
                        label="Mật khẩu"
                        placeholder="••••••••••"
                    />
                    <Button type="submit" variant="contained">
                        Đăng nhập
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
