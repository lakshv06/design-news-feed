import { ReactElement, useState } from "react";
import { NewsFeedCardProps } from "../interface/global.interfaces";
import NewsFeedCardModal from "./NewsFeedCardModal";
import '../newsfeedcard.css'; // Import the CSS file for NewsFeedCard

function NewsFeedCard(props: NewsFeedCardProps): ReactElement {
  const { NewsFeedCardData } = props;
  const [showMore, setShowMore] = useState<boolean>(false);

  const handleOnClick = (): void => {
    setShowMore(true);
  };

  return (
    <div>
      {!showMore && (
        <div className="card">
          <div className="card-img-container">
            <img
              className="card-img-top"
              src={NewsFeedCardData.urlToImage}
              alt="Card cap"
            />
          </div>
          <div className="card-body">
            <h5 className="card-title">{NewsFeedCardData.title}</h5>
            <p className="card-text">{NewsFeedCardData.description}</p>
          </div>
          <div className="card-body d-flex justify-content-end">
            <button className= "btn btn-outline-primary" onClick={handleOnClick}>
              Show More...
            </button>
          </div>
        </div>
      )}
      {showMore && (
        <NewsFeedCardModal
          NewsFeedCardModalData={NewsFeedCardData}
          setShowMore={setShowMore}
        />
      )}
    </div>
  );
}

export default NewsFeedCard;
