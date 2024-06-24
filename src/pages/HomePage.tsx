import React, { useEffect, useState } from "react";
import { TopHeadlinesDataInterface, ArticlesData } from "../interface/global.interfaces";
import apiService from "../api-services/ApiService";
import { toast } from "react-toastify";
import NewsFeedCard from './NewsFeedCard';
import LoadingIndicator from "./LoadingIndicator";
import InfiniteScroll from 'react-infinite-scroll-component';
import '../homepage.css'; // Ensure the CSS file path is correct

function HomePage(): React.ReactElement {
    const [topHeadlinesData, setTopHeadlinesData] = useState<TopHeadlinesDataInterface>();
    const [articles, setArticles] = useState<ArticlesData[]>([]);
    const [filteredArticles, setFilteredArticles] = useState<ArticlesData[]>([]); // State for filtered articles
    const [loadingState, setLoadingState] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>(''); // State for search term

    const fetchTopHeadlinesData = async (page: number): Promise<void> => {
        try {
            setLoadingState(true);
            const getTopHeadlines = await apiService.getTopHeadlinesData(page);
            if (getTopHeadlines.data.status === "ok") {
                setTopHeadlinesData(getTopHeadlines.data);
                setArticles(prevArticles => [...prevArticles, ...getTopHeadlines.data.articles]);
            }
        } catch (e) {
            toast.error(`Error while getting top headlines: ${e}`);
        } finally {
            setLoadingState(false);
        }
    };

    useEffect(() => {
        fetchTopHeadlinesData(page);
    }, [page]);

    // Update filtered articles whenever articles or searchTerm changes
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredArticles(articles); // Show all articles if search term is empty
        } else {
            const filtered = articles.filter(article =>
                article.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredArticles(filtered);
        }
    }, [articles, searchTerm]);

    const fetchMoreData = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleGoClick = () => {
        // Fetch data or filter articles based on the search term
        if (searchTerm.trim() !== '') {
            const filtered = articles.filter(article =>
                article.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredArticles(filtered);
        } else {
            setFilteredArticles(articles);
        }
    };

    return (
        <div className="m-3">
            <div className="d-flex align-items-center p-3 w-50">
                <input
                    type="text"
                    className="form-control m-2"
                    placeholder="Search by title..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button className="btn btn-outline-primary" onClick={handleGoClick}>Go</button>
            </div>
            <div className="d-flex w-50 p-3">
                {loadingState && <LoadingIndicator />}
                <InfiniteScroll
                    dataLength={filteredArticles.length}
                    next={fetchMoreData}
                    hasMore={!!topHeadlinesData?.articles.length}
                    loader={<LoadingIndicator />}
                    endMessage={<p style={{ textAlign: 'center' }}>No more articles</p>}
                >
                    <div className="grid">
                        {filteredArticles.map((item, index) => (
                            <div key={index}>
                                <NewsFeedCard NewsFeedCardData={item} />
                            </div>
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    );
}

export default HomePage;
