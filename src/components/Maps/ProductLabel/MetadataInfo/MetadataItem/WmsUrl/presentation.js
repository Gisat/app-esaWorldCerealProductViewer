import PropTypes from 'prop-types';

const MetadataInfoItemRec = ({dataSource}) => {
	return <a href={dataSource.data.url}>{dataSource.data.url}</a>;
};

MetadataInfoItemRec.propTypes = {
	dataSource: PropTypes.object,
};
export default MetadataInfoItemRec;
