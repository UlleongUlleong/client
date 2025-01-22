// 비밀번호 형식 검사

export const validatePassword = (password: string): string => {
  const minLength = 8;
  const maxLength = 20;
  const alphabetRegex = /[a-zA-Z]/; // 알파벳 포함 여부
  const specialCharRegex = /[!@$*&]/; // 특수문자 포함 여부
  const numberRegex = /[0-9]/; // 숫자 포함 여부

  if (password.length < minLength) {
    return `비밀번호는 최소 ${minLength}자 이상이어야 합니다.`;
  }

  if (password.length > maxLength) {
    return `비밀번호는 최대 ${maxLength}자 이하여야 합니다.`;
  }

  if (!alphabetRegex.test(password)) {
    return '비밀번호에는 알파벳이 최소 1자 이상 포함되어야 합니다.';
  }

  if (!specialCharRegex.test(password)) {
    return '비밀번호에는 특수 문자 (! * @ $ &) 중 하나 이상 포함되어야 합니다.';
  }

  if (!numberRegex.test(password)) {
    return '비밀번호에는 숫자가 최소 1자 이상 포함되어야 합니다.';
  }
  return '';
};

// 카운트 다운

export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
};
