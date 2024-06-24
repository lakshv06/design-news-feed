import { ReactElement, useEffect } from "react";
import { useState } from "react";
import { TopHeadlinesDataInterface } from "../interface/global.interfaces";
import apiService from "../api-services/ApiService";
import { toast } from "react-toastify";
import NewsFeedCard from './NewsFeedCard';
import LoadingIndicator from "./LoadingIndicator";

function HomePage():ReactElement{
    const [topHeadlinesData, setTopHeadlinesData] = useState<TopHeadlinesDataInterface>();
    const [loadingState, setLoadingState] = useState<boolean>(false);

    const fetchTopHeadlinesData = async(): Promise<void>=>{
        try{
            setLoadingState(true);
            const getTopHeadlines = await apiService.getTopHeadlinesData();
            if(getTopHeadlines.data.status==="ok"){
                setTopHeadlinesData(getTopHeadlines.data);
            }
        }
        catch(e){
            toast.error(`Error while getting candidates: ${e}`)
        }
        finally{
            setLoadingState(false);
        }
    }

    useEffect(()=>{
        fetchTopHeadlinesData()
    }, [])

    return (
        <div>
            {loadingState&& <LoadingIndicator/>}
            {!loadingState && (
                topHeadlinesData?.articles.map((item, index)=>(
                    <div key = {index}>
                        <NewsFeedCard NewsFeedCardData = {item}/>
                    </div>
                ))
            )}
        </div>
    );
}

export default HomePage;