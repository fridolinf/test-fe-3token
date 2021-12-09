import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Image, Space, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { delData, getData, changeIsActive } from '../redux/actions/action';
import Modals from './Modals';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
	Modal,
	Form,
	Input,
	DatePicker,
	InputNumber,
	Upload,
	message,
	Row,
	List,
} from 'antd';
import ModalConfirm from './ModalConfirm';

const TableData = () => {
	const { data, Isloading } = useSelector((state) => state.dataReducers);
	const [openEdit, setopenEdit] = useState(false);
	const [loading, setloading] = useState(false);
	const [isDelete, setIsDelete] = useState({
		show: false,
		id: null,
	});
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getData());
	}, [dispatch]);
	const [pictureUrl, setPictureUrl] = useState('');
	const dummyRequest = ({ file, onSuccess }) => {
		setTimeout(() => {
			onSuccess('ok');
		}, 0);
	};

	const open = () => {
		setopenEdit(true);
	};

	//  Delete
	const deleteTask = (id) => {
		// const {id} = isId;
		dispatch(delData(id));
		setIsDelete({
			show: false,
			id: null,
		});
	};

	const openConfirm = (id) => {
		setIsDelete({ show: true, id });
	};

	const closeConfirmModal = () => {
		setIsDelete({
			show: false,
			id: null,
		});
	};
	const changeIsActive = () => {
		dispatch(changeIsActive());
	};

	const columns = [
		{
			title: 'id',
			dataIndex: 'id',
			key: 'id',
			render: (text) => <a>{text}</a>,
			responsive: ['md'],
		},
		{
			title: 'name',
			dataIndex: 'name',
			key: 'name',
			responsive: ['md'],
		},
		{
			title: 'qty',
			dataIndex: 'qty',
			key: 'qty',
			responsive: ['lg'],
		},
		{
			title: 'picture',
			dataIndex: 'picture',
			key: 'picture',
			render: (picture) => (
				<Image width={50} src={picture} alt={'picture'}></Image>
			),
			responsive: ['md'],
		},
		{
			title: 'expiredAt',
			dataIndex: 'expiredAt',
			key: 'expiredAt',
			// render: (text) => moment(text).format('LLLL'),
			// sorter: (a, b) => sorter(a.dateCreated, b.dateCreated),
			sortDirections: ['descend', 'ascend'],
			responsive: ['md'],
		},
		{
			title: 'isActive',
			dataIndex: 'isActive',
			key: 'isActive',
			responsive: ['sm'],
			render: (countInStock) => (
				<>
					{countInStock !== false ? (
						<Checkbox checked={true} onChange={() => changeIsActive()} />
					) : (
						<Checkbox checked={false} disabled />
					)}
				</>
			),
		},
		{
			title: 'Action',
			key: 'action',
			responsive: ['md'],
			render: (text, record) => (
				<Space size='middle'>
					<Button onClick={open}>Edit</Button>
					<Button
						onClick={(e) => {
							e.stopPropagation();
							openConfirm(record.id);
						}}
					>
						Delete
					</Button>
				</Space>
			),
		},
	];

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
			{Isloading ? <LoadingOutlined /> : <PlusOutlined />}
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
		// dispatch(addData(data));
	};

	return (
		<div>
			{/* <Button>Tambah Data</Button> */}
			<ModalConfirm
				openIsDelete={isDelete}
				closed={closeConfirmModal}
				deleted={deleteTask}
			/>
			<Modal
				closable={false}
				width='50vw'
				title='Edit Data'
				centered
				visible={openEdit}
				footer={null}
			>
				<Row type='flex' justify='center' style={{ minHeight: '50vh' }}>
					<Form
						onFinish={submitEdit}
						labelCol={{
							span: 4,
						}}
						wrapperCol={{
							span: 14,
						}}
						autoComplete='off'
						// initialValues={{
						// 	name: data.name,
						// 	qty: data.qty,
						// 	picture: data.picture,
						// 	expiredAt: data.expiredAt,
						// 	isActive: data.isActive,
						// }}
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
							<Form.Item name='picture'>
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
							<Form.Item name='isActive' valuePropName='checked'>
								<Checkbox />
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
			<Modals />
			<Table key={data.id} columns={columns} dataSource={data} />
		</div>
	);
};

export default TableData;
