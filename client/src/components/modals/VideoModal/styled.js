import styled from 'styled-components'

export const Wrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
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
        justify-content: space-between;
        position: relative;

        .action-list-wrapper {
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            display: none;
        }
    }

    @media (max-width: 1024px) {
        .modal_inner .action-list-wrapper {
            display: block;
        }
    }
`
