import { ReactElement, useState } from "react";
import { NewsFeedCardProps } from "../interface/global.interfaces";
import NewsFeedCardModal from "./NewsFeedCardModal";

function NewsFeedCard(props: NewsFeedCardProps): ReactElement {
  const { NewsFeedCardData } = props;
  const [showMore, setShowMore] = useState<boolean>(false);

  const handleOnClick = (): void => {
    setShowMore(true);
  };

  console.log(NewsFeedCardData);

  return (
    <div>
      {!showMore && (
        <div className="card" style={{ width: "18rem" }}>
          <img
            className="card-img-top"
            src={NewsFeedCardData.urlToImage}
            alt="Card cap Staring"
          />
          <div className="card-body">
            <h5 className="card-title">{NewsFeedCardData.title}</h5>
            <p className="card-text">{NewsFeedCardData.description}</p>
          </div>
          <div className="card-body">
            <button
              onClick={() => {
                handleOnClick();
              }}
            >
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
