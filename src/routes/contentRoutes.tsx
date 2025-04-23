import React, { lazy } from 'react';
import { RouteProps } from 'react-router-dom';
import { appPages, authPages, componentsPages, examplePages } from '../config/pages.config';
import NotFoundPage from '../pages/NotFound.page';
import LoginPage from '../pages/Auth/Login.page';
import SignUpPage from '../pages/Auth/SignUp.page';
import PasswordReset from '../pages/PasswordReset.page';
import ConfirmPages from '../pages/Confirm.page';

/**
 * UI
 */
const AlertPage = lazy(() => import('../pages/componentsAndTemplates/ui/AlertPage/Alert.page'));
const BadgePage = lazy(() => import('../pages/componentsAndTemplates/ui/BadgePage/Badge.page'));
const ButtonPage = lazy(() => import('../pages/componentsAndTemplates/ui/ButtonPage/Button.page'));
const ButtonGroupPage = lazy(
	() => import('../pages/componentsAndTemplates/ui/ButtonGroup/ButtonGroup.page'),
);
const CardPage = lazy(() => import('../pages/componentsAndTemplates/ui/CardPage/Card.page'));
const CollapsePage = lazy(
	() => import('../pages/componentsAndTemplates/ui/CollapsePage/Collapse.page'),
);
const DropdownPage = lazy(
	() => import('../pages/componentsAndTemplates/ui/DropdownPage/Dropdown.page'),
);
const ModalPage = lazy(() => import('../pages/componentsAndTemplates/ui/ModalPage/Modal.page'));
const OffcanvasPage = lazy(
	() => import('../pages/componentsAndTemplates/ui/OffcanvasPage/Offcanvas.page'),
);
const ProgressPage = lazy(
	() => import('../pages/componentsAndTemplates/ui/ProgressPage/Progress.page'),
);
const TablePage = lazy(() => import('../pages/componentsAndTemplates/ui/TablePage/Table.page'));
const TooltipPage = lazy(
	() => import('../pages/componentsAndTemplates/ui/TooltipPage/Tooltip.page'),
);

/**
 * FORM
 */
const FieldWrapPage = lazy(
	() => import('../pages/componentsAndTemplates/form/FieldWrapPage/FieldWrap.page'),
);
const CheckboxPage = lazy(
	() => import('../pages/componentsAndTemplates/form/CheckboxPage/Checkbox.page'),
);
const CheckboxGroupPage = lazy(
	() => import('../pages/componentsAndTemplates/form/CheckboxGroupPage/CheckboxGroup.page'),
);
const InputPage = lazy(() => import('../pages/componentsAndTemplates/form/InputPage/Input.page'));
const LabelPage = lazy(() => import('../pages/componentsAndTemplates/form/LabelPage/Label.page'));
const RadioPage = lazy(() => import('../pages/componentsAndTemplates/form/RadioPage/Radio.page'));
const RichTextPage = lazy(
	() => import('../pages/componentsAndTemplates/form/RichTextPage/RichText.page'),
);
const SelectPage = lazy(
	() => import('../pages/componentsAndTemplates/form/SelectPage/Select.page'),
);
const SelectReactPage = lazy(
	() => import('../pages/componentsAndTemplates/form/SelectReactPage/SelectReact.page'),
);
const TextareaPage = lazy(
	() => import('../pages/componentsAndTemplates/form/TextareaPage/Textarea.page'),
);
const ValidationPage = lazy(
	() => import('../pages/componentsAndTemplates/form/ValidationPage/Validation.page'),
);

/**
 * Integrated
 */
