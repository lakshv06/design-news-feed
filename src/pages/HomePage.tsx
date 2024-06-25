import React, { useEffect, useState, useRef } from "react";
import {
  TopHeadlinesDataInterface,
  ArticlesData,
} from "../interface/global.interfaces";
import apiService from "../api-services/ApiService";
import { toast } from "react-toastify";
import NewsFeedCard from "./NewsFeedCard";
import LoadingIndicator from "./LoadingIndicator";
import InfiniteScroll from "react-infinite-scroll-component";
import "../homepage.css"; // Ensure the CSS file path is correct
import MessagingChatBox from "./MessaginChatBox";

function HomePage(): React.ReactElement {
  const [topHeadlinesData, setTopHeadlinesData] =
    useState<TopHeadlinesDataInterface>();
  const [articles, setArticles] = useState<ArticlesData[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<ArticlesData[]>([]); // State for filtered articles
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [chatLoadingState, setChatLoadingState] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>(""); // State for search term
  const [focusedChat, setFocusedChat] = useState<number | null>(null); // State for focused chatbox

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const fetchTopHeadlinesData = async (page: number): Promise<void> => {
    try {
      setLoadingState(true);
      setChatLoadingState(true); // temp here because not having any messaging api to call
      const getTopHeadlines = await apiService.getTopHeadlinesData(page);
      if (getTopHeadlines.data.status === "ok") {
        setTopHeadlinesData(getTopHeadlines.data);
        setArticles((prevArticles) => [
          ...prevArticles,
          ...getTopHeadlines.data.articles,
        ]);
      }
    } catch (e) {
      toast.error(`Error while getting top headlines: ${e}`);
    } finally {
      setLoadingState(false);
      setChatLoadingState(false); // temp here because not having any messaging api to call
    }
  };

  useEffect(() => {
    fetchTopHeadlinesData(page);
  }, [page]);

  // Update filtered articles whenever articles or searchTerm changes
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredArticles(articles); // Show all articles if search term is empty
    } else {
      const filtered = articles.filter((article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredArticles(filtered);
    }
  }, [articles, searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        chatContainerRef.current &&
        !chatContainerRef.current.contains(event.target as Node)
      ) {
        setFocusedChat(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleGoClick = () => {
    // Fetch data or filter articles based on the search term
    if (searchTerm.trim() !== "") {
      const filtered = articles.filter((article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredArticles(filtered);
    } else {
      setFilteredArticles(articles);
    }
  };

  return (
    <div className="d-flex flex-row">
      <div className="m-3 w-75">
        <div className="d-flex align-items-center p-3">
          <input
            type="text"
            className="form-control m-2"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="btn btn-outline-primary" onClick={handleGoClick}>
            Go
          </button>
        </div>
        <div className="d-flex p-3">
          {loadingState && <LoadingIndicator />}
          <InfiniteScroll
            dataLength={filteredArticles.length}
            next={fetchMoreData}
            hasMore={!!topHeadlinesData?.articles.length}
            loader={<LoadingIndicator />}
            endMessage={<p style={{ textAlign: "center" }}>No more articles</p>}
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
      <div className="m-3 w-25">
        <div className="d-flex flex-column p-3" ref={chatContainerRef}>
          <div className="h-25">
            <p>Something to be kept here</p>
          </div>
          {chatLoadingState && <LoadingIndicator />}
          <InfiniteScroll
            dataLength={filteredArticles.length}
            next={fetchMoreData}
            hasMore={!!topHeadlinesData?.articles.length}
            loader={<LoadingIndicator />}
            endMessage={
              <p className="d-flex justify-content-center">
                Reached end of messaging history
              </p>
            }
          >
            <div>
              {filteredArticles.map((item, index) => (
                <div key={index}>
                  <MessagingChatBox
                    MessagingChatBoxData={item}
                    isFocused={focusedChat === index}
                    onClick={() => setFocusedChat(index)}
                  />
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
