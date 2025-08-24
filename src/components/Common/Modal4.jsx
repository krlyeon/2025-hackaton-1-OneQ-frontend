import { useNavigate } from "react-router-dom";
import M from "../Common/Modal3.styles.js";
import Cancel from "../../assets/Modal/cancel.svg";
import Warning from "../../assets/Modal/warning3.svg";

export default function Modal4({ onClose, onConfirm }) {
    const navigate = useNavigate();

    const handleClose = () => {
        if (onClose) onClose();
    };

    const handleCancel = () => {
        navigate("/printshopPage");
    };

    return (
        <M.Modal>
            <M.ModalContainer>
                <M.Header 
                    src={Cancel} 
                    alt="Cancel Icon"
                    onClick={handleClose}
                    style={{ cursor: 'pointer' }}
                />
                <M.Content>
                    <M.Warning>
                        <M.Icon 
                            src={Warning} 
                            alt="Warning Icon"
                            onClick={handleClose}
                            style={{ cursor: 'pointer' }}
                        />
                        <M.Context>
                            <M.MainTitle>수정을 취소하시겠습니까??</M.MainTitle>
                            <M.Subtitle>수정한 내용은 반영되지 않습니다.</M.Subtitle>
                        </M.Context>
                    </M.Warning>

                    <M.Button>
                        <M.LeftButton onClick={handleClose}>계속 작성</M.LeftButton>
                        <M.RightButton onClick={handleCancel}>수정 취소</M.RightButton>
                    </M.Button>
                </M.Content>
            </M.ModalContainer>
        </M.Modal>
    );
}