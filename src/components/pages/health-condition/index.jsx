import { useParams } from "react-router";
export const HealthCondition = () => {
  const params = useParams();
  return (
    <div>
      HealthCondition
      <pre>{JSON.stringify(params, null, 2)}</pre>
    </div>
  );
};
