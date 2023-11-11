import styled from "styled-components";
import TestAccountIcon from "@/assets/icon/TestAccountIcon";
import { useState } from "react";
import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";
import ReplyInput from "@/components/fund-detail/comment/ReplyInput.jsx";
import formatDateToYYYYMMDD from "@/utils/formateDateToYYYYMMDD.js";
import InfiniteReply from "@/components/fund-detail/comment/InfiniteReply.jsx";
import { EpochSecondToDateObject } from "@/utils/EpochConverter.js";

const Styled = {
  CommentContainer: styled.div`
    padding: 0.25rem 0;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  `,

  UserProfileBox: styled.div`
    padding-right: 0.75rem;

    img {
      width: 2.25rem;
      height: 2.25rem;
      border-radius: 9999px;
      object-fit: cover;
    }
  `,

  RightWrapper: styled.div`
    width: 100%;
  `,

  TextBox: styled.div`
    padding-bottom: 0.5rem;
    .top {
      margin-bottom: 0.25rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    .date {
      margin-left: 0.25rem;
      font-size: 0.75rem;
      color: ${({ theme }) => theme.color.addition};
    }

    .writer-name {
      font-weight: 500;
    }
  `,

  ButtonBox: styled.div`
    margin-bottom: 0.5rem;
    width: 100%;

    .open-reply-input {
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
      font-weight: 500;
      color: ${({ theme }) => theme.color.alertBlue};
      background-color: #e7f3ff;
      border: 1px solid ${({ theme }) => theme.color.alertBlue};
      border-radius: 9999px;
    }
  `,
};

/**
 * 댓글 컴포넌트
 * @param {number} commentId
 * @param {number} writerId
 * @param {string} writerName
 * @param {string} writerProfile
 * @param {string} content
 * @param {number} replyCount
 * @param {number} createdAt
 * @param {boolean} isReply
 */

function Comment({
  commentId,
  writerId,
  writerName,
  writerProfile,
  content,
  replyCount,
  createdAt,
  isReply = false,
}) {
  const [isReplyInputOpen, setIsReplyInputOpen] = useState(false);
  const navigate = useNavigate();
  const handleUserClick = () => {
    navigate(`routes/${writerId}`);
  };
  return (
    <Styled.CommentContainer>
      <Styled.UserProfileBox onClick={handleUserClick}>
        {writerProfile ? (
          <img src={writerProfile} alt={`프로필 사진`} />
        ) : (
          <TestAccountIcon />
        )}
      </Styled.UserProfileBox>

      <Styled.RightWrapper>
        <Styled.TextBox>
          <div className="top">
            <div className="writer-name">{writerName}</div>
            <div className="date">
              {formatDateToYYYYMMDD(EpochSecondToDateObject(createdAt))}
            </div>
          </div>
          <div className="content">{content}</div>
        </Styled.TextBox>
        {isReply || (
          <>
            <Styled.ButtonBox>
              <button
                className="open-reply-input"
                onClick={() => {
                  setIsReplyInputOpen((prev) => !prev);
                }}
              >
                답글 {replyCount}
              </button>
            </Styled.ButtonBox>
            {isReplyInputOpen && (
              <>
                <InfiniteReply commentId={commentId} />
                <ReplyInput commentId={commentId} />
              </>
            )}
          </>
        )}
      </Styled.RightWrapper>
    </Styled.CommentContainer>
  );
}

Comment.propTypes = {
  commentId: PropTypes.number,
  writerId: PropTypes.number,
  writerName: PropTypes.string,
  writerProfile: PropTypes.string,
  content: PropTypes.string,
  replyCount: PropTypes.number,
  createdAt: PropTypes.number,
  isReply: PropTypes.bool,
};
export default Comment;
