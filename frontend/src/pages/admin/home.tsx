import FlexBox from "../../components/flex_box";
import { AuthProvider } from '../../hooks/authentication';
const HomePage: React.FC = () => {



    return (
        <AuthProvider>
            <FlexBox className="d-flex justify-content-center align-items-center" style={{ backgroundSize: 'cover' }}>
                <h1>Home</h1>

            </FlexBox>
        </AuthProvider>
    );
};

export default HomePage;