import { Modal } from 'antd';
import React from 'react';

const ModalConfirm = ({
	openIsDelete,
	closed,
	deleted,
	openIsEdit,
	edited,
}) => {
	if (openIsDelete.show && openIsDelete.id) {
		return (
			<Modal
				centered
				visible={openIsDelete}
				closable={false}
				onCancel={closed}
				onOk={() => deleted(openIsDelete.id)}
			>
				<p style={{ textAlign: 'center' }}>
					Are you sure? data will be deleted.
				</p>
			</Modal>
		);
	} else if (openIsEdit.show && openIsEdit.id) {
		return (
			<Modal
				centered
				visible={openIsEdit}
				closable={false}
				onCancel={closed}
				onOk={() => edited(openIsEdit.id)}
			>
				<p style={{ textAlign: 'center' }}>
					Are you sure? data will be deleted.
				</p>
			</Modal>
		);
	} else {
		return null;
	}
};

export default ModalConfirm;
