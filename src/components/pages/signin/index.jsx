import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import * as styles from "./styles";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import { UserContext } from "../../../contexts/user";
import { useNavigate } from "react-router-dom";

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
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setUserData({
      fullName: data.fullName,
      email: data.email,
      age: data.age,
    });
    navigate("/profile");
  };

  return (
    <styles.Container>
      <styles.Wrap>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <FormControl error={!!errors.fullName}>
              <FormLabel>Full Name</FormLabel>
              <Input
                placeholder="Enter your full name"
                {...register("fullName")}
              />
              {errors.fullName && (
                <FormHelperText>{errors.fullName.message}</FormHelperText>
              )}
            </FormControl>

            <FormControl error={!!errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                {...register("email")}
              />
              {errors.email && (
                <FormHelperText>{errors.email.message}</FormHelperText>
              )}
            </FormControl>

            <FormControl error={!!errors.age}>
              <FormLabel>Age</FormLabel>
              <Input
                type="number"
                placeholder="Enter your age"
                {...register("age")}
              />
              {errors.age && (
                <FormHelperText>{errors.age.message}</FormHelperText>
              )}
            </FormControl>
            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      </styles.Wrap>
    </styles.Container>
  );
};
