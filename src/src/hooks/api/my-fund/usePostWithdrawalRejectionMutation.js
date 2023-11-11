import { useMutation } from "@tanstack/react-query";
import API from "@/constants/API.js";
import myFundAPI from "@/api/myFundAPI";
import { toast } from "react-hot-toast";

function usePostWithdrawalRejectionMutation(handleSuccess) {
  return useMutation(
    [API.MY_FUND.REJECTION],
    async (id) => {
      return myFundAPI.postWithdrawalRejection(id);
    },
    {
      onError: (err) => {
        toast.error(err.response.data.message);
      },
      onSuccess: () => {
        toast.success("출금승인이 거부되었습니다!");
        handleSuccess();
      },
    },
  );
}

export default usePostWithdrawalRejectionMutation;
