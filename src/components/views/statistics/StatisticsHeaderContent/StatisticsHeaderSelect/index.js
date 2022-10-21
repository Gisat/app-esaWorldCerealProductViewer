import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import './style.scss';

const StatisticsHeaderSelect = ({
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
			background: state.isFocused ? 'var(--accent25)' : 'var(--accent45)',
			height: '100%',
			padding: '3px 10px 0 5px',
			borderWidth: '0',
			borderRadius: '0',
			boxShadow: '0',
			color: state.isFocused ? 'var(--base95)' : 'var(--base95)',
			'&:hover': {
				color: state.isFocused ? 'var(--base95)' : 'var(--base95)',
				background: state.isFocused ? 'var(--accent25)' : 'var(--accent25)',
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
		dropdownIndicator: provided => ({
			...provided,
			padding: '0',
			cursor: 'pointer',
			color: 'inherit',
			opacity: 0.5,
			transition: 0,
			':hover': {
				color: 'inherit',
			},
		}),
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
		option: provided => ({
			...provided,
			cursor: 'pointer',
			color: 'var(--base0)',
			fontSize: '.875rem',
			fontFamily: 'Roboto, sans-serif',
			padding: '7px 15px',
			'&:hover': {
				background: 'var(--accent65)',
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
					primary25: 'var(--accent65)',
					primary50: 'var(--accent40)',
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
	onChange: PropTypes.func,
};

export default StatisticsHeaderSelect;
