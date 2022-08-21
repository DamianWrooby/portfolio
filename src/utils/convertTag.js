exports.convertToPath = tag => {
	return tag.toLowerCase().replace(" ", "-").replace(".", "_");
};

exports.convertToOriginal = tag => {
	return tag.replace("-", " ").replace("_", ".");
};
