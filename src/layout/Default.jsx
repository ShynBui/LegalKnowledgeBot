import Header from './Header';

const Default = ({ children }) => {
    return (
        <>
            <Header />
            <div style={{ borderTop: '1px solid', height: 'calc(100vh - 60px)', width: '100%', overflow: 'scroll' }}>
                {children}
            </div>
        </>
    );
};

export default Default;
