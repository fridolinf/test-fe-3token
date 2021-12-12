import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
	Form,
	Input,
	Button,
	DatePicker,
	InputNumber,
	Upload,
	message,
	Checkbox,
} from 'antd';

const FormData = (onConfirm) => {
	const [loading, setloading] = useState(false);
	const [componentSize, setComponentSize] = useState('default');
	const [picture, setPicture] = useState('');
	const dummyRequest = ({ file, onSuccess }) => {
		setTimeout(() => {
			onSuccess('ok');
		}, 0);
	};

	const getBase64 = (img, callback) => {
		const reader = new FileReader();
		reader.addEventListener('load', () => callback(reader.result));
		reader.readAsDataURL(img);
		return false;
	};

	const handleChangeImage = async (info) => {
		if (info.file.status === 'uploading') {
			this.setState({ loading: true });
			return;
		}
		if (info.file.status === 'done') {
			await getBase64(info.file.originFileObj, (imageUrl) => {
				this.setState({ loading: false, imageUrl1: imageUrl });
			});
		}
	};

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

	const uploadButton = (
		<div>
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);

	return (
		<Form
			onFinish={onConfirm}
			labelCol={{
				span: 4,
			}}
			wrapperCol={{
				span: 14,
			}}
			layout='horizontal'
			size={componentSize}
		>
			<Form.Item label='Name'>
				<Input type='text' />
			</Form.Item>
			<Form.Item label='qty'>
				<InputNumber type='number' />
			</Form.Item>
			<Form.Item label='picture'>
				<Upload
					listType='picture-card'
					className='avatar-uploader'
					showUploadList={false}
					beforeUpload={beforeUpload}
					onChange={handleChangeImage}
					customRequest={dummyRequest}
				>
					{picture ? (
						<img
							src={picture}
							alt='avatar'
							style={{ maxWidth: '100%', maxHeight: '100%' }}
						/>
					) : (
						uploadButton
					)}
				</Upload>
			</Form.Item>
			<Form.Item label='ExpiredAt'>
				<DatePicker />
			</Form.Item>
			<Form.Item label='isActive' valuePropName='checked'>
				<Checkbox />
			</Form.Item>
			<Button
				type='primary'
				htmlType='submit'
				className='mr-3'
				size='large'
				shape='round'
			>
				Submit
			</Button>
			<Button htmlType='button' size='large' shape='round' onClick={onclose}>
				Cancel
			</Button>
		</Form>
	);
};
export default FormData;
