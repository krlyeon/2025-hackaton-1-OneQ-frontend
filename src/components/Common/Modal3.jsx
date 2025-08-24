import M from "../Common/Modal3.styles.js";
import Cancel from "../../assets/Modal/cancel.svg";
import Warning from "../../assets/Modal/warning3.svg";

const Modal3 = ({ onClose, onConfirm }) => {
    return (
        <M.Modal>
            <M.ModalContainer>
                <M.Header src={Cancel} alt="Cancel Icon" onClick={onClose} style={{ cursor: 'pointer' }} />
                <M.Content>
                    <M.Warning>
                        <M.Icon src={Warning} alt="Warning Icon" />
                        <M.Context>
                            <M.MainTitle>등록을 취소하시겠습니까?</M.MainTitle>
                            <M.Subtitle>입력한 내용은 저장되지 않습니다.</M.Subtitle>
                        </M.Context>
                    </M.Warning>

                    <M.Button>
                        <M.LeftButton onClick={onClose}>계속 작성</M.LeftButton>
                        <M.RightButton onClick={onConfirm}>등록 취소</M.RightButton>
                    </M.Button>
                </M.Content>
            </M.ModalContainer>
        </M.Modal>
    );
};

export default Modal3;