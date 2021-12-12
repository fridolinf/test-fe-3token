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
		}, 0);
		setopenEdit(true, id);
	};

	const close = (data) => {
		setopenEdit(false);
	};

	// Edit Data
	const submitEdit = (value) => {
		let data = {
			id: value.id,
			name: value.name,
			qty: value.qty,
			picture: dataEdit.picture,
			expiredAt: value.expiredAt,
			isActive: value.isActive,
		};
		setIsEdit({ show: true, id: value.id });
		dispatch(updateData(data, value.id));
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
		setIsDelete({ show: true, id });
		setTimeout(() => {
			form.setFieldsValue({
				id: data.id,
				isActive: data.isActive,
			});
		}, 0);
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
		setTimeout(() => {
			form.setFieldsValue({
				id: '',
				name: '',
				qty: '',
				picture: '',
				expiredAt: '',
				isActive: '',
			});
		}, 0);
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
		const isLt2M = file.size / 100 / 100 < 2;
		if (!isLt2M) {
			message.error('Gambar tidak bisa lebih dari 100kb!');
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
