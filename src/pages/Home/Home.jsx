import ChatIcon from '@mui/icons-material/Chat';
import Button from '@mui/material/Button';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GavelIcon from '@mui/icons-material/Gavel';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from 'react-router-dom';
import banner from '../../assets/banner.png';
import logo from '../../assets/logo.png';
import styles from './Home.module.scss';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
const Home = () => {
    return (
        <>
            <img src={`${banner}`} alt="" style={{ width: '100%' }} />
            <div
                style={{
                    display: 'flex',
                    gap: 50,
                    justifyContent: 'center',
                    width: '100%',
                    height: '47%',
                    marginTop: '50px',
                }}
            >
                <div className="wrapper_icon" style={{ display: 'flex', justifyContent: 'space-around', width: '80%' }}>
                    <Link
                        to="/chat"
                        style={{ width: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    >
                        <Button
                            variant="outlined"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: '50%',
                                padding: '30px',
                                color: '#797979',
                                border: '1px solid #797979',
                            }}
                        >
                            <ChatIcon sx={{ fontSize: 50 }} />
                        </Button>
                        <div
                            className="des_wrapper"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                marginTop: '40px',
                            }}
                        >
                            <span className="text-lg" style={{ color: '#56AED4', fontSize: '22px', fontWeight: '510' }}>
                                Hệ thống hỏi đáp
                            </span>

                            <h1
                                style={{
                                    fontSize: '16px',
                                    wordWrap: 'break-word',
                                    textAlign: 'center',
                                    marginTop: '25px',
                                }}
                            >
                                Hệ thống hỏi đáp tự động, giúp bạn hỏi những kiến thức về pháp luật nhanh chóng
                            </h1>
                        </div>
                    </Link>
                    <Link
                        to="/phapdien"
                        style={{ width: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    >
                        <Button
                            variant="outlined"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: '50%',
                                padding: '30px',
                                color: '#797979',
                                border: '1px solid #797979',
                            }}
                        >
                            <MenuBookIcon sx={{ fontSize: 50 }} />
                        </Button>
                        <div
                            className="des_wrapper"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                marginTop: '40px',
                            }}
                        >
                            <span style={{ color: '#56AED4', fontSize: '22px', fontWeight: '510' }}>Pháp điển</span>
                            <h1
                                style={{
                                    fontSize: '16px',
                                    wordWrap: 'break-word',
                                    textAlign: 'center',
                                    marginTop: '25px',
                                }}
                            >
                                Hệ thống hỏi đáp tự động, giúp bạn hỏi những kiến thức về pháp luật nhanh chóng
                            </h1>
                        </div>
                    </Link>
                    <Link
                        to="/timkiemthuatngu"
                        style={{ width: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    >
                        <Button
                            variant="outlined"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: '50%',
                                padding: '30px',
                                color: '#797979',
                                border: '1px solid #797979',
                            }}
                        >
                            <GavelIcon sx={{ fontSize: 50 }} />
                        </Button>
                        <div
                            className="des_wrapper"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                marginTop: '40px',
                            }}
                        >
                            <span style={{ color: '#56AED4', fontSize: '22px', fontWeight: '510' }}>Lọc Thuật Ngữ</span>
                            <h1
                                style={{
                                    fontSize: '16px',
                                    wordWrap: 'break-word',
                                    textAlign: 'center',
                                    marginTop: '25px',
                                }}
                            >
                                Hệ thống hỏi đáp tự động, giúp bạn lọc những thuật ngữ trong quy phạm pháp luật
                            </h1>
                        </div>
                    </Link>
                    <Link
                        to="/thuatngu"
                        style={{ width: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    >
                        <Button
                            variant="outlined"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: '50%',
                                padding: '30px',
                                color: '#797979',
                                border: '1px solid #797979',
                            }}
                        >
                            <AssignmentIcon sx={{ fontSize: 50 }} />
                        </Button>
                        <div
                            className="des_wrapper"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                marginTop: '40px',
                            }}
                        >
                            <span style={{ color: '#56AED4', fontSize: '22px', fontWeight: '510' }}>
                                Thuật ngữ pháp luật
                            </span>
                            <h1
                                style={{
                                    fontSize: '16px',
                                    wordWrap: 'break-word',
                                    textAlign: 'center',
                                    marginTop: '25px',
                                }}
                            >
                                Hệ thống hỏi đáp tự động, giúp bạn hỏi những kiến thức về pháp luật nhanh chóng
                            </h1>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="footer" style={{ width: '100%' }}>
                <MDBFooter bgColor="light" className="text-center text-lg-start text-muted w-100">
                    <section
                        className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"
                        style={{ marginTop: '30px' }}
                    >
                        <div>
                            <a href="" className="me-4 text-reset">
                                <MDBIcon fab icon="facebook-f" />
                            </a>
                            <a href="" className="me-4 text-reset">
                                <MDBIcon fab icon="twitter" />
                            </a>
                            <a href="" className="me-4 text-reset">
                                <MDBIcon fab icon="google" />
                            </a>
                            <a href="" className="me-4 text-reset">
                                <MDBIcon fab icon="instagram" />
                            </a>
                            <a href="" className="me-4 text-reset">
                                <MDBIcon fab icon="linkedin" />
                            </a>
                            <a href="" className="me-4 text-reset">
                                <MDBIcon fab icon="github" />
                            </a>
                        </div>
                    </section>

                    <section
                        className=""
                        style={{ backgroundColor: '#232832', color: '#FFFFFF', padding: '20px', width: '100%' }}
                    >
                        <MDBContainer className="text-center text-md-start mt-5">
                            <MDBRow className="mt-3">
                                <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                                    <h6 className="text-uppercase fw-bold mb-4">
                                        <MDBIcon icon="gem" className="me-3" />
                                        Hệ thống pháp luật
                                    </h6>
                                    <p>
                                        Hệ thống tra cứu CodeHeroes là hệ thống pháp luật hàng đầu Việt Nam, với kinh
                                        nghiệm gần 20 năm trong lĩnh vực nghiên cứu tổng hợp pháp luật nhằm mang lại
                                        nguồn tri thức tốt nhất.
                                    </p>
                                </MDBCol>

                                <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                                    <h6 className="text-uppercase fw-bold mb-4">Sản phẩm</h6>
                                    <p>
                                        <a href="#!" className="text-reset">
                                            Pháp điển
                                        </a>
                                    </p>
                                    <p>
                                        <a href="#!" className="text-reset">
                                            Quy phạm pháp luật
                                        </a>
                                    </p>
                                    <p>
                                        <a href="#!" className="text-reset">
                                            Thuật ngữ
                                        </a>
                                    </p>
                                    <p>
                                        <a href="#!" className="text-reset">
                                            Hỏi đáp
                                        </a>
                                    </p>
                                </MDBCol>

                                <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
                                    <h6 className="text-uppercase fw-bold mb-4">Lĩnh vực</h6>
                                    <p>
                                        <a href="#!" className="text-reset">
                                            Pháp luật
                                        </a>
                                    </p>
                                    <p>
                                        <a href="#!" className="text-reset">
                                            Thuật Ngữ
                                        </a>
                                    </p>
                                    <p>
                                        <a href="#!" className="text-reset">
                                            Tư vấn
                                        </a>
                                    </p>
                                    <p>
                                        <a href="#!" className="text-reset">
                                            Tra cứu
                                        </a>
                                    </p>
                                </MDBCol>

                                <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                                    <h6 className="text-uppercase fw-bold mb-4">Liên lạc</h6>
                                    <p>
                                        <MDBIcon icon="home" className="me-2" />
                                        168 NVC, Gò Vấp, HCM
                                    </p>
                                    <p>
                                        <MDBIcon icon="envelope" className="me-3" />
                                        codeheroes@gmail.com
                                    </p>
                                    <p>
                                        <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
                                    </p>
                                    <p>
                                        <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
                                    </p>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </section>

                    <div className="text-center p-4" style={{ backgroundColor: '#1B1F25', color: '#FFF' }}>
                        ©2021 Hệ thống tra cứu pháp luật :
                        <a
                            className="text-reset fw-bold"
                            href="https://mdbootstrap.com/"
                            style={{ marginLeft: '10px' }}
                        >
                            CodeHeroes
                        </a>
                    </div>
                </MDBFooter>
            </div>
        </>
    );
};

export default Home;
