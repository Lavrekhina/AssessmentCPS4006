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

export const News = () => {
  return (
    <div>
      <Typography level="h1">News</Typography>
      <style.Form
        onSubmit={(event) => {
          // event.preventDefault();
          // const formData = new FormData(event.currentTarget);
          // const formJson = Object.fromEntries(formData.entries());
          // alert(JSON.stringify(formJson));
        }}
      >
        <Input placeholder="Search by key word" required />
        <Select placeholder="Choose one…">
          <Option value="nutrition">Nutrition</Option>
          <Option value="fitness">Fitness</Option>
          <Option value="mental_health">Mental Health</Option>
        </Select>
        <Button type="submit">Submit</Button>
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
