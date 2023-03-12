import styled from 'styled-components';

export const Wrapper = styled.div`
    &.hide {
        height: 0;
    }

    &.show {
        height: 100%;
    }

    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    max-height: 276px;
    display: none;
    flex-direction: column;
    background-color: #fff;
    border-radius: 12px 12px 0 0;
    transition: all 0.5s ease;
    background-color: rgb(245 244 244);
    overflow: hidden;

    @media (max-width: 468px) {
        display: flex;
    }

    .header {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        font-weight: 600;
        font-size: 1.6rem;
        padding: 12px 0;
    }
    .share-list {
        width: 100%;
        height: 68px;
        padding: 0 24px;
        overflow: auto;
        display: flex;
        justify-content: space-between;
        margin-bottom: 16px;

        &::-webkit-scrollbar {
            display: none;
        }

        .share-item {
            display: flex;
            flex-direction: column;
            align-items: center;

            &:not(:last-child) {
                margin-right: 16px;
            }
        }
        .item-icon {
            width: 44px;
            height: 44px;
            svg {
                width: 44px;
                height: 44px;
            }
        }
        .item-title {
            padding-top: 8px;
            font-size: 11px;
            line-height: 14px;
            color: rgba(22, 24, 35, 0.75);
            display: block;
            width: 46px;
            text-align: center;
        }
    }

    .report-container {
        flex: 1;
        padding: 16px 0;
        display: flex;
        justify-content: space-between;
        border-top: 1px solid rgba(22, 24, 35, 0.06);
        margin: 0 24px;

        .report-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .report-icon {
                width: 44px;
                height: 44px;

                svg {
                    fill: none;
                    width: 44px;
                    height: 44px;
                }
            }

            .title {
                padding-top: 8px;
                font-size: 11px;
                line-height: 14px;
                color: rgba(22, 24, 35, 0.75);
                text-align: center;
                display: block;
                width: 46px;
            }
        }
    }
    .footer {
        height: 52px;
        line-height: 52px;
        text-align: center;
        padding: 1px 6px;
        font-size: 1.6rem;
        background-color: var(--white-color);
        width: 100%;
        cursor: pointer;
    }
`;
