export function setGradeCookie(grade) {
  document.cookie = `userGrade=${grade}; path=/; max-age=${60 * 60 * 24 * 30}`;
}

export function getGradeCookie() {
  const cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    const [key, value] = cookie.trim().split("=");
    if (key === "userGrade") {
      return value;
    }
  }

  return null;
}

export function clearGradeCookie() {
  document.cookie = "userGrade=; path=/; max-age=0";
}