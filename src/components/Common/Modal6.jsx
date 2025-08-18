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
                        <M.MainTitle>등록하시겠습니까?</M.MainTitle>
                        <M.Subtitle>입력하신 인쇄소 정보가 등록됩니다. 등록까지 며칠 소요될 수 있습니다.</M.Subtitle>
                    </M.Context>
                </M.Warning>

                <M.Button>
                    <M.LeftButton>계속 작성</M.LeftButton>
                    <M.RightButton>저장 및 이동   →</M.RightButton>
                </M.Button>
            </M.Content>
        </M.ModalContainer>
        </M.Modal>
        

    );
}