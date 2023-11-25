import Header from '@c/Header';

const Home = ({ children }) => {
    return (
        <>
            <Header />
            <div>{children}</div>
        </>
    );
};

export default Home;
