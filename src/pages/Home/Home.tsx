import Header from '@c/Header';
import { Props } from '~/interfaces';

const Home: React.FC<Props> = ({ children }) => {
    return (
        <>
            <Header />
            <div>{children}</div>
        </>
    );
};

export default Home;
