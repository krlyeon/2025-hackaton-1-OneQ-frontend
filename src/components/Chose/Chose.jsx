// Components/Chose/Chose.jsx
import React, { useRef, useState } from "react";
import S from "./Chose.styles";

import checkIcon from "../../assets/check.png";

import imgSticker from "../../assets/img-sticker.png";
import imgPoster from "../../assets/img-poster.png";
import imgCard from "../../assets/img-card.png";
import imgBrochure from "../../assets/img-brochure.png";
import imgBanner from "../../assets/img-banner.png";
import imgBanner2 from "../../assets/img-banner2.png";
import imgBooklet from "../../assets/img-booklet.png";

// Checked versions
import imgStickerChecked from "../../assets/img-sticker-checked.png";
import imgPosterChecked from "../../assets/img-poster-checked.png";
import imgCardChecked from "../../assets/img-card-checked.png";
import imgBrochureChecked from "../../assets/img-brochure-checked.png";
import imgBannerChecked from "../../assets/img-banner-checked.png";
import imgBanner2Checked from "../../assets/img-banner2-checked.png";
import imgBookletChecked from "../../assets/img-booklet-checked.png";

const cardData = [
  { id: 1, title: "스티커", img: imgSticker, checkedImg: imgStickerChecked },
  { id: 2, title: "명함", img: imgCard, checkedImg: imgCardChecked },
  { id: 3, title: "포스터", img: imgPoster, checkedImg: imgPosterChecked },
  {
    id: 4,
    title: "브로슈어",
    img: imgBrochure,
    checkedImg: imgBrochureChecked,
  },
  { id: 5, title: "배너", img: imgBanner, checkedImg: imgBannerChecked },
  { id: 6, title: "현수막", img: imgBanner2, checkedImg: imgBanner2Checked },

];

const Chose = () => {
  const scrollRef = useRef(null);
  const scrollbarRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleScroll = () => {
    if (!scrollRef.current || isDragging) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const maxScroll =
      scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
    const scrollPercentage = maxScroll > 0 ? scrollLeft / maxScroll : 0;
    setScrollPosition(scrollPercentage);
  };

  const updateScrollFromPosition = (e) => {
    if (!scrollbarRef.current || !scrollRef.current) return;
    const rect = scrollbarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const maxScroll =
      scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
    scrollRef.current.scrollLeft = percentage * maxScroll;
    setScrollPosition(percentage);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    updateScrollFromPosition(e);

    const handleMouseMove = (e) => {
      updateScrollFromPosition(e);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleSelect = (id) => {
    setSelected(id);
  };

  return (
    <S.Section>
      <S.Content>
        <S.CardArea>
          <S.TitleArea>
            <S.Title>제작할 인쇄물을 선택해주세요.</S.Title>
            <S.SubTitle>선택한 인쇄물 기준으로 견적이 시작됩니다</S.SubTitle>
          </S.TitleArea>
          <S.CardSliderArea>
            <S.CardListWrapper>
              <S.CardList ref={scrollRef} onScroll={handleScroll}>
                {cardData.map((card) => (
                  <S.Card
                    key={card.id}
                    onClick={() => handleSelect(card.id)}
                    style={{
                      backgroundImage: `url(${
                        selected === card.id ? card.checkedImg : card.img
                      })`,
                    }}
                  >
                    <S.CardTitle>{card.title}</S.CardTitle>
                  </S.Card>
                ))}
              </S.CardList>
            </S.CardListWrapper>
          </S.CardSliderArea>
          <S.ScrollbarArea>
            <S.ScrollbarTrack ref={scrollbarRef} onMouseDown={handleMouseDown}>
              <S.ScrollbarThumb
                style={{
                  left: `${12 + scrollPosition * (1176 - 24 - 168)}px`,
                }}
              />
            </S.ScrollbarTrack>
          </S.ScrollbarArea>
        </S.CardArea>
        <S.ButtonArea>
          <S.StartButton disabled={!selected}>
            시작하기
          </S.StartButton>
        </S.ButtonArea>
      </S.Content>
    </S.Section>
  );
};

export default Chose;
