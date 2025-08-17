import styled from "styled-components";

const S = {
  // 전체 섹션을 담는 컨테이너
  Container: styled.section`
    display: flex;
    min-height: 100vh;
    background-color: #f7f7f7;
    padding: 5%;
    box-sizing: border-box;
    gap: 70px;
  `,

  // 왼쪽 (고정) 섹션
  LeftSection: styled.div`
    flex: 1; /* 남은 공간 모두 차지 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-right: 120px;
    position: sticky;
    top: 0;
    height: 100vh;
    align-self: flex-start;
  `,

  // 오른쪽 (스크롤) 섹션
  RightSection: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    overflow-x: hidden;
    gap: 20px;
    max-height: 630px;
    position: relative;

    /* 스크롤바 숨기기 */
  scrollbar-width: none;  /* Firefox */
  -ms-overflow-style: none; /* IE, Edge */
  
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  `,
  
  // 개별 카드 스타일
  LeftCard: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 220px;
    position: absolute;
  `,
  
  RightCard: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 220px;
    position: absolute;
    top: 200px;
    
  `,

  // 이미지 스타일
  CardImage: styled.img`
    width: 60%; /* 컨테이너의 절반 크기로 설정 */
    height: auto;
  `,

  Title: styled.div`
    color: var(--Neutral-600, #1A1A1A);
    font-family: Pretendard;
    font-size: 38px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
    margin-bottom:10px;
  `,

  Subtitle: styled.div`
    color: var(--Neutral-400, #808080);
    /* Body/Large1 */
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%;
    margin-bottom:50px;
  `,
  
  Button: styled.button`
    display: flex;
    padding: 20px 100px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    border-radius: 20px;
    background: var(--Primary-500, #06F);
    color: var(--Neutral-100, #F2F2F2);
     border: 2px solid #06F; 
    text-align: center;
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    cursor: pointer;
  `,
};

export default S;