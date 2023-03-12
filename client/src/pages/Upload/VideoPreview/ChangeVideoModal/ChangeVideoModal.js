import Modal from '~/components/modals/Modal';
import { Wrapper } from './styled';

export default function ChangeVideoModal({ onChangeVideo, onCancel }) {
    return (
        <Modal>
            <Wrapper>
                <div className="header">
                    <h2 className="header-title">Replace this video?</h2>
                    <p className="header-desc">
                        Video captions and settings will still be saved.
                    </p>
                </div>
                <div
                    className="discard-btn"
                    onClick={() => {
                        onChangeVideo();
                        onCancel();
                    }}
                >
                    Replace
                </div>
                <div className="cancel-btn" onClick={onCancel}>
                    Continue editing
                </div>
            </Wrapper>
        </Modal>
    );
}
