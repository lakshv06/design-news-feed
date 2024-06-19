import { ReactElement } from "react";
import { NewsFeedCardProps } from "../interface/global.interfaces";

function NewsFeedCard (props: NewsFeedCardProps): ReactElement{
    const {NewsFeedCardData} = props;
    return(
        <div>
            <p>{NewsFeedCardData.author} askjfh {NewsFeedCardData.description}</p>
        </div>
    )
}

export default NewsFeedCard;