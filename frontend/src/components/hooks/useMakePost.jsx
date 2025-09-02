import { useMutation } from "@apollo/client";
import { MAKEPOST } from "../graphql/mutations";
import { GET_FEED_POSTS } from "../graphql/queries";
import { getOperationName } from "@apollo/client/utilities";

const useMakePost = () => {
  const [mutate, result] = useMutation(MAKEPOST);
  const make = async ({ description, feedname, headline, img }) => {
    console.log(description);
    const data = await mutate({
      variables: {
        headline: headline,
        description: description,
        feedname: feedname,
        img: img,
      },

    });
    return data;
  };
  return [make, result];
};
export default useMakePost;
