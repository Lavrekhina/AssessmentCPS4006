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
z-index: 100;
`;

export const HeaderWrap = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
height: ${HEADER_HEIGHT}px;
box-sizing: border-box;
padding: 10px 15px;
position: relative;
`;

export const HeaderLogo = styled.img`
border-radius: 50%;
width: 30px;
height: 30px;
`;

export const HeaderLinks = styled.div`
display: block;
position: relative;
z-index: 3;
flex: 1;
margin: 0 20px;
@media (max-width: ${MOBILE_BREAKPOINT}px) {
    display: none;
  }`;

export const HeaderBurger = styled.div`
display: none;
position: relative;
z-index: 3;
margin-left: auto;
@media (max-width: ${MOBILE_BREAKPOINT}px) {
  display: block;
  }`;

export const UserName = styled.div`
  margin-left: 15px;
  font-size: 14px;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
  z-index: 2;
`;

export const ProfilePicture = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  margin-left: 15px;
  position: relative;
  z-index: 2;
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  position: relative;
  z-index: 2;
`;

export const Content = styled.main`
margin-top: ${HEADER_HEIGHT}px;
padding-top: 20px;
`;


