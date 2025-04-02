import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import * as styles from "./styles";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import { UserContext } from "../../../contexts/user";

// Error message component
export const ErrorMessage = ({ error }) => {
  return error ? <p className="text-red-500 text-sm">{error.message}</p> : null;
};

// Yup validation schema
const schema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, "Full Name must be at least 3 characters long")
    .required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  age: Yup.number()
    .min(18, "Age must be between 18 and 100")
    .max(100, "Age must be between 18 and 100")
    .required("Age is required"),
});

export const SignIn = () => {
  const { setUserName } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema), // Integrating Yup validation schema
  });

  const onSubmit = (data) => {
    console.log("Form Submitted", data);
  };

  return (
    <styles.Container>
      <styles.Wrap>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            setUserName(formJson.fullName);
            // alert(JSON.stringify(formJson));
          }}
        >
          <Stack spacing={2}>
            <FormControl error={!!errors.fullName}>
              <FormLabel>Full Name</FormLabel>
              <Input
                placeholder="Enter your full name"
                {...register("fullName")}
              />
              {errors.fullName && (
                <FormHelperText>{errors.fullName}</FormHelperText>
              )}
            </FormControl>

            <FormControl error={!!errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                {...register("email")}
              />
              {errors.email && <FormHelperText>{errors.email}</FormHelperText>}
            </FormControl>

            <FormControl error={!!errors.age}>
              <FormLabel>Age</FormLabel>
              <Input
                type="number"
                placeholder="Enter your age"
                {...register("age")}
              />
              {errors.age && <FormHelperText>{errors.age}</FormHelperText>}
            </FormControl>
            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      </styles.Wrap>
    </styles.Container>
  );

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name Field */}
        <div>
          <label className="block font-medium">Full Name</label>
          <input
            {...register("fullName")}
            className="w-full p-2 border rounded"
            placeholder="Enter your full name"
          />
          <ErrorMessage error={errors.fullName} />
        </div>

        {/* Email Field */}
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full p-2 border rounded"
            placeholder="Enter your email"
          />
          <ErrorMessage error={errors.email} />
        </div>

        {/* Age Field */}
        <div>
          <label className="block font-medium">Age</label>
          <input
            type="number"
            {...register("age")}
            className="w-full p-2 border rounded"
            placeholder="Enter your age"
          />
          <ErrorMessage error={errors.age} />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
