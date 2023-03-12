import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  min-width: 520px;

  .header {
    margin-bottom: 20px;
    padding-right: 92px;
    position: relative;
    max-width: 624px;
  }

  .share-info {
    display: flex;
    margin-bottom: 22px;
  }

  .avatar {
    position: relative;
    width: 116px;
    height: 116px;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: contain;
    }

    .mobile-more-icon {
      position: absolute;
      bottom: 0;
      right: 0;
      display: none;
      justify-content: center;
      align-items: center;
      background-color: var(--main-background-color);
      border-radius: 50%;
      color: rgb(22 24 35 / 34%);
      padding: 3px;
      cursor: pointer;
      opacity: 0.8;
    }

    &:hover .mobile-more-icon {
      opacity: 1;
    }
  }

  .share-title {
    margin-left: 20px;

    h2 {
      font-weight: 700;
      font-size: 3.2rem;
      line-height: 3.8rem;
      margin-bottom: 4px;
      svg {
        margin-left: 12px;
      }
    }
    h4 {
      font-weight: 600;
      font-size: 1.8rem;
      line-height: 2.5rem;
      margin-bottom: 20px;
    }
  }

  .user-stats-wrapper {
    display: flex;

    .user-stats {
      margin-right: 12px;
      span {
        font-weight: 700;
        font-size: 1.8rem;
        margin-right: 6px;
      }
    }
  }

  .header-actions {
    position: absolute;
    right: 52px;
    top: 10px;
    display: flex;

    .share-icon {
      width: 2.4rem;
      height: 2.4rem;
      color: transparent;
      cursor: pointer;
      margin-right: 12px;
    }
  }

  .bio {
    margin-top: 10px;
  }

  .button-group {
    display: flex;
    justify-content: center;
    align-items: center;

    .styled-btn {
      min-width: 164px;
      padding: 6px 16px;

      span[class*="title"] {
        font-size: 1.8rem;
        line-height: 22px;
        font-weight: 600;
        font-family: "SofiaPro", sans-serif;
      }
    }
    .friend-icon {
      height: 36px;
      width: 36px;
      border: 1px solid rgb(227 227 228);
      margin-left: 8px;
      cursor: pointer;
    }
  }

  .nav-list {
    position: relative;
    display: flex;
    align-items: stretch;
    width: 460px;

    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 1px;
      left: 0;
      bottom: 0;
      background-color: rgb(22 24 35 / 20%);
    }

    .nav-item {
      min-width: 50%;
      height: 44px;
      font-size: 1.8rem;
      line-height: 2.5rem;
      font-weight: 600;
      text-align: center;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      color: rgb(18 18 18 / 50%);

      span {
        margin-right: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      &.active {
        color: var(--text-color);
      }
    }

    .line {
      position: absolute;
      height: 2px;
      width: 50%;
      transform: translateX(0);
      bottom: 0;
      left: 0;
      background-color: rgb(22 24 35);
      transition: all 0.3s ease-in;
    }
  }

  .video-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(184px, 1fr));
    gap: 24px 16px;
    width: 100%;

    .video-item {
      margin-top: 10px;
      height: 100%;
      width: 100%;
      cursor: pointer;
    }
  }

  @media screen and (max-width: 736px) {
    .header-actions {
      right: 12px;
    }
  }

  @media screen and (max-width: 468px) {
    min-width: 250px;

    .header {
      padding-right: 0px;
    }
    .share-info {
      margin-bottom: 12px;
    }

    .avatar {
      width: 80px;
      height: 80px;

      .mobile-more-icon {
        display: flex;
      }
    }

    .share-title {
      margin-left: 12px;

      h2 {
        font-size: 3rem;
        margin-bottom: 4px;
        white-space: nowrap;

        svg {
          margin-left: 8px;
        }
      }

      h4 {
        margin-bottom: 14px;
      }
    }

    .header-actions {
      display: none;

      .share-icon {
        margin-right: 8px;
      }
    }

    .nav-list {
      width: 100%;
      .nav-item {
        min-width: 50%;
      }
      .line {
        position: absolute;
        height: 2px;
        width: 50%;
        transform: translateX(0);
        bottom: 0;
        left: 0;
        background-color: rgb(22 24 35);
        transition: all 0.3s ease-in;
      }
    }

    .video-list {
      grid-template-columns: repeat(auto-fill, minmax(75px, 1fr));
      gap: 16px;

      .video-item {
      }
    }
  }
`;
