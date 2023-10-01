import { useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import MenuIcon from "@/assets/MenuIcon.jsx";
import MobileTabList from "@/components/common/nav-bar/moblie/MobileTabList.jsx";
import MobileSideBar from "@/components/common/nav-bar/moblie/MobileSideBar.jsx";
import routes from "@/constants/routes.js";

const Styled = {
  Container: styled.nav`
    position: fixed;
    left: 0;

    background-color: ${({ theme }) => theme.color.white};
  `,
  Head: styled.div`
    padding: 0 1rem;
    width: 100vw;
    height: 60px;

    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  MenuBtn: styled.button`
    background-color: ${({ theme }) => theme.color.white};
  `,
  Logo: styled.div`
    font-family: ${({ theme }) => theme.fontFamily.logo};
    font-weight: 300;
    font-size: 2rem;
    color: ${({ theme }) => theme.color.highlight};
  `,
};

function MobileNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <Styled.Container>
        <Styled.Head>
          <Styled.MenuBtn
            onClick={() => {
              setIsMenuOpen((prev) => !prev);
            }}
          >
            <MenuIcon />
          </Styled.MenuBtn>
          <Styled.Logo>fundering</Styled.Logo>
          <div style={{ width: "2rem", height: "2rem" }}></div>
        </Styled.Head>

        {[routes.home, routes.fund, routes.celebrity].includes(
          location.pathname,
        ) && <MobileTabList />}
      </Styled.Container>

      {isMenuOpen && <MobileSideBar setIsSideBarOpen={setIsMenuOpen} />}
    </>
  );
}

export default MobileNavBar;
