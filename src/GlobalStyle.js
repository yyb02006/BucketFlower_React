import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

@font-face {
  font-family: 'S-CoreDream';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-2ExtraLight.woff') format('woff');
  font-weight: 200;
}
@font-face {
  font-family: 'S-CoreDream';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff') format('woff');
  font-weight: 300;
}
@font-face {
  font-family: 'S-CoreDream';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-4Regular.woff') format('woff');
  font-weight: 400;
}
@font-face {
  font-family: 'S-CoreDream';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-5Medium.woff') format('woff');
  font-weight: 500;
}
@font-face {
  font-family: 'S-CoreDream';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-6Bold.woff') format('woff');
  font-weight: 600;
}
@font-face {
  font-family: 'S-CoreDream';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-7ExtraBold.woff') format('woff');
  font-weight: 700;
}
@font-face {
  font-family: 'S-CoreDream';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-8Heavy.woff') format('woff');
  font-weight: 800;
}
@font-face {
  font-family: 'BMJUA';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMJUA.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

body{
  font-family: 'S-CoreDream';
  font-weight: 700;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0 auto;
  padding: 0;
  overflow-x: hidden;
  color: #404040;
}

li{
  list-style: none;
}

a{
  text-decoration: none;
  color: #404040;
}

a:visited, a:link {color: #404040}

button{
  cursor: pointer;
  color: #404040;
}

label{
  cursor: pointer;
}

input{
  font-family: 'S-CoreDream';
  font-weight: 500;
  color: #404040;
}

input::placeholder{
  font-family: 'S-CoreDream';
  font-weight: 500;
  color: #a0a0a0;
}

input[type='password'] {
  font: small-caption;
  font-size: 1rem;
  color: #32C7B2;
}

input:focus{
  outline: 2px solid #32C7B2;
}

`;

export default GlobalStyle;
