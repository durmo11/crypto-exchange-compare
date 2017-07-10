export function getUser() {
  const user = fetch(`http://localhost/api/user`).then(res => {
    return res.json()
  }).then(res => {
    return res
  });
  return {type: "GET_USER", payload: user}
}
