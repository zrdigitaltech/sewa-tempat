'use client';
import { Fragment, useEffect } from 'react';
const Index = (props) => {
  const {
    show,
    onClose,
    modalBody,
    modalFooter,
    title,
    onCloseBackDrop,
    classModalContent,
    classModalBody,
    modalBackdrop,
    scrolls,
    styleModalContent,
    position = 'center',
    modalDialog,
    classModalHeader,
    additionalInformation,
    styleModal,
    styleModalBackdrop
  } = props;

  if (!show) return null;

  return (
    <Fragment>
      <div
        id={'myModal'}
        tabIndex="-1"
        role="dialog"
        className={`modal fade show`}
        style={{ display: 'block', ...styleModal }}
      >
        <div
          className={`modal-dialog ${
            position === 'top' ? 'modal-top' : 'modal-dialog-centered'
          } ${modalDialog}`}
          role="document"
        >
          <div className={`modal-content ${classModalContent || ''}`} style={styleModalContent}>
            {title && (
              <div className={`modal-header ${classModalHeader || ''}`}>
                <h5 className="modal-title text-truncate" title={title}>
                  {title}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={onClose} // Close modal
                ></button>
              </div>
            )}
            <div className={`modal-body ${classModalBody || ''}`}>{modalBody}</div>
            {additionalInformation}
            {modalFooter && (
              <center>
                <div className="modal-footer center">{modalFooter}</div>
              </center>
            )}
          </div>
        </div>
      </div>
      {modalBackdrop === false ? (
        modalBackdrop
      ) : (
        <div
          className="modal-backdrop fade show"
          onClick={onCloseBackDrop}
          style={styleModalBackdrop}
        ></div>
      )}
    </Fragment>
  );
};

export default Index;
