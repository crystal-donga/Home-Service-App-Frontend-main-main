import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useGetServiceImageQuery } from '../../api/serviceApi';

function ServiceImage({ imageName = "", alt = "", className = "" }) {
  const { data: blob, isSuccess, isError } = useGetServiceImageQuery(imageName, {
    skip: imageName === '',
  });

  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    if (isSuccess && blob) {
      const url = URL.createObjectURL(blob);
      setImageUrl(url);

      //return () => URL.revokeObjectURL(url); // Clean up memory
    }
  }, [blob, isSuccess]);

  if (isError || !imageUrl) {
    return (
      <img
        src="https://via.placeholder.com/150"
        alt={alt || "Service image"}
        className={className}
      />
    );
  }

  return (
    <img
      src={imageUrl}
      alt={alt || "Service image"}
      className={className}
    />
  );
}

ServiceImage.propTypes = {
  imageName: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
};

export default ServiceImage;
