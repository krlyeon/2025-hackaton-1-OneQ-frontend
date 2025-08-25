// src/components/Chats/ChatBox.styles.js
import styled, { css } from "styled-components";

const C = {
    ChatContainer: styled.div`
        max-width: 1000px;
        margin: 0 auto;
        padding: 16px;
        font-family: Pretendard, Arial, sans-serif;
    `,

    ChatWindow: styled.div`
        padding: 16px 12px;
        height: 70vh;                
        overflow-y: auto;
        scrollbar-width: none;   
        -ms-overflow-style: none; 
        &::-webkit-scrollbar {
            display: none;         
    }
    `,

    MessageRow: styled.div`
        display: flex;
        margin: 8px 0;
        ${({ role }) =>
        role === "user"
            ? css`
                justify-content: flex-end;
            `
            : css`
                justify-content: flex-start;
            `}
    `,

    Bubble: styled.div`
        position: relative;
        padding: 9px 12px;
        border-radius: 18px;
        color: #fff;
        max-width: min(65%, 50ch);
        white-space: pre-wrap;        
        word-break: break-word;      

    ${({ role }) =>
    role === "user"
        ? css`
            background: #0066FF;                
            border-bottom-right-radius: 6px;
            /* 꼬리 */
            &::after {
                content: "";
                position: absolute;
                right: -8px;
                bottom: 3px;
                border-width: 8px 0 8px 10px;
                border-style: solid;
                border-color: transparent transparent transparent #0066FF;
            }
        `
        : css`
            background: #808080;            
            border-bottom-left-radius: 6px;
            &::after {
                content: "";
                position: absolute;
                left: -8px;
                bottom: 5px;
                border-width: 8px 10px 8px 0;
                border-style: solid;
                border-color: transparent#808080 transparent transparent;
            }
        `}
    `,

    ChoicesContainer: styled.div`
        margin-top: 12px;
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
    `,
    ChoiceButton: styled.button`
        padding: 9px 12px;
        border-radius: 8px;
        background: #222;
        color: #fff;
        border: 1px solid #444;
        cursor: pointer;
        &:hover { background: #333; }
    `,

    LoadingText: styled.div`
        margin-top: 8px;
        font-style: italic;
        color: #666;
    `,

    ChatForm: styled.form`
        display: flex;
        gap: 8px;
        margin-top: 12px;
        align-items: center;
    `,
    
    ChatInput: styled.input`
        flex: 1;
        padding: 14px 16px;
        border-radius: 20px;
        border: 1px solid var(--Neutral-300, #BFBFBF);
        background: #ECECEC;
    `,
    ChatButton: styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 16px;
    width: 40px;                /* 아이콘 버튼 크기 */
    height: 40px;
    border-radius: 20px;
    border: 1px solid var(--Neutral-300, #808080);
    background: #808080;
    cursor: pointer;

    img {
        width: 14.56px;
        height: 17.437px;
        pointer-events: none;
    }

    ${(props) =>
        !props.disabled &&
        `
        background: #0066FF;
        border-color: #0066FF;
    `}

    &:disabled {
        cursor: not-allowed;
    }
    `,
};

export default C;
