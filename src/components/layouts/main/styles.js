import styled from "styled-components";

export const MOBILE_BREAKPOINT = 768;

export const HEADER_HEIGHT = 60;

export const Container = styled.div``;

export const Wrap = styled.div`
max-width: 1000px;
margin: 0 auto;
padding: 0 20px;
`;

export const Header = styled.header`
-webkit-backdrop-filter: blur(8px);
backdrop-filter: blur(8px);
border-bottom-width: 1px;
border-bottom-style: solid;
border-bottom-color: rgb(232, 234, 238);
background-color: rgba(255, 255, 255, 0.6);
position: fixed;
left: 0;
top: 0;
width: 100%;
`;

export const HeaderWrap = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
height: ${HEADER_HEIGHT}px;
box-sizing: border-box;
padding: 10px 15px;
`;

export const HeaderLogo = styled.img`
border-radius: 50%;
width: 30px;
height: 30px;
`;

export const HeaderLinks = styled.div`
display: block;
@media (max-width: ${MOBILE_BREAKPOINT}px) {
    display: none;
  }`;

export const HeaderBurger = styled.div`
display: none;
@media (max-width: ${MOBILE_BREAKPOINT}px) {
  display: block;
  }`;

export const Content = styled.main`
margin-top: ${HEADER_HEIGHT}px;
padding-top: 20px;

`;

