import { useInfiniteQuery } from "@tanstack/react-query";
import API from "@/constants/API.js";
import FundAPI from "@/api/fundAPI.js";

function useInfiniteReplyQuery({ fundId, commentId }) {
  return useInfiniteQuery(
    [API.FUND.COMMENT_REPLY({ fundId, commentId })],
    async () => {
      return await FundAPI.getReplyByCommentId({ fundId, commentId });
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.isLastPage) return;
        return lastPage.currentPage + 1;
      },
    },
  );
}

export default useInfiniteReplyQuery;
