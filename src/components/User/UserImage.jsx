import React, { useEffect, useState } from 'react'
import { useGetUserImageQuery } from '../../api/userApi'
import PropTypes from 'prop-types';
 function UserImage({imageName="",alt="",className=""}) {
    const{data:blob,isSuccess,isError} = useGetUserImageQuery(imageName,{
        skip: imageName === "",
    })
    const[imageUrl,setImageUrl] = useState()
    useEffect(()=>{
        if(isSuccess && blob){
            const url = URL.createObjectURL(blob)
            setImageUrl(url)


        }

    },[blob,isSuccess])
    if (isError || !imageUrl) {
        return (
          <img
            src="https://via.placeholder.com/150"
            alt={alt || "User image"}
            className={className}
          />
        );
      }
    
      return (
        <img
          src={imageUrl}
          alt={alt || "User image"}
          className={className}
        />
      );
}
UserImage.propTypes = {
  imageName: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
};

export default UserImage