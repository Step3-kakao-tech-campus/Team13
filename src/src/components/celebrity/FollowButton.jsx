import BUTTON_TYPE from "@/constants/BUTTON_TYPE.js";
import Button from "../common/button/Button.jsx";
import { useState } from "react";
import { PropTypes } from "prop-types";

/**
 * 팔로우 버튼 컴포넌트
 * @param {string | number} celebId 셀럽 아이디
 * @param {boolean} isFollowing 팔로잉 여부
 * @param {boolean} useHoverStyle 호버 스타일링 적용 여부
 * @param {html.Attributes} htmlButtonProps 기타
 */

function FollowButton({
  celebId,
  isFollowing = false,
  useHoverStyle = true,
  ...htmlButtonProps
}) {
  const [isFollowingButton, setIsFollowingButton] = useState(!isFollowing);

  const handleFollowClick = () => {
    // 팔로우 버튼 클릭 시 로직
    console.log(celebId + " 셀럽을 팔로우합니다!");
    setIsFollowingButton(false);
  };
  const handleUnFollowClick = () => {
    // 팔로우 버튼 클릭 시 로직
    console.log(celebId + " 셀럽을 언팔합니다!");
    setIsFollowingButton(true);
  };

  if (isFollowingButton) {
    return (
      <Button
        styleType={BUTTON_TYPE.PRIMARY}
        onClick={e => {
          e.stopPropagation();
          handleFollowClick();
        }}
        useHoverStyle={useHoverStyle}
        {...htmlButtonProps}
      >
        팔로우
      </Button>
    );
  }

  return (
    <Button
      styleType={BUTTON_TYPE.SECONDARY}
      onClick={e => {
        e.stopPropagation();
        handleUnFollowClick();
      }}
      useHoverStyle={useHoverStyle}
      {...htmlButtonProps}
    >
      팔로잉
    </Button>
  );
}

FollowButton.propTypes = {
  celebId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  useHoverStyle: PropTypes.bool,
  isFollowing: PropTypes.bool,
};

export default FollowButton;
