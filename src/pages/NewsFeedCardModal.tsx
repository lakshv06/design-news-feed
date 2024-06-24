import { ReactElement, CSSProperties } from "react";
import { NewsFeedCardModalProps } from '../interface/global.interfaces';

function NewsFeedCardModal(props: NewsFeedCardModalProps): ReactElement {
    const { NewsFeedCardModalData, setShowMore } = props;

    const modalStyles: CSSProperties = {
        display: 'block', // Show the modal
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1050, // High z-index to ensure it overlays everything
        backgroundColor: 'white',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        borderRadius: '8px',
    };

    const backdropStyles: CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1040,
    };

    return (
        <div>
            <div style={backdropStyles} onClick={() => setShowMore(false)}></div>
            <div style={modalStyles}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{NewsFeedCardModalData.title}</h5>
                        <button
                            type="button"
                            className="close"
                            aria-label="Close"
                            onClick={() => setShowMore(false)}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>{NewsFeedCardModalData.content}</p>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setShowMore(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsFeedCardModal;
