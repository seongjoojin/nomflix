import { createGlobalStyle, GlobalStyleComponent, DefaultTheme } from 'styled-components';
import reset from 'styled-reset';

const globalStyles: GlobalStyleComponent<{}, DefaultTheme> = createGlobalStyle`
    ${reset};
    a {
        text-decoration:none;
        color: inherit;
    }
    * {
        box-sizing: border-box;
    }
    html {
        font-size: 10px;
    }
    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 1.2rem;
        background-color: rgba(20, 20, 20, 1);
        color: white;
        padding-top: 5rem;
    }
`;

export default globalStyles;