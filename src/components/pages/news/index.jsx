import {useEffect, useState} from "react";
import Typography from "@mui/joy/Typography";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Option from "@mui/joy/Option";
import * as style from "./styles";
import Select from "@mui/joy/Select";
import Card from "@mui/joy/Card";
import {Link as RouterLink} from "react-router";
import Link from "@mui/joy/Link";
import newsService from "../../../utils/services/newsService";
import {NEWS_CATEGORIES, SUPPORTED_LANGUAGES} from "../../../utils/constants/apiConstants";
import {Image} from "@mui/icons-material";

export const News = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(NEWS_CATEGORIES.Wellness);
    const fetchNews = async () => {
        try {
            setLoading(true);
            const response = await newsService.getLatestNews(
                searchQuery,
                selectedCategory
            );
            setNews(response.results);
            setError(null);
        } catch (err) {
            setError('Error at news fetching');
            console.error('Error at news fetching:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews()
    }, [selectedCategory]);


    if (loading) {
        return <Typography>News fetching...</Typography>;
    }

    if (error) {
        return <Typography color="danger">Error: {error}</Typography>;
    }

    return (
        <div>
            <Typography level="h1">News</Typography>
            <style.Form onSubmit={fetchNews}>
                <Input
                    placeholder="Search by keyword"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Select
                    placeholder="Category"
                    value={selectedCategory}
                    onChange={(_, value) => setSelectedCategory(value)}
                >
                    <Option value={NEWS_CATEGORIES.Nutritions}>Nutritions</Option>
                    <Option value={NEWS_CATEGORIES.Fitness}>Fitness</Option>
                    <Option value={NEWS_CATEGORIES.Wellness}>Welness</Option>
                    <Option value={NEWS_CATEGORIES.MentalHealth}>Mental health</Option>
                    <Option value={NEWS_CATEGORIES.Science}>Medical science</Option>
                </Select>
                <Button type="submit">Search</Button>
            </style.Form>
            <style.Content>
                {news.map((article, index) => (
                    <style.Item key={index}>
                        <Card>
                            <style.Cover src={article.image_url}></style.Cover>
                            <Link component={RouterLink} to={article.link} target="_blank">
                                <Typography level="h2">{article.title}</Typography>
                            </Link>
                            <Typography level="body-sm">
                                {article.pubDate}
                            </Typography>
                            <Typography>{article.description}</Typography>
                            {article.urlToImage && (
                                <img
                                    src={article.urlToImage}
                                    alt={article.title}
                                    style={{maxWidth: '100%', height: 'auto', marginTop: '1rem'}}
                                />
                            )}
                        </Card>
                    </style.Item>
                ))}
            </style.Content>
        </div>
    );
};
