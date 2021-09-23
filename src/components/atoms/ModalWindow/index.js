import React from 'react';
import {Button} from '@gisatcz/ptr-atoms';
import Modal from 'react-modal';

import './style.scss';

const ModalWindow = ({isOpen, onClose, title, children}) => {
	return (
		<Modal
			isOpen={isOpen}
			onAfterOpen={() => {}}
			className="ptr-Modal"
			overlayClassName="ptr-ModalOverlay ptr-light"
		>
			<div className="ptr-Modal-header">
				<div className="ptr-Modal-title">{title}</div>
				<Button
					onClick={onClose}
					invisible
					icon="close"
					className="ptr-Modal-closeButton"
				/>
			</div>
			<div className="ptr-Modal-content">{children}</div>
		</Modal>
	);
};

export default ModalWindow;
