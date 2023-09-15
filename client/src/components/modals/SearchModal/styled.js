import styled from 'styled-components'

export const Wrapper = styled.div`
    --search-border-radius: 92px;
    --search-height: 46px;
    --search-button-width: 52px;

    position: relative;
    width: 100vw;
    animation: show 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

    @keyframes show {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .modal_inner {
        background-color: #fff;
        height: 100%;
        width: 100%;
        display: flex;
        position: relative;
        flex-direction: column;

        .header {
            margin-bottom: 16px;
            padding: 8px;
            display: flex;
            gap: 16px;
            align-items: center;

            .back-btn {
                font-size: 2rem;
                width: 4.4rem;
                height: 4.4rem;
                color: rgba(22, 24, 35, 0.34);
                cursor: pointer;
                transition: all 0.5s;

                &:hover {
                    color: rgba(22, 24, 35, 0.75);
                }
            }

            .search {
                flex: 1;
                padding-left: 16px;
                background-color: var(--main-background-color);
                display: flex;
                height: var(--search-height);
                position: relative;
                border: 1.5px solid transparent;

                input {
                    padding: 12px 42px 12px 0;
                    font-size: 1.6rem;
                    background-color: transparent;
                    border: none;
                    outline: none;
                    color: var(--black-color);
                    flex: 1;
                    caret-color: var(--primary-color);
                    font-family: var(--font-family);

                    &:not(:placeholder-shown) ~ .search-btn {
                        color: rgba(22, 24, 35, 0.75);
                    }
                }

                &::after {
                    content: '';
                    position: absolute;
                    top: 9px;
                    right: var(--search-button-width);
                    width: 1px;
                    height: 28px;
                    background-color: var(--main-border-color);
                }

                &:focus-within {
                    border-color: rgba(22, 24, 35, 0.2);
                }

                .search-btn {
                    width: var(--search-button-width);
                    height: 100%;
                    padding: 0 14px;
                    color: rgba(22, 24, 35, 0.34);
                    border-top-right-radius: var(--search-border-radius);
                    border-bottom-right-radius: var(--search-border-radius);
                    cursor: pointer;
                }
            }
        }

        .search-result {
            padding: 16px;
        }
    }
`
