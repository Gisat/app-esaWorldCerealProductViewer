import PropTypes from 'prop-types';
import ReactSelect, {components} from 'react-select';
import './style.scss';

const CustomSingleValue = ({children, title, ...props}) => (
	<>
		<components.SingleValue {...props}>
			{title ? (
				<span className="worldCereal-StatisticsHeaderSelect-label">
					{title}
				</span>
			) : null}
			{children}
		</components.SingleValue>
	</>
);

CustomSingleValue.propTypes = {
	children: PropTypes.node,
	title: PropTypes.string,
};

const StatisticsHeaderSelect = ({
	title,
	options,
	value,
	isMulti,
	disabled,
	highlighted,
	onChange,
}) => {
	const customStyles = {
		control: (provided, state) => ({
			...provided,
			background: state.isFocused ? 'var(--accent50)' : 'var(--accent35)',
			height: '100%',
			padding: '3px 10px 1px 5px',
			borderWidth: '0',
			borderRadius: '0',
			boxShadow: '0',
			color: state.isFocused ? 'var(--base100)' : 'var(--base90)',
			'&:hover': {
				color: state.isFocused ? 'var(--base95)' : 'var(--base95)',
				background: state.isFocused ? 'var(--accent50)' : 'var(--accent50)',
			},
			width: '12rem',
		}),
		container: provided => ({
			...provided,
			fontSize: '1rem',
			borderRadius: '0',
		}),
		indicatorSeparator: provided => ({
			...provided,
			display: 'none',
		}),
		dropdownIndicator: (provided, state) => {
			return {
				...provided,
				padding: '0',
				cursor: 'pointer',
				color: 'var(--base100)',
				opacity: 0.5,
				transition: 0,
				':hover': {
					color: 'inherit',
				},
				transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : '',
			};
		},
		input: provided => ({
			...provided,
			padding: '0',
			margin: 0,
			cursor: 'pointer',
		}),
		singleValue: provided => ({
			...provided,
			fontWeight: highlighted ? '800' : '600',
			fontSize: '1rem',
			fontFamily: 'Sen, Roboto, sans-serif',
			letterSpacing: '-.5px',
			color: 'inherit',
			cursor: 'pointer',
			display: 'flex',
			flexDirection: 'column',
			lineHeight: 1.15,
		}),
		valueContainer: provided => ({
			...provided,
			color: disabled ? 'var(--base40)' : provided.color,
			padding: '0px 10px',
			cursor: 'text',
		}),
		menu: provided => ({
			...provided,
			zIndex: 1000,
			minWidth: '12.2rem',
			border: '0',
			borderRadius: '.15rem',
			background: 'var(--base75)',
		}),
		option: (provided, state) => ({
			...provided,
			cursor: 'pointer',
			color: state.isSelected ? 'var(--base100)' : 'var(--base0)',
			fontSize: '.875rem',
			fontFamily: 'Roboto, sans-serif',
			padding: '12px 15px',
			'&:hover': {
				background: state.isSelected ? 'var(--accent50)' : 'var(--accent70)',
			},
		}),
	};

	return (
		<ReactSelect
			className="cure-StatisticsHeaderSelect"
			styles={customStyles}
			theme={theme => ({
				...theme,
				colors: {
					...theme.colors,
					primary25: 'var(--accent70)',
					primary50: 'var(--accent50)',
					primary: 'var(--accent50)',
					neutral0: 'var(--base10)',
					neutral20: 'var(--base50)',
					neutral80: 'var(--base80)',
					neutral90: 'var(--base90)',
				},
			})}
			isMulti={isMulti}
			isClearable={false}
			isSearchable={false}
			options={options}
			value={value}
			isDisabled={disabled}
			onChange={onChange}
			components={{
				SingleValue: props => <CustomSingleValue title={title} {...props} />,
			}}
		/>
	);
};

StatisticsHeaderSelect.propTypes = {
	isMulti: PropTypes.bool,
	disabled: PropTypes.bool,
	highlighted: PropTypes.bool,
	options: PropTypes.array,
	value: PropTypes.object,
	small: PropTypes.bool,
	menuPosition: PropTypes.string,
	menuWidth: PropTypes.string,
	title: PropTypes.string,
	onChange: PropTypes.func,
};

export default StatisticsHeaderSelect;
