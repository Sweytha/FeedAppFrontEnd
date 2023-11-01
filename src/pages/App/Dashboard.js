import React, { useEffect, useContext, useState } from "react";

import { AppContext } from "../../context/applicationContext";
import LoadingIndicator from "../../components/LoadingIndicator";

//import the API from apiUtil.js
import { getOthersFeedsApi } from "../../util/ApiUtil";

import MyProfile from "../../components/MyProfile";
import AddFeed from "../../components/AddFeed";

import InfiniteScroll from "react-infinite-scroll-component";
import FeedCard from "../../components/FeedCard";

const Dashboard = () => {

  //name spacing for the child component by using the useContext hook
  const appContext = useContext(AppContext);
  //access the token which is present inside our cookies
  const token = appContext.getSession();
  //access the user data by calling getUserData() function from AppContext
  const userData = appContext.getUserData();

  //all the other user's feeds are captured and stored inside an array
  const [feedsData, setFeedsData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  //is a state variable that holds a boolean value indicating whether there are more feeds to be displayed
  const [hasMore, setHasMore] = useState(true);

  //this function which is going to load the feeds of other user's
  const getOthersFeeds = async (loadPageNumber) => {
    //if the page number is 0 then set the feedsData to an empty array
    if (loadPageNumber === 0) {
      setFeedsData([]);
    }

    //now call the getOthersFeedsApi which gets all the feeds posted by other user's
    const apiResponse = await getOthersFeedsApi(token, loadPageNumber);

    console.log(apiResponse);

    //the feeds are loaded successfully the status is 1
    if (apiResponse.status === 1) {
      //we have declared a new array
      let feedsDataNew = [];

      //If loadPageNumber is not 0, then feedsDataNew is set to the current value of feedsData
      if (loadPageNumber !== 0) {
        feedsDataNew = feedsData;
      }

      //use a spread operator to load the array content from the apiresponse
      feedsDataNew.push(...apiResponse.payLoad.content);
      setFeedsData(feedsDataNew);

      //increment the page number if a current page has already loaded with 5 feeds
      setPageNumber(loadPageNumber + 1);

      // if the value of loadPageNumber + 1 is equal to the total number of pages, 
      //then hasMore is set to false using the setHasMore hook, otherwise, it is set to true.
      if (loadPageNumber + 1 === apiResponse.payLoad.totalPages) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    }
  };

  useEffect(() => {
    //load the title of the page when the component is rendered 
    document.title = "Home | Feed App";

    //render the feeds in the first page and lazy load the remaining feeds 
    getOthersFeeds(0);
  }, []);


  //if the data is still being fetched from the backend , then display a loading indicator 
  if (!userData) {
    return <LoadingIndicator />;
  }


  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-12 mx-0 md:mx-12 w-2xl container px-2 mx-auto">
      {/* {#MyProfile Component} */}
      <MyProfile />
      <article>
        {/* {#AddFeed Component} */}
        <AddFeed />
        {/* {#FeedCard Component} */}
        <InfiniteScroll
          dataLength={feedsData.length}
          next={() => getOthersFeeds(pageNumber)}
          hasMore={hasMore}
          endMessage={
            <p className="text-center">
              <b>Yay! You have seen it all.</b>
            </p>
          }
          refreshFunction={() => getOthersFeeds(0)}
          pullDownToRefresh
          pullDownToRefreshThreshold={50}
          pullDownToRefreshContent={
            <h3 className="text-center">&#8595; Pull down to refresh</h3>
          }
          releaseToRefreshContent={
            <h3 className="text-center">&#8593; Release to refresh</h3>
          }
        >
          <div className="mt-3">
            {feedsData.map(
              ({ feedId, picture, content, createdOn, feedMetaData, user }) => (
                <FeedCard
                  key={feedId}
                  feedId={feedId}
                  picture={picture}
                  content={content}
                  createdOn={createdOn}
                  username={user.username}
                  firstName={user.firstName}
                  lastName={user.lastName}
                  profilePicture={user.profile.picture}
                  feedMetaData={feedMetaData}
                />
              )
            )}
          </div>
        </InfiniteScroll>
      </article>
    </main>
  )
}

export default Dashboard