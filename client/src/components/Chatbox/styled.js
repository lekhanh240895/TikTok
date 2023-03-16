import styled from 'styled-components'

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;

    .chatbox-header {
        padding: 16px;
        display: flex;
        align-items: center;
        border-bottom: 0.5px solid rgba(22, 24, 35, 0.12);

        .chat-user-info {
            margin-left: 12px;
            .chat-user__name {
                font-size: 1.8rem;
                font-family: var(--font-family);
                font-weight: 700;
                line-height: 24px;

                .check {
                    margin-left: 5px;
                    margin-bottom: 2px;
                }
            }
            .chat-user__username {
                font-family: var(--font-family);
                line-height: 22px;
                margin-top: 2px;
            }

            .chat-user_subinfo {
                display: none;
            }
        }
    }

    .message-list-wrapper {
        flex: 1;
        padding-top: 24px;
        display: flex;
        flex-direction: column-reverse;
        width: 100%;
        overflow-y: auto;
    }

    .chatbox-bottom {
        background-color: #fff;
        padding: 13px 16px 13px;
        border-top: 0.5px solid rgba(22, 24, 35, 0.12);

        .add-message-form {
            display: flex;
            width: 100%;
        }

        .form-group {
            flex: 1;
            position: relative;
            background-color: rgba(22, 24, 35, 0.06);
            border: 1px solid transparent;
            padding: 7px 16px;
            border-radius: 8px;
            height: 40px;

            .form-control {
                background-color: transparent;
                min-height: 17px;
                width: 100%;
                caret-color: var(--primary-color);
                font-size: 1.5rem;
                color: rgb(22 24 35 / 75%);
            }

            .emoji-button {
                width: 32px;
                height: 32px;
                position: absolute;
                right: 11px;
                top: 50%;
                transform: translateY(-50%);
                cursor: pointer;
            }
        }
        .post-message-btn {
            min-width: 48px;
            background-color: transparent;
            color: var(--primary-color);
            padding: 0;
            height: 40px;
            padding-top: 3px;
            padding-left: 4px;
        }
    }

    .chatbox-back-icon {
        display: none;
    }

    @media (max-width: 1024px) {
        .chatbox-header {
            justify-content: center;
            flex-direction: column;
            border-bottom: unset;

            .avatar {
                width: 10rem;
                height: 10rem;
            }
            .chat-user-info {
                margin-top: 16px;
                margin-left: 0;
                text-align: center;

                .chat-user__name {
                    font-size: 2.4rem;
                }
                .chat-user__username {
                    font-size: 1.8rem;
                }

                .chat-user_subinfo {
                    display: block;
                    font-size: 1.8rem;
                    line-height: 22px;

                    .separate {
                        display: inline-block;
                        width: 3px;
                        height: 3px;
                        background-color: rgb(22 24 35 / 35%);
                        border-radius: 50%;
                        margin: 0 8px;
                        margin-bottom: 2px;
                    }
                }
            }
        }
        .message-list-wrapper {
            padding-top: 0;
        }
        .chatbox-bottom {
            background-color: inherit;
            border-top: unset;

            .add-message-form {
                .form-group {
                    background-color: var(--white-color);
                    border-radius: 999px;
                }
            }
        }
        .chatbox-back-icon {
            display: flex;
            position: absolute;
            left: 14px;
            top: 14px;
            width: 46px;
            height: 46px;
            border-radius: 50%;
            background-color: var(--white-color);
            cursor: pointer;
            svg {
                width: 2.4rem;
                height: 2.4rem;
            }
        }
    }
`
