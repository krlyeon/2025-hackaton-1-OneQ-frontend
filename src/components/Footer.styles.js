import styled from 'styled-components';

const F = {
Container: styled.footer`
    background: var(--Neutral-600, #1A1A1A);
    color: #f2f2f2;
    display: flex;
    height: 349px;
    padding: 22px 32px 0px 28px;
    flex-direction: column;
    align-items: flex-start;
    gap: 43px;
    align-self: stretch;

  `,

  CompanyInfoSection: styled.div`
    display: flex;
    padding: 0 4px;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;
  `,

  InfoTitle: styled.h4`
    color: var(--Neutral-100, #F2F2F2);
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  `,

  RealText: styled.h4`
    color: rgba(242, 242, 242, 0.70);
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `,
    InfoText: styled.p`
    display: flex;
    flex-direction: row;
    
  `,

  InfoText: styled.p`
    color: var(--Neutral-100, #F2F2F2);
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 1.8;
    
  `,

  Highlight: styled.span`
    color: rgba(242, 242, 242, 0.70);
  `,

  Space: styled.span`
    margin-left: 15px;
`,


  LogoSection: styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,

  LogoImage: styled.img`
    width: 100px;
  `,

  CopyrightText: styled.p`
    color: rgba(242, 242, 242, 0.70);

    /* Body/Caption */
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `,

};

export default F;