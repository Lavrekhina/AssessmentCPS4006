import styled from "styled-components";

export const Form = styled.form`
display: flex;
flex-direction: row; 
justify-content: center;
margin: 10px 0;
padding: 10px;
gap: 10px;
`

export const Content = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
column-gap: 20px;
row-gap: 60px;
padding: 16px 0;

@media (max-width: 1200px) {
  grid-template-columns: repeat(2, 1fr);
}

@media (max-width: 768px) {
  grid-template-columns: 1fr;
}
`

export const Item = styled.div`
height: 100%;
`

export const Cover = styled.img`
width: 100%;
height: 140px;
object-fit: cover;
border-radius: 8px 8px 0 0;
`