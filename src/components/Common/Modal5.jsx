import M from "../Common/Modal3.styles.js";
import Cancel from "../../assets/Modal/cancel.svg";
import Warning from "../../assets/Modal/warning3.svg";

export default function Modal1() {
    return (
        <M.Modal>
            <M.ModalContainer>
            <M.Header src={Cancel} alt="Cancel Icon"/>
            <M.Content>
                <M.Warning>
                    <M.Icon src={Warning} alt="Warning Icon"/>
                    <M.Context>
                        <M.MainTitle>등록된 정보를 삭제하시겠습니까?</M.MainTitle>
                        <M.Subtitle>삭제한 내용은 되돌릴 수 없습니다.</M.Subtitle>
                    </M.Context>
                </M.Warning>

                <M.Button>
                    <M.LeftButton>삭제 취소</M.LeftButton>
                    <M.RightButton>정보 삭제</M.RightButton>
                </M.Button>
            </M.Content>
        </M.ModalContainer>
        </M.Modal>
        

    );
}