import styled from "styled-components";

const M = {
  Modal: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  `,

  // 다이얼로그 컨테이너
  ModalContainer: styled.div`
    position: relative;
    display: flex;
    padding: 50px 64px;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    border-radius: 20px;
    background: var(--Neutral-100, #F2F2F2);
    box-shadow: 0 40px 30px 0 rgba(0, 0, 0, 0.25);
    max-width: 80%;
    width: 100%;
    max-width: 600px;
  `,

  Header: styled.img`
    position: absolute;
    top: 20px;
    right: 20px;
    width: 24px;
    height: 24px;
    cursor: pointer;
  `,

  // 본문 영역
  Content: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 60px;
    align-self: stretch;
  `,

  // 경고 아이콘 + 텍스트 래퍼
  Warning: styled.div`
    display: flex;
    align-items: flex-start;
    gap: 22px;
    align-self: stretch;
  `,

  // 정보/경고 아이콘
  Icon: styled.img`
    display: flex;
    width: 102px;
    height: 102px;
    padding: 25.191px 7.931px 15.504px 7.931px;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1/1;
    
  `,

  // 텍스트 래퍼
  Context: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  `,

  MainTitle: styled.h2`
    color: #000;
    font-family: Pretendard;
    font-size: 40px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    margin-bottom: 0px;
  `,

  Subtitle: styled.p`
    color: var(--Neutral-500, #4D4D4D);
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%;
  `,

  // 버튼 영역
  Button: styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 32px;
    align-self: stretch;
  `,

  LeftButton: styled.button`
    display: flex;
    width: 442px;
    padding: 20px 100px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    color: var(--Neutral-100, #F2F2F2);
    text-align: center;
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    border-radius: 20px;
    background: var(--Neutral-300, #BFBFBF);
    line-height: normal;
    border: 1px solid rgba(242, 242,242); 
    cursor: pointer;
  `,

  RightButton: styled.button`
    display: flex;
    width: 272px;
    padding: 20px 5px;
    flex-direction: column;
    border: 1px solid rgba(242, 242,242); 
    justify-content: center;
    align-items: center;
    gap: 10px;
    color: var(--Neutral-100, #F2F2F2);
    border-radius: 20px;
    background: #E13030;
    text-align: center;
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    cursor: pointer;
  `,
};

export default M;