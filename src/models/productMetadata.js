export default model => {
	const {
		id,
		sos,
		eos,
		season,
		aez_id,
		geometry,
		users,
		meta,
		product,
		type,
		public: isPublic,
		tiles,
		relatedProduct,
	} = model.data;

	return {
		key: model.key,
		data: {
			id,
			sos,
			eos,
			season,
			aez: aez_id,
			geometry,
			users,
			meta,
			product,
			type,
			public: isPublic,
			tiles,
			relatedProduct,
		},
	};
};
