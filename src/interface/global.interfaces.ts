import { Dispatch, SetStateAction } from "react";

export interface ArticlesData{
    source:{
        id: string;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content?: string;
}

export interface TopHeadlinesDataInterface{
    status: string;
    totalResults :number;
    articles: ArticlesData[]; 
}

export interface NewsFeedCardProps{
    NewsFeedCardData: ArticlesData
}

export interface NewsFeedCardModalProps{
    NewsFeedCardModalData: ArticlesData;
    setShowMore: Dispatch<SetStateAction<boolean>>
}