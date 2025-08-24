import React, { useState, useEffect } from "react";
import * as L from "./PrintshopList.styles";
import searchIcon from "../../assets/Printshop/search.png";
import arrowLeft from "../../assets/Printshop/arrow-left-printshop.png";
import arrowRight from "../../assets/Printshop/arrow-right-printshop.png";
import Modal from "./modal";
import useModal from "../../hooks/useModal";

const PrintshopList = () => {
  const [printshops, setPrintshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPrintshop, setSelectedPrintshop] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 7; // 한 페이지당 표시할 항목 수
  const { isOpen, openModal, closeModal } = useModal();
  
  // 검색어 입력 핸들러
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  
  // 검색 실행 (엔터 또는 검색 버튼 클릭 시)
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setCurrentPage(1); // 검색 시 첫 페이지로 리셋
  };

  useEffect(() => {
    const fetchPrintshops = async () => {
      try {
        setLoading(true);
        const url = `${import.meta.env.VITE_API_BASE}printshops/${searchQuery ? `search/?q=${encodeURIComponent(searchQuery)}` : ''}`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setPrintshops(data.printshops || []);
      } catch (err) {
        setError("인쇄소 목록을 불러오는 중 오류가 발생했습니다.");
        console.error("Error fetching printshops:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrintshops();
  }, [searchQuery]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\. /g, '.').replace(/\.$/, '');
  };

  // 검색어로 필터링된 인쇄소 목록
  const filteredPrintshops = printshops.filter(printshop => 
    printshop.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // 검색 초기화
  const handleClearSearch = () => {
    setSearchInput("");
    setSearchQuery("");
    setCurrentPage(1);
  };

  // 현재 페이지에 표시할 항목 계산 (필터링된 목록 기준)
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPrintshops.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPrintshops.length / itemsPerPage);

  // 페이지 번호 클릭 핸들러
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 이전 페이지로 이동
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 다음 페이지로 이동
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // 페이지 번호 생성
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageButtons = 5; // 한 번에 보여줄 페이지 버튼 수
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
    
    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <L.PageNumber 
          key={i} 
          active={i === currentPage}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </L.PageNumber>
      );
    }

    return pageNumbers;
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <L.Container>
      <L.InnerWrapper>
        {/* 헤더 영역 */}
        <L.HeaderRow>
          <L.Title>인쇄소 목록</L.Title>
          <L.SearchBox>
            <L.SearchInner as="form" onSubmit={handleSearch}>
              <L.SearchInput 
                name="search"
                placeholder="인쇄소 검색하기"
                value={searchInput}
                onChange={handleSearchInputChange}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
              />
              {searchQuery && (
                <L.ClearButton type="button" onClick={handleClearSearch}>
                  ×
                </L.ClearButton>
              )}
              <L.SearchButton type="submit">
                <L.SearchIcon src={searchIcon} alt="검색" />
              </L.SearchButton>
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
            {currentItems.length > 0 ? (
              currentItems.map((printshop, index) => (
                <L.TableRow key={printshop.id}>
                  <L.CellNo>{indexOfFirstItem + index + 1}</L.CellNo>
                  <L.CellName>{printshop.name}</L.CellName>
                  <L.CellDate>{formatDate(printshop.created_at)}</L.CellDate>
                  <L.CellDate2>{printshop.updated_at ? formatDate(printshop.updated_at) : '-'}</L.CellDate2>
                  <L.EditButton 
                    onClick={() => {
                      setSelectedPrintshop(printshop);
                      setIsModalOpen(true);
                    }}
                  >
                    수정하기
                  </L.EditButton>
                </L.TableRow>
              ))
            ) : (
              <L.TableRow>
                <L.CellNo colSpan="5" style={{ textAlign: 'center', padding: '50px', justifyContent: 'center', alignItems: 'center', whiteSpace: 'nowrap', marginLeft: '510px' }}>
                  검색 결과가 없습니다.
                </L.CellNo>
              </L.TableRow>
            )}
          </L.TableBody>
        </L.TableWrapper>

        {/* 페이지네이션 */}
        {totalPages > 0 && (
          <L.Pagination>
            <L.PageButton 
              onClick={goToPrevPage} 
              disabled={currentPage === 1}
            >
              <img src={arrowLeft} alt="이전" />
            </L.PageButton>
            <L.PageNumbers>
              {renderPageNumbers()}
            </L.PageNumbers>
            <L.PageButton 
              onClick={goToNextPage} 
              disabled={currentPage === totalPages}
            >
              <img src={arrowRight} alt="다음" />
            </L.PageButton>
          </L.Pagination>
        )}
      </L.InnerWrapper>
      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        printshop={selectedPrintshop}
      />
    </L.Container>
  );
};

export default PrintshopList;
