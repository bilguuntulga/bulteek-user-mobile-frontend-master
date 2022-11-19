/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { browserName } from 'react-device-detect';
import { useSelector } from "react-redux";


export default function MyImage({ src = "", isS3Host = false, ...props }) {

  const { s3Host } = useSelector(state => state.general);

  let url = src;

  if (isS3Host) {
    url = `${s3Host}${src}`;
  }
  console.log(browserName.toLowerCase().indexOf("safari") > 0 , browserName)
  if (browserName.toLowerCase().indexOf("safari") > 0 ) {
    let nameArr2 = url.split("/image.webp");
    return <img src={`${nameArr2[0]}/image.png`} {...props} />
  }

  return <img src={url} {...props} />
}