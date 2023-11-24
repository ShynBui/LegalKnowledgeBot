import { Props } from '~/interfaces';

const Home: React.FC<Props> = ({ children }) => {
    return <div style={{ paddingTop: 'var(--header-height)' }}>{children}</div>;
};

export default Home;
