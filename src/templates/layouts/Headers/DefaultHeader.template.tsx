import React from 'react';
import Header, { HeaderLeft, HeaderRight } from '../../../components/layouts/Header/Header';
import DefaultHeaderRightCommon from './_common/DefaultHeaderRight.common';
import SearchPartial from './_partial/Search.partial';
import useAsideStatus from '../../../hooks/useAsideStatus';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/icon/Icon';

const DefaultHeaderTemplate = () => {
	return (
		<Header>
			<HeaderLeft />
			<HeaderRight>
				<DefaultHeaderRightCommon />
			</HeaderRight>
		</Header>
	);
};

export default DefaultHeaderTemplate;
