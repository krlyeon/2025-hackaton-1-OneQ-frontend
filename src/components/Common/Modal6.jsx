import M from "../Common/Modal2.styles.js";
import Cancel from "../../assets/Modal/cancel.svg";
import Warning from "../../assets/Modal/warning2.svg";

export default function Modal6({ onClose, onConfirm }) {
    return (
        <M.Modal>
            <M.ModalContainer>
                <M.Header 
                    src={Cancel} 
                    alt="Cancel Icon"
                    onClick={onClose}
                    style={{ cursor: 'pointer' }}
                />
                <M.Content>
                    <M.Warning>
                        <M.Icon src={Warning} alt="Warning Icon"/>
                        <M.Context>
                            <M.MainTitle>등록하시겠습니까?</M.MainTitle>
                            <M.Subtitle>사업자등록증 심의 후 등록이 최종 완료됩니다. (최대 3일 소요)</M.Subtitle>
                        </M.Context>
                    </M.Warning>

                    <M.Button>
                        <M.LeftButton onClick={onClose}>계속 작성</M.LeftButton>
                        <M.RightButton onClick={onConfirm}>저장 및 이동   →</M.RightButton>
                    </M.Button>
                </M.Content>
            </M.ModalContainer>
        </M.Modal>
        

    );
}