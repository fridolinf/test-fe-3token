import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
	Modal,
	Button,
	Form,
	Input,
	DatePicker,
	InputNumber,
	Upload,
	message,
	Checkbox,
	Row,
	Col,
	List,
} from 'antd';
import { addData } from '../redux/actions/action';
import { useDispatch } from 'react-redux';

const ModalEdit = () => {
	const [openEdit, setopenEdit] = useState(false);
	const dispatch = useDispatch();
	const [loading, setloading] = useState(false);
	const [pictureUrl, setPictureUrl] = useState('');
	const dummyRequest = ({ file, onSuccess }) => {
		setTimeout(() => {
			onSuccess('ok');
		}, 0);
	};

	const open = () => {
		setopenEdit(true);
	};

	const close = () => {
		setopenEdit(false);
	};

	//getBase64
	const getBase64 = (img, callback) => {
		const reader = new FileReader();
		reader.addEventListener('load', () => callback(reader.result));
		reader.readAsDataURL(img);
		return false;
	};

	// Handle image 1
	const handleChangeImage = async (info) => {
		if (info.file.status === 'uploading') {
			setloading(true);
			return;
		}
		if (info.file.status === 'done') {
			await getBase64(info.file.originFileObj, (imageUrl) => {
				// this.setState({ loading: false, imageUrl1: imageUrl });
				setloading(false);
				setPictureUrl(imageUrl);
			});
		}
	};

	//beforeUpload
	const beforeUpload = (file) => {
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
		if (!isJpgOrPng) {
			message.error('Hanya bisa upload file jpg/jpeg/png!');
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error('Gambar tidak bisa lebih dari 2MB!');
		}
		return isJpgOrPng && isLt2M;
	};

	//Button Upload
	const uploadButton = (
		<div>
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);

	// Edit Data
	const submitEdit = (value) => {
		let data = {
			name: value.name,
			qty: value.qty,
			picture: pictureUrl,
			expiredAt: value.expiredAt,
			isActive: value.isActive,
		};
		setopenEdit(false);
		dispatch(addData(data));
	};

	return <></>;
};
export default ModalEdit;
