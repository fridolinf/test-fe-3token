import { Modal } from 'antd';
import React from 'react';

// eslint-disable-next-line react/prop-types
const ModalConfirm = ({ openIsDelete, closed, deleted }) => {
	if (openIsDelete.show && openIsDelete.id) {
		return (
			<Modal
				centered
				visible={openIsDelete}
				closable={false}
				onCancel={closed}
				onOk={() => deleted(openIsDelete.id)}
			>
				<p style={{ textAlign: 'center' }}>Anda yakin? data akan di hapus.</p>
			</Modal>
		);
	} else {
		return null;
	}
};

export default ModalConfirm;
