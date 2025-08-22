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

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  color: var(--Neutral-600, #1a1a1a);
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  line-height: 140%;
  padding: 0;
  margin: 0;
  width: 100%;
  padding-right: 10px;

  &::placeholder {
    color: var(--Neutral-400, #808080);
  }
`;

export const ClearButton = styled.button`
  background: none;
  border: none;
  color: var(--Neutral-400, #808080);
  cursor: pointer;
  font-size: 20px;
  line-height: 1;
  padding: 0 5px;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
  
  &:hover {
    color: var(--Neutral-600, #1a1a1a);
  }
`;

export const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
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
  width: 100%;
  box-sizing: border-box;
`;

export const CellNo = styled.div`
  display: flex;
  width: 60px;
  padding: 16px 10px;
  justify-content: center;
  align-items: center;
  color: var(--Neutral-600, #1a1a1a);
  font-size: 18px;
  font-weight: 500;
  box-sizing: border-box;
`;

export const CellName = styled.div`
  display: flex;
  width: 330px;
  padding: 16px 30px;
  align-items: center;
  color: var(--Neutral-600, #1a1a1a);
  font-size: 18px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
`;

export const CellDate = styled.div`
  display: flex;
  width: 300px;
  padding: 16px 20px;
  align-items: center;
  color: var(--Neutral-400, #808080);
  font-size: 18px;
  font-weight: 500;
  box-sizing: border-box;
`;

export const CellDate2 = styled.div`
  display: flex;
  width: 300px;
  padding: 16px 90px;
  align-items: center;
  color: var(--Neutral-400, #808080);
  font-size: 18px;
  font-weight: 500;
  box-sizing: border-box;
`;

export const EditButton = styled.button`
  display: flex;
  padding: 10px 15px;
  margin-left: auto;
  margin-right: 20px;
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
  flex-shrink: 0;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
  width: 100%;
`;

export const PageButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: var(--Neutral-200, #d9d9d9);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const PageNumbers = styled.div`
  display: flex;
  gap: 4px;
`;

export const PageNumber = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${props => props.active ? 'var(--Neutral-600, #1a1a1a)' : 'transparent'};
  color: ${props => props.active ? 'white' : 'var(--Neutral-600, #1a1a1a)'};

  &:hover {
    background-color: ${props => props.active ? 'var(--Neutral-600, #1a1a1a)' : 'var(--Neutral-200, #d9d9d9)'};
  }
`;
