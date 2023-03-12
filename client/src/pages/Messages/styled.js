import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: var(--default-layout-header-height);
  max-width: 100%;
  background-color: rgb(248 248 248);

  .container {
    height: calc(100vh - var(--default-layout-header-height));
    width: var(--default-layout-width);
    max-width: 100%;
    display: flex;
    padding: 16px var(--default-layout-horizontal-spacer) 10px;
    justify-content: space-between;
    position: relative;
  }

  .sidebar {
    width: 356px;
    flex-shrink: 0;
    height: 100%;
    background-color: var(--white-color);
    flex-shrink: 0;
    border-radius: 8px;

    .sidebar-header {
      padding: 0 16px 0 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 60px;
      line-height: 60px;
      .title {
        font-size: 2.4rem;
        line-height: 28px;
        font-weight: 700;
      }
    }
  }

  .content {
    width: 728px;
    height: 100%;
    position: relative;
    background-color: var(--white-color);
    margin-left: 16px;
    border-radius: 8px;
  }

  .back-icon {
    position: absolute;
    left: -33px;
    top: 25px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgb(22 24 35 / 3%);
    cursor: pointer;

    svg {
      width: 2rem;
      height: 2rem;
    }
  }

  @media (max-width: 1024px) {
    .container {
      padding: 0;

      .sidebar {
        width: 100%;
        display: block;
      }

      .content {
        display: none;

        width: 100%;
        margin-left: 0;
        background: rgb(22 24 35 / 3%);
      }
    }

    .container.mobile-has-selectID {
      .sidebar {
        display: none;
      }
      .content {
        display: block;
      }
    }
  }
`;
