import M from "../Common/Modal2.styles.js";
import Cancel from "../../assets/Modal/cancel.svg";
import Warning from "../../assets/Modal/warning2.svg";

export default function Modal1() {
    return (
        <M.Modal>
            <M.ModalContainer>
            <M.Header src={Cancel} alt="Cancel Icon"/>
            <M.Content>
                <M.Warning>
                    <M.Icon src={Warning} alt="Warning Icon"/>
                    <M.Context>
                        <M.MainTitle>작성을 다 마치셨나요?</M.MainTitle>
                        <M.Subtitle>지금까지 입력한 내용은 저장되지만,<br />
                        다시 챗봇으로 돌아와 수정할 수는 없습니다.</M.Subtitle>
                    </M.Context>
                </M.Warning>

                <M.Button>
                    <M.LeftButton>견적 계속 작성</M.LeftButton>
                    <M.RightButton>저장 및 이동   →</M.RightButton>
                </M.Button>
            </M.Content>
        </M.ModalContainer>
        </M.Modal>
        

    );
}