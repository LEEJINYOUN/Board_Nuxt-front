// 정규식 규칙
export const RegexCheck = (type: string, input: string) => {
  let reg: any;

  if (type == "email") {
    reg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  } else if ((type = "name")) {
    reg = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]+$/;
  } else if ((type = "nickname")) {
    reg = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]+$/;
  }

  if (!reg.test(input)) {
    return false;
  } else {
    return true;
  }
};
