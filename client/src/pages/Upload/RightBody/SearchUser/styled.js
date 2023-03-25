import styled from 'styled-components'

export const Wrapper = styled.div`
    &.input-container {
        min-height: 46px;
        position: relative;
        text-align: center;
        border: 1px solid rgba(22, 24, 35, 0.12);
        border-radius: 4px;

        .tag-user {
            color: var(--primary-color);
        }

        .input {
            width: 100%;
            padding: 12px 80px 12px 16px;
            font-size: 1.5rem;
            min-height: 46px;
            caret-color: var(--primary-color);
            overflow: auto;
            white-space: pre-wrap;
            overflow-wrap: break-word;
        }

        .search-input {
            padding: 12px 40px;
            caret-color: unset;
        }

        .hashtag {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            align-items: center;

            .hash,
            .tag {
                font-weight: 700;
                margin: 4px 6px;
                cursor: pointer;
            }
        }

        .search-icon {
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
        }

        .close-icon {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
        }
    }

    .user-search-container {
        position: absolute;
        bottom: -231px;
        left: 0;
        right: 0;

        .user-search {
            position: relative;
            height: 230px;
            overflow: auto;
            box-shadow: rgb(34 90 89 / 20%) 2px 0px 20px -20px,
                rgb(34 90 89 / 20%) 0px 8px 20px -2px,
                rgb(34 90 89 / 20%) 0px 0px 20px -20px;
            border-radius: 0 0 4px 4px;
            z-index: 999;
            background-color: var(--white-color);
            display: grid;
            grid-auto-columns: minmax(0, 1fr);
            grid-auto-flow: column;
            padding: 20px 0;
            column-gap: 10px;

            .select-column {
                .select-title {
                    font-size: 1.5rem;
                    color: rgb(22 24 35 / 50%);
                    line-height: 18px;
                    text-align: start;
                    margin-bottom: 8px;
                    margin-left: 24px;
                }
                .select-item {
                    padding: 10px 24px;
                    cursor: pointer;
                    &:hover {
                        background-color: rgb(248, 248, 248);
                        transition: background-color 0.4s
                            cubic-bezier(0.27, 1.27, 0.48, 0.56) 0s;
                    }
                    display: flex;
                    .avatar-wrapper {
                        width: 48px;
                        height: 48px;
                        flex-shrink: 0;
                    }
                    .user-info {
                        margin-left: 12px;
                        overflow: hidden;
                        text-align: start;

                        .name {
                            font-size: 1.7rem;
                            font-weight: 700;
                            font-family: var(--font-family);
                            line-height: 20px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        .username {
                            font-weight: 400;
                            font-size: 1.4rem;
                            color: rgba(22 24 35 / 50%);
                            line-height: 18px;
                            margin-top: 3px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                }
            }
        }
    }
`
