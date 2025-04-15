import { useEffect, useState } from 'react';
import { useGetProviderImageQuery } from '../../api/providerApi';
import PropTypes from 'prop-types';

function ProviderImage({ imageName = "", alt = "", className = "" }) {
  const { data: blob, isSuccess, isError } = useGetProviderImageQuery(imageName, {
    skip: !imageName,
  });

  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    if (isSuccess && blob) {
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
      console.log("url",url)
      return () => URL.revokeObjectURL(url); // Cleanup
    }
  }, [blob, isSuccess]);

  if (isError || !imageUrl) {
    return (
      <img
        src="https://via.placeholder.com/150"
        alt={alt || "Provider image"}
        className={className}
      />
    );
  }

  return (
    <img
      src={imageUrl}
      alt={alt || "Provider image"}
      className={className}
    />
  );
}

//  Proper prop type validation
ProviderImage.propTypes = {
  imageName: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
};

export default ProviderImage;
