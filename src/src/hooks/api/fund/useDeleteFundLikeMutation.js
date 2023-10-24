import { useMutation } from "@tanstack/react-query";
import API from "@/constants/API.js";
import FundAPI from "@/api/fundAPI.js";
import toast from "react-hot-toast";

function useDeleteFundLikeMutation(handleSuccess) {
  return useMutation(
    [API.FUND.LIKE],
    ({ fundId }) => {
      return FundAPI.deleteFundLike(fundId);
    },
    {
      onError: (err) => {
        toast.error(err.message);
      },
      onSuccess: handleSuccess,
    },
  );
}

export default useDeleteFundLikeMutation;