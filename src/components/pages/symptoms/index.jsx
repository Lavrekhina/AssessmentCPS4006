import Typography from "@mui/joy/Typography";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Option from "@mui/joy/Option";
import * as style from "./styles";
import Select from "@mui/joy/Select";
import Card from "@mui/joy/Card";
import { Link as RouterLink } from "react-router";
import Link from "@mui/joy/Link";

const fakeNews = [
  {
    title: "Pice of news",
    date: Date.now(),
    description: "description longer than bla bla bla ",
  },
  {
    title: "Pice of news",
    date: Date.now(),
    description: "description longer than bla bla bla ",
  },
  {
    title: "Pice of news",
    date: Date.now(),
    description: "description longer than bla bla bla ",
  },
];

export const Symptoms = () => {
  return (
    <div>
      <Typography level="h1">Symptoms Checker</Typography>
      <style.Form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <Input placeholder="Search by symptom" required />
      </style.Form>
      <style.Content>
        {fakeNews.map((news) => {
          return (
            <style.Item>
              <Card>
                <Link component={RouterLink} to={"/"}>
                  <Typography level="h2">{news.title}</Typography>
                </Link>
                <Typography level="body-sm">
                  {new Date(news.date).toLocaleDateString()}
                </Typography>
                <Typography>{news.description}</Typography>
              </Card>
            </style.Item>
          );
        })}
      </style.Content>
    </div>
  );
};
