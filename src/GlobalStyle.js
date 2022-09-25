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
  font-weight: 600;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0 auto;
  padding: 0;
  overflow-x: hidden;
  color: #404040;
}

div{
  -ms-user-select: none; 
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
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
  font-family: 'S-CoreDream';
  font-weight: 500;
	font-size: 1.5rem;
	padding: 16px 0;
	border: none;
	background-color: #32c7b2;
	border-radius: 20px;
	color: #fafafa;
  cursor: pointer;
}

label{
  cursor: pointer;
}

input{
  font-family: 'S-CoreDream';
  font-weight: 500;
  font-size: 0.875rem;
	width: 100%;
	border: none;
	border-radius: 16px;
  color: #404040;
	background-color: #e9e9e9;
}

input::placeholder, textarea::placeholder{
  font-family: 'S-CoreDream';
  font-size: 0.825rem;
	font-weight: 500;
  color: #a0a0a0;
}

input[type='password'] {
  font: small-caption;
  font-size: 1rem;
  color: #32C7B2;
}

input:focus, textarea:focus{
  outline: 2px solid #32C7B2;
}

form{
  padding: 32px 36px 28px 36px;
}

`;

export default GlobalStyle;
