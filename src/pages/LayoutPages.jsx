import React from 'react';
import { Layout } from 'antd';
import TableData from '../components/TableData';
const { Header, Content } = Layout;

export default function LayoutPages() {
	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Header style={{ padding: 0 }} />
			<Content style={{ margin: '24px 16px 0' }}>
				<div className='site-layout-background'>
					<TableData />
				</div>
			</Content>
		</Layout>
	);
}
