import instance from "@/api/instance.js";
import API from "@/constants/API.js";
import {
  CoAdminUserDto,
  FundDetailInfoDto,
  FundIntroDto,
} from "@/api/dto/fund.dto.js";

/**
 * 펀딩 목록 조회 api
 * @param {number | string} postId
 * @param {string=} keyword
 * @param {string=} sortType
 * @returns {Promise<axios.AxiosResponse<any>>} a
 */

const getFundInfoList = async ({ pageIndex, keyword, sortType }) => {
  if (keyword) {
    return await instance({
      url: API.FUND.LIST + "/search/keyword",
      method: "GET",
      params: { postId: pageIndex, sort: sortType, size: 12, keyword },
    });
  }

  return await instance({
    url: API.FUND.LIST,
    method: "GET",
    params: {
      page: pageIndex,
      size: 12,
      sort: sortType,
    },
  });
};

/**
 * 펀딩 좋아요
 * @param {string || number} fundId 펀딩 아이디
 * @returns {Promise<axios.AxiosResponse<any>>}
 */

const postFundLike = async (fundId) => {
  return await instance({
    url: API.FUND.LIKE(fundId),
    method: "POST",
  });
};

/**
 * 펀딩 좋아요 취소
 * @param {string || number} fundId 펀딩 아이디
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
const deleteFundLike = async (fundId) => {
  return await instance({
    url: API.FUND.UNLIKE(fundId),
    method: "POST",
  });
};

/**
 * 펀딩 상세 정보 조회
 * @param {number | string }fundId
 * @returns {Promise<FundDetailInfoDto>}
 */

const getDetailInfoByFundId = async (fundId) => {
  const response = await instance({
    url: API.FUND.DETAIL(fundId),
    method: "GET",
  });

  const data = response.data.response;
  return new FundDetailInfoDto({
    fundId: data?.postId,
    fundTitle: data?.title,
    thumbnailUrl: data?.thumbnail,
    createdAt: data?.createdAt,
    targetDate: data?.deadline,
    targetMoney: data?.targetPrice,
    currentMoney: data?.currentAmount,
    participantNumber: data?.participant,
    celebrityId: data?.celebId,
    celebrityName: data?.celebrity,
    celebrityProfileUrl: data?.celebImg,
    organizerId: data?.writerId,
    organizerName: data?.writer,
    organizerProfileUrl: data?.writerImg,
    likeCount: data?.heartCount,
    isOrganizer: data?.eqWriter,
    isInUserWishList: data?.heart,
    isFollowing: data?.followed,
  });
};

/**
 * 펀딩 공동관리자 조회
 * @param {string || number} fundId 펀딩 아이디
 * @returns {Promise<CoAdminUserDto[]>}
 */
const getCoAdminByFundId = async (fundId) => {
  const { data } = await instance({
    url: API.FUND.CO_ADMIN(fundId),
    method: "GET",
  });

  return data.response.map(
    (user) =>
      new CoAdminUserDto({
        userId: user.adminId,
        nickname: user.nickname,
        profileUrl: user.profile,
      }),
  );
};

/**
 * 펀딩 소개글 조회
 * @param {string || number} fundId 펀딩 아이디
 * @returns {Promise<FundIntroDto>}
 */
const getFundIntroductionByFundId = async (fundId) => {
  const { data } = await instance({
    url: API.FUND.INTRODUCTION(fundId),
    method: "GET",
  });

  return new FundIntroDto({ introduction: data?.response });
};

/**
 * 펀딩 출금 내역 조회
 * @param {string || number} fundId
 * @param {number} pageIndex
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
const getFundWithdrawInfo = async ({ fundId, pageIndex }) => {
  const { data } = await instance({
    url: API.FUND.WITHDRAW(fundId),
    method: "GET",
    params: { pageIndex: pageIndex },
  });

  return data.response;
};

/**
 * 출금 가능 금액 조회
 * @param {string || number} fundId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
const getFundBalance = async (fundId) => {
  const { data } = await instance({
    url: API.FUND.BALANCE(fundId),
    method: "GET",
  });

  return data.balance;
};

/**
 * 출금 신청 post
 * @param {number | string} fundId
 * @param {string} usage
 * @param {string} depositAccount ####-##-#######
 * @param {number} amount
 * @returns {Promise<*>}
 */

