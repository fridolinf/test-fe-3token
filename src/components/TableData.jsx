import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Image, Space, Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { delData, getData, updateData } from '../redux/actions/action';
import Modals from './Modals';
import {
	LoadingOutlined,
	PlusOutlined,
	SearchOutlined,
} from '@ant-design/icons';
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
import moment from 'moment';
import 'moment/locale/id';

const TableData = () => {
	const { data } = useSelector((state) => state.dataReducers);
	const [form] = Form.useForm();
	const sorter = (a, b) =>
		isNaN(a) && isNaN(b) ? (a || '').localeCompare(b || '') : a - b;
	const [pictureUrl, setPictureUrl] = useState('');
	const [openEdit, setopenEdit] = useState(false);
	const [loading, setloading] = useState(false);
	const [isDelete, setIsDelete] = useState({
		show: false,
		id: null,
	});
	const [isEdit, setIsEdit] = useState({
		show: false,
		id: null,
	});
	const [dataEdit, setDataEdit] = useState({});
	const dispatch = useDispatch();
	useEffect(() => {
		setloading(true);
		dispatch(getData());
		setloading(false);
	}, [dispatch]);
	const dummyRequest = ({ file, onSuccess }) => {
		setTimeout(() => {
			onSuccess('ok');
		}, 0);
	};

	const open = (data, id) => {
		setTimeout(() => {
			form.setFieldsValue({
				id: data.id,
				name: data.name,
				qty: data.qty,
				expiredAt: moment(data.expiredAt),
				isActive: data.isActive,
			});
			console.log(data.picture, 'open edit');
		}, 0);
		setopenEdit(true, id);
	};

	const close = (data) => {
		setopenEdit(false);
		console.log(data.picture, 'close edit');
	};

	// Edit Data
	const submitEdit = (value) => {
		let data = {
			id: value.id,
			name: value.name,
			qty: value.qty,
			picture: pictureUrl,
			expiredAt: value.expiredAt,
			isActive: value.isActive,
		};
		setIsEdit({ show: true, id: value.id });
		console.log(data.picture, submitEdit);
		dispatch(updateData(data, value.id));
		console.log(data.picture, 'after change dispatch');
		setopenEdit(false);
	};

	//  Delete
	const deleteTask = (value) => {
		let data = {
			id: value,
			isActive: false,
		};
		dispatch(delData(data, value));
		setIsDelete({
			show: false,
			id: null,
		});
	};

	const openConfirm = (data, id) => {
		setTimeout(() => {
			form.setFieldsValue({
				id: data.id,
				isActive: data.isActive,
			});
		}, 0);
		setIsDelete({ show: true, id });
	};

	const closeConfirmModal = () => {
		setIsDelete({
			show: false,
			id: null,
		});
		setIsEdit({
			show: false,
			id: null,
		});
	};

	const columns = [
		{
			title: 'id',
			dataIndex: 'id',
			align: 'center',
			key: 'id',
			render: (text) => <a>{text}</a>,
			sorter: (a, b) => sorter(a.qty, b.qty),
			responsive: ['lg', 'md', 'sm', 'xs'],
		},
		{
			title: 'name',
			dataIndex: 'name',
			align: 'center',
			key: 'name',
			responsive: ['lg', 'md', 'sm', 'xs'],
			filterDropdown: ({
				setSelectedKeys,
				selectedKeys,
				confirm,
				clearFilters,
			}) => {
				return (
					<>
						<Input
							autoFocus
							placeholder='Type text here'
							value={selectedKeys[0]}
							onChange={(e) => {
								setSelectedKeys(e.target.value ? [e.target.value] : []);
								confirm({ closeDropdown: false });
							}}
							onPressEnter={() => {
								confirm();
							}}
							onBlur={() => {
								confirm();
							}}
						></Input>
						{/* <Space size='small'>
							<Button type='primary' onClick={() => confirm()}>
								Search
							</Button>
							<Button type='danger' onClick={() => clearFilters()}>
								Reset
							</Button>
						</Space> */}
					</>
				);
			},
			filterIcon: () => {
				return <SearchOutlined />;
			},
			onFilter: (value, record) => {
				return record.name.toLowerCase().includes(value.toLowerCase());
			},
		},
		{
			title: 'qty',
			dataIndex: 'qty',
			align: 'center',
			key: 'qty',
			sorter: (a, b) => sorter(a.qty, b.qty),
			responsive: ['lg', 'md', 'sm', 'xs'],
		},
		{
			title: 'picture',
			dataIndex: 'picture',
			align: 'center',
			key: 'picture',
			render: (picture) => (
				<Image width={50} src={picture} alt={'picture'}></Image>
			),
			responsive: ['lg', 'md', 'sm', 'xs'],
		},
		{
			title: 'expiredAt',
			dataIndex: 'expiredAt',
			align: 'center',
			key: 'expiredAt',
			render: (text) => moment(text).format('LL'),
			sorter: (a, b) => sorter(a.expiredAt, b.expiredAt),
			responsive: ['lg', 'md', 'sm', 'xs'],
		},
		{
			title: 'Status',
			dataIndex: 'isActive',
			align: 'center',
			key: 'isActive',
			responsive: ['lg', 'md', 'sm', 'xs'],
			render: (isActive) => (
				<>
					{isActive !== false ? (
						<Tag color={'green'}>Active</Tag>
					) : (
						<Tag color={'volcano'}>Inactive</Tag>
					)}
				</>
			),
			filters: [
				{ text: 'Active', value: true },
				{ text: 'Inactive', value: false },
			],
			onFilter: (value, record) => {
				return record.isActive === value;
			},
		},
		{
			title: 'Action',
			key: 'action',
			align: 'center',
			responsive: ['lg', 'md', 'sm', 'xs'],
			render: (text, record) => {
				return (
					<Space size='small'>
						<Button
							type='primary'
							ghost
							shape='round'
							onClick={(e) => {
								e.stopPropagation();
								open(record, record.id);
								setDataEdit(record);
							}}
						>
							Edit
						</Button>
						<Button
							danger={true}
							shape='round'
							onClick={(e) => {
								e.stopPropagation();
								openConfirm(record, record.id);
							}}
						>
							Delete
						</Button>
					</Space>
				);
			},
		},
	];

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
			{setloading ? <LoadingOutlined /> : <PlusOutlined />}
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);

	return (
		<div>
			<ModalConfirm
				openIsDelete={isDelete}
				closed={closeConfirmModal}
				deleted={deleteTask}
				openIsEdit={isEdit}
				edited={submitEdit}
			/>
			<Modal
				destroyOnClose={true}
				closable={false}
				width='50vw'
				title='Edit Data'
				centered
				visible={openEdit}
				footer={null}
			>
				<Row type='flex' justify='center' style={{ minHeight: '50vh' }}>
					<Form
						form={form}
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
						<Form.Item name='id'>
							<Input
								style={{ textAlign: 'center', fontWeight: 'bolder' }}
								type='text'
								disabled
								size='small'
							/>
						</Form.Item>
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
									beforeUpload={beforeUpload}
									onChange={handleChangeImage}
									customRequest={dummyRequest}
								>
									{dataEdit.picture ? (
										<img
											src={dataEdit.picture}
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
								<Checkbox
									checked={dataEdit.isActive}
									defaultChecked={dataEdit.isActive}
								/>
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
			<Table
				bordered
				scroll={{ x: 'max-content' }}
				columns={columns}
				dataSource={loading ? [] : data}
				locale={{
					emptyText: setloading ? <LoadingOutlined /> : null,
				}}
				rowKey='id'
			/>
		</div>
	);
};

export default TableData;
