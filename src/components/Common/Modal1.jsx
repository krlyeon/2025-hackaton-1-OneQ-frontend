import M from "../Common/Modal1.styles.js";
import Cancel from "../../assets/Modal/cancel.svg";
import Warning from "../../assets/Modal/warning.svg";

export default function Modal1({ onClose, onMove }) {   // ✅ props 추가
  return (
    <M.Modal onClick={onClose}>                         {/* (선택) 바깥 클릭 시 닫기 */}
      <M.ModalContainer onClick={(e) => e.stopPropagation()}>
        <M.Header src={Cancel} alt="Cancel Icon" onClick={onClose} />   {/* ✅ 닫기 */}
        <M.Content>
          <M.Warning>
            <M.Icon src={Warning} alt="Warning Icon" />
            <M.Context>
              <M.MainTitle>견적 작성 중 이동하시겠습니까?</M.MainTitle>
              <M.Subtitle>현재 입력하신 내용이 저장되지 않습니다.</M.Subtitle>
            </M.Context>
          </M.Warning>

          <M.Button>
            <M.LeftButton onClick={onClose}>견적 계속 작성</M.LeftButton>      {/* ✅ 닫기 */}
            <M.RightButton onClick={onMove}>인쇄물 선택으로 이동</M.RightButton> {/* ✅ 이동 */}
          </M.Button>
        </M.Content>
      </M.ModalContainer>
    </M.Modal>
  );
}