const postFundWithdraw = async ({ fundId, usage, depositAccount, amount }) => {
  return await instance({
    url: API.FUND.WITHDRAW(fundId),
    method: "POST",
    data: {
      usage,
      depositAccount,
      amount,
    },
  });
};

/**
 * 출금 인증 이미지 저장하기
 * @param {string || number} fundId
 * @param {string || number} withdrawId
 * @param {FormData} imageForm
 * @returns {Promise<*>}
 */

const postFundWithdrawEvidenceImage = async ({
  fundId,
  withdrawId,
  imageForm,
}) => {
  return await instance({
    url: API.FUND.WITHDRAW_IMAGE({ fundId, withdrawId }),
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: imageForm,
  });
};

/**
 * 펀딩 댓글 조회
 */
const getCommentsByFundId = async ({ fundId, pageIndex }) => {
  const { data } = await instance({
    url: API.FUND.COMMENT(fundId),
    method: "GET",
    data: { page: pageIndex },
  });

  return data.response;
};

/** 펀딩 댓글 작성
 *
 */
const postCommentByFundId = async (fundId, content) => {
  return await instance({
    url: API.FUND.COMMENT(fundId),
    method: "POST",
    data: { content },
  });
};

/**
 * 대댓글 조회
 * @param fundId
 * @param commentId
 * @return {Promise<*>}
 */

const getReplyByCommentId = async ({ fundId, commentId }) => {
  const { data } = await instance({
    url: API.FUND.COMMENT_REPLY({ fundId, commentId }),
    method: "GET",
  });

  return data.response;
};

/**
 * 대댓글 작성
 * @param fundId
 * @param commentId
 * @param content
 * @return {Promise<*>}
 */
const postReplyByCommentId = async ({ fundId, commentId, content }) => {
  return await instance({
    url: API.FUND.COMMENT_REPLY({ fundId, commentId }),
    method: "POST",
    data: { content },
  });
};

const createFund = async ({
  celebId,
  title,
  introduction,
  targetPrice,
  deadline,
  imageFile,
}) => {
  const formData = new FormData();
  formData.append("thumbnail", imageFile);

  const dto = {
    celebId,
    title,
    introduction,
    targetPrice,
    deadline: deadline[0],
  };

  formData.append(
    "dto",
    new Blob([JSON.stringify(dto)], { type: "application/json" }),
  );

  return await instance({
    url: API.FUND.WRITE,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });
};

const getUpdateByFundId = async ({ fundId, cursor }) => {
  const { data } = await instance({
    url: API.FUND.UPDATE(fundId),
    method: "GET",
  });

  return data.response;
};

const postUpdateByFundId = async ({ fundId, title, content }) => {
  return await instance({
    url: API.FUND.UPDATE(fundId),
    method: "POST",
    data: { title, content },
  });
};

const postPaymentByFundId = async ({ fundId, amount, impUid }) => {
  return await instance({
    url: API.FUND.PAYMENT(fundId),
    method: "POST",
    data: {
      amount,
      impUid,
    },
  });
};

export default {
  getFundInfoList,
  postFundLike,
  deleteFundLike,
  getCoAdminByFundId,
  getFundIntroductionByFundId,
  getDetailInfoByFundId,
  getFundWithdrawInfo,
  getFundBalance,
  postFundWithdraw,
  postFundWithdrawEvidenceImage,
  getCommentsByFundId,
  postCommentByFundId,
  getReplyByCommentId,
  postReplyByCommentId,
  createFund,
  getUpdateByFundId,
  postUpdateByFundId,
  postPaymentByFundId,
};
