import React from "react";
import * as L from "./PrintshopList.styles";
import searchIcon from "../../assets/Printshop/search.png";
import arrowLeft from "../../assets/Printshop/arrow-left-printshop.png";
import arrowRight from "../../assets/Printshop/arrow-right-printshop.png";

const PrintshopList = () => {
  return (
    <L.Container>
      <L.InnerWrapper>
        {/* 헤더 영역 */}
        <L.HeaderRow>
          <L.Title>인쇄소 목록</L.Title>
          <L.SearchBox>
            <L.SearchInner>
              <L.SearchText>인쇄소 검색하기</L.SearchText>
              <L.SearchIcon src={searchIcon} alt="검색" />
            </L.SearchInner>
          </L.SearchBox>
        </L.HeaderRow>

        <L.SubText>
          사장님이 등록한 인쇄소 정보를 여기서 찾아 수정하실 수 있어요.
        </L.SubText>

        {/* 테이블 영역 */}
        <L.TableWrapper>
          {/* 헤더 */}
          <L.TableHeader>
            <L.LineDark />
            <L.TableHeadRow>
              <L.HeadCellNo>No</L.HeadCellNo>
              <L.HeadCellName>인쇄소명</L.HeadCellName>
              <L.HeadCellDate>등록일</L.HeadCellDate>
              <L.HeadCellDate>최근 수정일</L.HeadCellDate>
            </L.TableHeadRow>
            <L.LineLight />
          </L.TableHeader>

            {/* 테이블 바디 */}
          <L.TableBody>
            <L.TableRow>
              <L.CellNo>01</L.CellNo>
              <L.CellName>원큐 인쇄소</L.CellName>
              <L.CellDate>2024.01.01</L.CellDate>
              <L.CellDate>2025.05.01</L.CellDate>
              <L.EditButton>수정하기</L.EditButton>
            </L.TableRow>

            <L.TableRow>
              <L.CellNo>02</L.CellNo>
              <L.CellName>아름다운 인쇄소</L.CellName>
              <L.CellDate>2024.01.01</L.CellDate>
              <L.CellDate>2025.05.01</L.CellDate>
              <L.EditButton>수정하기</L.EditButton>
            </L.TableRow>
          </L.TableBody>
        </L.TableWrapper>

        {/* 페이지네이션 */}
        <L.Pagination>
          <img src={arrowLeft} alt="이전" />
          <L.PageNumbers>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </L.PageNumbers>
          <img src={arrowRight} alt="다음" />
        </L.Pagination>
      </L.InnerWrapper>
    </L.Container>
  );
};

export default PrintshopList;
