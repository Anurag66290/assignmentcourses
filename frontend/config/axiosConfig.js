import axios from "axios";
import dotenv from "dotenv";

export const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    secret_key:"sk_wybMl6PTmF/OEmEqSdR4yxZhsB5x3p8aIeFWMzo1gnPb==",
    publish_key:"pk_oC0NTHROnxdmL3Jc+Pci4DiQ6bcljKnQHLVuhxBv=",
  },
});
// export const httpFile = axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL,
//   headers: {
//     "Content-Type": "multipart/form-data",
//     secret_key: "sk_wybMl6PTmF/OEmEqSdR4yxZhsB5x3p8aIeFWMzo1gnPb==",
//     publish_key: "pk_oC0NTHROnxdmL3Jc+Pci4DiQ6bcljKnQHLVuhxBv=",
//   },
// });
export const httpFileData = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data,application/json",
    secret_key: "sk_wybMl6PTmF/OEmEqSdR4yxZhsB5x3p8aIeFWMzo1gnPb==",
    publish_key: "pk_oC0NTHROnxdmL3Jc+Pci4DiQ6bcljKnQHLVuhxBv=",
  },
});

