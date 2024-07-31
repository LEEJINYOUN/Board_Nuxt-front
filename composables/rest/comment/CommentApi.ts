import axios from "axios";
import { API_FRONT_URL } from "~/constants/api/ApiUrl";

// n번 게시글의 댓글 불러오기
const index = async (
  paramsId: string | string[],
  page: number,
  perPage: number
) => {
  return await axios.get(
    `${API_FRONT_URL}/comments/${paramsId}?page=${page}&perPage=${perPage}`
  );
};

// 댓글 작성
const store = async (value: object) => {
  return await axios.post(`${API_FRONT_URL}/comments`, value);
};

// 수정할 특정 댓글 불러오기
const edit = async (id: number) => {
  return await axios.get(`${API_FRONT_URL}/comments/${id}/edit`);
};

// 특정 댓글 업데이트
const update = async (editCommentId: number | undefined, value: object) => {
  return await axios.patch(`${API_FRONT_URL}/comments/${editCommentId}`, value);
};

// 댓글 삭제
const destroy = async (id: number) => {
  return await axios.delete(`${API_FRONT_URL}/comments/${id}`);
};

export default { index, store, edit, update, destroy };
