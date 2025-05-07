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
import {NEWS_CATEGORIES} from "../../../utils/constants/apiConstants";
import { Container } from '../../ui/container';

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
        <Container>
            <Typography level="h1" sx={{ mb: 3 }}>News</Typography>
            <style.Form onSubmit={fetchNews}>
                <Input
                    placeholder="Search by keyword"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ flex: 1 }}
                />
                <Select
                    placeholder="Category"
                    value={selectedCategory}
                    onChange={(_, value) => setSelectedCategory(value)}
                    sx={{ minWidth: 150 }}
                >
                    <Option value={NEWS_CATEGORIES.Nutritions}>Nutritions</Option>
                    <Option value={NEWS_CATEGORIES.Fitness}>Fitness</Option>
                    <Option value={NEWS_CATEGORIES.Wellness}>Wellness</Option>
                    <Option value={NEWS_CATEGORIES.MentalHealth}>Mental health</Option>
                    <Option value={NEWS_CATEGORIES.Science}>Medical science</Option>
                </Select>
                <Button type="submit">Search</Button>
            </style.Form>
            <style.Content>
                {news.map((article, index) => (
                    <style.Item key={index}>
                        <Card 
                            variant="outlined"
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                '&:hover': {
                                    boxShadow: 'md',
                                    transform: 'translateY(-2px)',
                                    transition: 'all 0.2s ease-in-out'
                                }
                            }}
                        >
                            <style.Cover src={article.image_url} alt={article.title} />
                            <Card sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 1.5 }}>
                                <Link 
                                    component={RouterLink} 
                                    to={article.link} 
                                    target="_blank"
                                    sx={{ 
                                        textDecoration: 'none',
                                        '&:hover': { textDecoration: 'none' }
                                    }}
                                >
                                    <Typography level="h3" sx={{ mb: 0.5, fontSize: '1.1rem' }}>
                                        {article.title}
                                    </Typography>
                                </Link>
                                <Typography level="body-sm" sx={{ mb: 0.5, color: 'neutral.500' }}>
                                    {article.pubDate}
                                </Typography>
                                <Typography level="body-md" sx={{ 
                                    flex: 1,
                                    fontSize: '0.9rem',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}>
                                    {article.description}
                                </Typography>
                            </Card>
                        </Card>
                    </style.Item>
                ))}
            </style.Content>
        </Container>
    );
};
