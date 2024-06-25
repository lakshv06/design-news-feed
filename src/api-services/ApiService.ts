import axios, {AxiosResponse } from "axios";
import { TopHeadlinesDataInterface } from "../interface/global.interfaces";
import environmentData from "../environment-constants";

class NewsAPI {
  endpoints: { [key: string]: string };

  base_url: string;

  apiKey: string;

  constructor() {
    this.endpoints = {
      top_headlines: `top-headlines?country=us&apiKey=`,
    };

    this.base_url = `${environmentData.url}`;

    this.apiKey = `${environmentData.apiKey}`
  }

 getTopHeadlinesData = async (page: number):Promise <AxiosResponse<TopHeadlinesDataInterface>> =>{
    return axios.get(`${this.base_url}${this.endpoints.top_headlines}${this.apiKey}`)
 }

}
const apiService = new NewsAPI();

export default apiService;
