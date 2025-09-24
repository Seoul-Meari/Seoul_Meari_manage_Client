import axiosInstance from './index';

// 민원 목록 전체를 가져오는 함수
export const getComplaintsList = async () => {
  const response = await axiosInstance.get('/complaints/complaints-list');
  return response.data;
};

// 특정 ID의 민원 데이터를 가져오는 함수
export const getComplaintById = async (id: string) => {
  const response = await axiosInstance.get(`/complaints/complaints-list/${id}`);
  return response.data;
};

// S3 이미지에 대한 presigned URL을 가져오는 함수
export const getPresignedUrl = async (s3Url: string) => {
  const response = await axiosInstance.post('/complaints/presigned-url', { S3_url: s3Url });
  return response.data.presigned_url;
};
