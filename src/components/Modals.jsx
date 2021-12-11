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
	List,
} from 'antd';
import { addData } from '../redux/actions/action';
import { useDispatch } from 'react-redux';

const Modals = () => {
	const [openModal, setopenModal] = useState(false);
	const dispatch = useDispatch();
	const [loading, setloading] = useState(false);
	const [pictureUrl, setPictureUrl] = useState('');
	const dummyRequest = ({ file, onSuccess }) => {
		setTimeout(() => {
			onSuccess('ok');
		}, 0);
	};
	const [form] = Form.useForm();

	const open = () => {
		form.setFieldsValue({
			picture: setPictureUrl(),
			isActive: true,
		});
		setopenModal(true);
	};

	const close = () => {
		form.resetFields();
		setopenModal(false);
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

	// Tambah Data
	const submit = (value) => {
		let data = {
			name: value.name,
			qty: value.qty,
			picture: pictureUrl,
			expiredAt: value.expiredAt,
			isActive: value.isActive,
		};
		dispatch(addData(data));
		form.resetFields();
		setopenModal(false);
	};

	return (
		<>
			<Button type='primary' onClick={open}>
				Tambah Data
			</Button>
			<Modal
				forceRender
				destroyOnClose={true}
				closable={false}
				width='50vw'
				title='Add Data'
				centered
				visible={openModal}
				footer={null}
			>
				<Row type='flex' justify='center' style={{ minHeight: '50vh' }}>
					<Form
						form={form}
						onFinish={submit}
						labelCol={{
							span: 4,
						}}
						wrapperCol={{
							span: 14,
						}}
						autoComplete='off'
					>
						<List
							header={<div>Name</div>}
							size='default'
							style={{ backgroundColor: '#ffffff' }}
						>
							<Form.Item name='name'>
								<Input type='text' />
							</Form.Item>
						</List>
						<List
							header={<div>qty</div>}
							size='default'
							style={{ backgroundColor: '#ffffff' }}
						>
							<Form.Item name='qty'>
								<InputNumber type='number' />
							</Form.Item>
						</List>
						<List
							header={<div>picture</div>}
							size='default'
							style={{ backgroundColor: '#ffffff' }}
						>
							<Form.Item name='picture' valuePropName=' fileList'>
								<Upload
									listType='picture-card'
									className='avatar-uploader'
									showUploadList={false}
									beforeUpload={beforeUpload}
									onChange={handleChangeImage}
									customRequest={dummyRequest}
								>
									{pictureUrl ? (
										<img
											src={pictureUrl}
											alt='avatar'
											style={{ maxWidth: '100%', maxHeight: '100%' }}
										/>
									) : (
										uploadButton
									)}
								</Upload>
							</Form.Item>
						</List>
						<List
							header={<div>ExpiredAt</div>}
							size='default'
							style={{ backgroundColor: '#ffffff' }}
						>
							<Form.Item name='expiredAt'>
								<DatePicker />
							</Form.Item>
						</List>
						<List
							header={<div>isActive</div>}
							size='default'
							style={{ backgroundColor: '#ffffff' }}
						>
							<Form.Item name='isActive'>
								<Checkbox checked={true} disabled={true} />
							</Form.Item>
						</List>
						<Button
							type='primary'
							style={{ marginRight: '10px' }}
							htmlType='submit'
							size='large'
							shape='round'
						>
							Submit
						</Button>
						<Button
							htmlType='button'
							size='large'
							shape='round'
							onClick={close}
						>
							Cancel
						</Button>
					</Form>
				</Row>
			</Modal>
		</>
	);
};
export default Modals;
