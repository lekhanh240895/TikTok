import styled from 'styled-components'

export const Container = styled.div`
    position: relative;
    min-width: 520px;

    @media (max-width: 768px) {
        min-width: unset;
    }
`

export const SearchForm = styled.form`
    --search-border-radius: 92px;
    --search-height: 46px;
    --search-button-width: 52px;

    flex: 1;
    padding-left: 16px;
    background-color: var(--main-background-color);
    border-radius: var(--search-border-radius);
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

    @media (min-width: 768px) {
        display: none;
    }
`

export const VideoList = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(184px, 1fr));
    gap: 24px 16px;
    width: 100%;
`

export const VideoItem = styled.li`
    margin-top: 10px;
    height: 100%;
    width: 100%;
    cursor: pointer;
`

export const NavList = styled.ul`
    position: relative;
    display: flex;
    align-items: stretch;
    width: 690px;

    &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        left: 0;
        bottom: 0;
        background-color: rgb(22 24 35 / 20%);
    }

    @media (max-width: 768px) {
        width: 100%;
    }
`
export const NavItem = styled.li`
    min-width: 230px;
    height: 44px;
    font-size: 1.8rem;
    line-height: 25px;
    font-weight: 600;
    text-align: center;

    cursor: pointer;
    color: ${(props) =>
        props.active ? 'var(--text-color) ' : 'rgb(18 18 18 / 50%)'};
    display: flex;
    justify-content: center;
    align-items: center;

    span {
        margin-right: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @media (max-width: 768px) {
        min-width: unset;
        flex: 1;
    }
`

export const Line = styled.div`
    position: absolute;
    height: 2px;
    width: 33.33%;
    transform: translateX(0);
    bottom: 0;
    left: 0;
    background-color: rgb(22 24 35);
    transition: all 0.3s ease-in;
`
