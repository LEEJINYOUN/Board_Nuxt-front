import axios from "axios";
import { API_FRONT_URL } from "~/constants/api/ApiUrl";

// 게시글 불러오기
const index = async (page: number, perPage: number) => {
  return await axios.get(
    `${API_FRONT_URL}/posts?page=${page}&perPage=${perPage}`
  );
};

// 게시글 작성
const store = async (value: object) => {
  return await axios.post(`${API_FRONT_URL}/posts`, value);
};

// 특정 게시글 불러오기
const show = async (paramsId: string[] | string) => {
  return await axios.get(`${API_FRONT_URL}/posts/${paramsId}`);
};

// 수정할 특정 게시글 불러오기
const edit = async (paramsId: string[] | string) => {
  return await axios.get(`${API_FRONT_URL}/posts/${paramsId}/edit`);
};

// 특정 게시글 업데이트
const update = async (paramsId: string[] | string, value: object) => {
  return await axios.patch(`${API_FRONT_URL}/posts/${paramsId}`, value);
};

// 게시글 삭제
const destroy = async (id: number) => {
  return await axios.delete(`${API_FRONT_URL}/posts/${id}`);
};

export default { index, store, show, edit, update, destroy };
