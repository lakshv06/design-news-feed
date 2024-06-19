import { ReactElement, useEffect } from "react";
import { useState } from "react";
import { TopHeadlinesDataInterface } from "../interface/global.interfaces";
import apiService from "../api-services/ApiService";
import { toast } from "react-toastify";

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
            {loadingState&& <p>Loading...</p>}
            {!loadingState && (
                topHeadlinesData?.articles.map((item, index)=>(
                    <p key = {index}> {item?.author}</p>
                ))
            )}
        </div>
    );
}

export default HomePage;