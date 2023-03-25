import styled from 'styled-components'

export const Wrapper = styled.form`
    &.add-comment-form {
        height: 82px;
        background-color: #fff;
        padding: 21px 0;
        margin: 0 30px;
        display: flex;

        .user-search-wrapper {
            flex: 1;
            position: relative;
            caret-color: var(--primary-color);
            background-color: rgba(22, 24, 35, 0.06);
            border: 1px solid transparent;
            border-radius: 8px;

            .input-container {
                width: 100%;
                height: 40px;
                caret-color: var(--primary-color);
                border: 1px solid transparent;
                border-radius: 8px;
                position: relative;
                min-height: unset;

                input {
                    padding: 12px 40px;
                    caret-color: unset;
                    min-height: unset;
                    background-color: transparent;
                }

                .user-search-container {
                    bottom: 120%;
                }
            }
        }

        .form-group {
            flex: 1;
            position: relative;
            caret-color: var(--primary-color);
            background-color: rgba(22, 24, 35, 0.06);
            padding: 7px 10px;
            border: 1px solid transparent;
            border-radius: 8px;

            .form-control {
                min-height: 17px;
                width: 100%;
                height: 100%;
                background-color: transparent;
            }
        }

        .post-comment-btn {
            min-width: 60px;
            background-color: transparent;
            color: var(--primary-color);
        }
        .post-comment-btn.disabled {
            background-color: transparent;
            pointer-events: none;
            color: rgba(22, 24, 35, 0.34);
        }
    }
`
