
import styled from '@emotion/styled';
// import { color } from 'styles/color';
// import wave from '../../../public/wave/app';

const LoginTemplate = styled.div`
    label: login_template;
    width: 100%;
    height: 100vh;

    border: 1px solid black;

    background-color: ${props => props.theme.colors.gary_0};
`;

// const 



function LoginLayout() {
    return (
        <LoginTemplate>
            {/* <script src={'/wave/app.js'}></script> */}
        </LoginTemplate>
    )
}

export default LoginLayout;