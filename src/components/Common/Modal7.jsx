import M from "../Common/Modal2.styles.js";
import Cancel from "../../assets/Modal/cancel.svg";
import Warning from "../../assets/Modal/warning2.svg";

export default function Modal7({ onClose, onConfirm }) {
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
                        <M.Icon 
                            src={Warning} 
                            alt="Warning Icon"
                            onClick={onClose}
                            style={{ cursor: 'pointer' }}
                        />
                        <M.Context>
                            <M.MainTitle>저장하시겠습니까?</M.MainTitle>
                            <M.Subtitle>수정하신 인쇄소 정보가 반영됩니다. 반영까지 며칠 소요될 수 있습니다.</M.Subtitle>
                        </M.Context>
                    </M.Warning>

                    <M.Button>
                        <M.LeftButton onClick={onClose}>계속 수정</M.LeftButton>
                        <M.RightButton onClick={onConfirm}>저장 및 이동 →</M.RightButton>
                    </M.Button>
                </M.Content>
            </M.ModalContainer>
        </M.Modal>
    );
}