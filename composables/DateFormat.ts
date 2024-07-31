// 날짜 포맷
export const ChangeDate = (createdAt: string) => {
  let date = new Date(createdAt);
  let dateFormat =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1 < 9
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) +
    "-" +
    (date.getDate() < 9 ? "0" + date.getDate() : date.getDate());
  return dateFormat;
};
