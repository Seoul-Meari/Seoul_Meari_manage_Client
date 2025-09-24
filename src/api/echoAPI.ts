import axiosInstance from './index';

// AR 메아리 목록 전체를 가져오는 함수
export const getEchoList = async () => {
  const response = await axiosInstance.get('/echo/echo-list');
  return response.data;
};

// 특정 ID의 AR 메아리 데이터를 가져오는 함수
export const getEchoById = async (id: string) => {
  const response = await axiosInstance.get(`/echo/echo-list/${id}`);
  return response.data;
};

// 특정 ID의 AR 메아리를 삭제하는 함수
export const deleteEchoById = async (id: string) => {
  const response = await axiosInstance.delete(`/echo/echo-list/${id}`);
  return response.data;
};
