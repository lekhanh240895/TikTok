import styled from 'styled-components';

export const Wrapper = styled.ul`
    //Action items
    .action-item {
        cursor: pointer;
        margin-bottom: 12px;
    }

    .action-item-btn {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: rgb(255 255 255 / 12%);
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 6px;
        transition: color 0.1s ease-in;
        color: var(--white-color);
    }

    .video-stat {
        font-size: 1.2rem;
        font-weight: 700;
        display: inline-block;
        text-align: center;
        width: 100%;
        line-height: 17px;
        color: var(--white-color);
    }

    @media (max-width: 468px) {
        .action-item-btn {
            background-color: transparent;

            svg {
                width: 40px;
                height: 40px;
            }
        }
        .video-stat {
            font-size: 1.4rem;
        }
    }
`;