const ReactDateRangePage = lazy(
	() =>
		import('../pages/componentsAndTemplates/integrated/ReactDateRangePage/ReactDateRange.page'),
);
const FullCalendarPage = lazy(
	() => import('../pages/componentsAndTemplates/integrated/FullCalendarPage/FullCalendarPage'),
);
const ApexChartsPage = lazy(
	() => import('../pages/componentsAndTemplates/integrated/ApexChartsPage/ApexCharts.page'),
);
const ReactSimpleMapsPage = lazy(
	() =>
		import(
			'../pages/componentsAndTemplates/integrated/ReactSimpleMapsPage/ReactSimpleMaps.page'
		),
);
const WaveSurferPage = lazy(
	() => import('../pages/componentsAndTemplates/integrated/WaveSurferPage/WaveSurfer.page'),
);

/**
 * Icons
 */
const IconPage = lazy(() => import('../pages/componentsAndTemplates/icons/IconPage/Icon.page'));
const HeroiconsPage = lazy(
	() => import('../pages/componentsAndTemplates/icons/HeroiconsPage/Heroicons.page'),
);
const DuotoneIconsPage = lazy(
	() => import('../pages/componentsAndTemplates/icons/DuotoneIconsPage/DuotoneIcons.page'),
);

/**
 * SALES
 */
const SalesDashboardPage = lazy(
	() => import('../pages/sales/SalesDashboardPage/SalesDashboard.page'),
);
const ProductListPage = lazy(
	() => import('../pages/sales/products/ProductListPage/ProductList.page'),
);
const ProductPage = lazy(() => import('../pages/sales/products/ProductPage/Product.page'));
const CategoryListPage = lazy(
	() => import('../pages/sales/categories/CategoryListPage/CategoryList.page'),
);
const CategoryPage = lazy(() => import('../pages/sales/categories/CategoryPage/Category.page'));

/**
 * CRM
 */
const CustomerDashboardPage = lazy(
	() => import('../pages/crm/CustomerDashboardPage/CustomerDashboard.page'),
);
const CustomerListPage = lazy(
	() => import('../pages/crm/customer/CustomerListPage/CustomerList.page'),
);
const CustomerPage = lazy(() => import('../pages/crm/customer/CustomerPage/Customer.page'));
const RoleListPage = lazy(() => import('../pages/crm/role/RoleListPage/RoleList.page'));
const RolePage = lazy(() => import('../pages/crm/role/RolePage/Role.page'));

/**
 * Project
 */
const ProjectDashboardPage = lazy(
	() => import('../pages/project/ProjectDashboardPage/ProjectDashboard.page'),
);
const ProjectBoardPage = lazy(() => import('../pages/project/ProjectBoardPage/ProjectBoard.page'));

const ExamplesPage = lazy(() => import('../pages/ExamplePage/Examples.page'));

/**
 * AI
 */
const AiDashboardPage = lazy(() => import('../pages/ai/AiDashboardPage/AiDashboard.page'));
const ChatPhotoPage = lazy(() => import('../pages/ai/chat/ChatPhotoPage/ChatPhoto.page'));
const ChatVideoPage = lazy(() => import('../pages/ai/chat/ChatVideoPage/ChatVideo.page'));
const ChatAudioPage = lazy(() => import('../pages/ai/chat/ChatAudioPage/ChatAudio.page'));
const ChatCodePage = lazy(() => import('../pages/ai/chat/ChatCodePage/ChatCode.page'));

/**
 * CHAT
 */
const ChatPage = lazy(() => import('../pages/ChatPage/Chat.page'));

/**
 * Other
 */
const UnderConstructionPage = lazy(() => import('../pages/UnderConstruction.page'));

const contentRoutes: RouteProps[] = [
	
	/**
	 * ICONS::BEGIN
	 */


	// { path: appPages.dashboard.to, element: <DashboardPage /> },
	{ path: authPages.loginPage.to, element: <LoginPage /> },
	{ path: authPages.signUp.to, element: <SignUpPage /> },
	{ path: authPages.confirmPage.to, element: <ConfirmPages /> },
	{ path: authPages.resetPasswordPage.to, element: <PasswordReset /> },

	
	{ path: '*', element: <NotFoundPage /> },
];

export default contentRoutes;
