import { Link } from "react-router";
import { Container, Title } from "./styles";

export const NotFound = () => {
  return (
    <Container>
      <Title>Not found</Title>
      <br />
      <Link to="/">Return to Home Page</Link>
    </Container>
  );
};
