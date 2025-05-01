import styled from "styled-components";

export const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
min-height: 500px;
`

export const Wrap = styled.div`
max-width: 500px;
`

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  > span {
    font-size: 14px;
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const ErrorBanner = styled.p`
    background: rgba(255, 0, 0, 0.1);
    border-radius: 10px;
    border: 1px solid red;
    color: red;
    padding-left: 15px;
    padding-top: 15px;
    padding-bottom: 15px;
`