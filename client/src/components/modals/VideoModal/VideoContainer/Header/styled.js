import styled from 'styled-components'

export const Wrapper = styled.div`
    &.header {
        position: absolute;
        top: 20px;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        z-index: 1;
        padding: 0 20px;
        line-height: 0;

        .left {
            display: flex;
            align-self: center;

            .close-btn {
                margin-right: 24px;
                color: #fff;
                cursor: pointer;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background-color: rgb(255 255 255 / 12%);
            }
        }
        .right {
            background-color: rgb(255 255 255 / 12%);
            color: var(--white-color);
            border-radius: 20px;
            font-size: 1.4rem;
            padding: 10px 16px;
            display: flex;
            align-items: center;
            font-weight: 600;
            font-family: 'SofiaPro';

            .report-icon {
                margin-right: 5px;
            }
        }
    }
`
