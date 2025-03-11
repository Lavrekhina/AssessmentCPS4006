import { Link } from "react-router";
export function NotFound() {
  return (
    <div>
      Not found
      <br />
      <Link to="/">Return to Home Page</Link>
    </div>
  );
}
