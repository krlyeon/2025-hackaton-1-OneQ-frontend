import styled from "styled-components";

export const Container = styled.div`
  height: 832px;
  align-self: stretch;
  background: var(--Neutral-100, #f2f2f2);
  display: flex;
  justify-content: center;
`;

export const InnerWrapper = styled.div`
  display: flex;
  width: 1101px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  margin-top: 91px;
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 400px;
  align-self: stretch;
`;

export const Title = styled.h1`
  color: var(--Neutral-600, #1a1a1a);
  font-family: Pretendard;
  font-size: 40px;
  font-weight: 800;
  margin: 0;
`;

export const SearchBox = styled.div`
  display: flex;
  padding: 10px 22px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
  border-radius: 20px;
  background: var(--Neutral-200, #d9d9d9);
`;

export const SearchInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

export const SearchText = styled.span`
  width: 295px;
  color: var(--Neutral-400, #808080);
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  line-height: 140%;
`;

export const SearchIcon = styled.img`
  width: 18px;
  height: 18px;
`;

export const SubText = styled.p`
  color: var(--Neutral-400, #808080);
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  margin: 0;
`;

export const TableWrapper = styled.div`
  display: flex;
  width: 1128px;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 22px;
`;

export const TableHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
`;

export const LineDark = styled.div`
  width: 1128px;
  height: 2px;
  background: var(--Neutral-600, #1a1a1a);
`;

export const TableHeadRow = styled.div`
  display: flex;
  padding-left: 7px;
  align-items: flex-start;
`;

export const LineLight = styled.div`
  width: 1128px;
  height: 2px;
  background: var(--Neutral-300, #bfbfbf);
`;

export const HeadCellNo = styled.div`
  display: flex;
  padding: 16px 20px;
  justify-content: center;
  align-items: center;
  color: var(--Neutral-600, #1a1a1a);
  font-size: 18px;
  font-weight: 500;
`;

export const HeadCellName = styled.div`
  display: flex;
  width: 310px;
  padding: 16px 20px;
  align-items: center;
  color: var(--Neutral-600, #1a1a1a);
  font-size: 18px;
  font-weight: 700;
`;

export const HeadCellDate = styled.div`
  display: flex;
  width: 270px;
  padding: 16px 20px;
  color: var(--Neutral-600, #1a1a1a);
  font-size: 18px;
  font-weight: 500;
`;

export const TableBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px 0 4px 10px;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
`;

export const TableRow = styled.div`
  display: flex;
  align-items: center;
`;

export const CellNo = styled.div`
  display: flex;
  padding: 16px 20px;
  justify-content: center;
  align-items: center;
  color: var(--Neutral-600, #1a1a1a);
  font-size: 18px;
  font-weight: 500;
`;

export const CellName = styled.div`
  display: flex;
  width: 310px;
  padding: 16px 20px;
  align-items: center;
  color: var(--Neutral-600, #1a1a1a);
  font-size: 18px;
  font-weight: 500;
`;

export const CellDate = styled.div`
  display: flex;
  width: 270px;
  padding: 16px 20px;
  align-items: center;
  color: var(--Neutral-400, #808080);
  font-size: 18px;
  font-weight: 500;
`;

export const EditButton = styled.button`
  display: flex;
  padding: 10px 15px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  border: 1px solid var(--Neutral-400, #808080);
  background: transparent;
  color: var(--Neutral-400, #808080);
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  white-space: nowrap;
`;

export const Pagination = styled.div`
  display: flex;
  width: 1280px;
  padding: 10px 30px;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

export const PageNumbers = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;


  span {
    color: var(--Neutral-600, #1a1a1a);
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
  }
`;
