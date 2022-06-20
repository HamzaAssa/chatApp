// const baseUrl = ;
/// base url to api is messing for security purposes.
export const loginUser = async (formData) => {
  return await fetch(`${baseUrl}/user/login`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain",
      "Content-type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};
export const registerUser = async (formData) => {
  return await fetch(`${baseUrl}/user/register`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain",
      "Content-type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => data);
};

export const createGroup = async (userId, groupName, token) => {
  return await fetch(`${baseUrl}/group/creategroup`, {
    method: "POST",
    headers: {
      token: token,
      Accept: "application/json, text/plain",
      "Content-type": "application/json",
    },
    body: JSON.stringify({ id: userId, group: groupName }),
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));
};

export const joinGroup = async (userId, groupName, token) => {
  return await fetch(`${baseUrl}/group/joingroup`, {
    method: "POST",
    headers: {
      token: token,
      Accept: "application/json, text/plain",
      "Content-type": "application/json",
    },
    body: JSON.stringify({ id: userId, group: groupName }),
  })
    .then((res) => res.json())
    .then((data) => data);
};

export const deleteGroup = async (userId, groupId, groupName, token) => {
  return await fetch(`${baseUrl}/group/deletegroup`, {
    method: "POST",
    headers: {
      token: token,
      Accept: "application/json, text/plain",
      "Content-type": "application/json",
    },
    body: JSON.stringify({ userId, groupId, groupName }),
  })
    .then((res) => res.json())
    .then((data) => data);
};
export const findGroups = async (groupsName, token) => {
  return await fetch(`${baseUrl}/group/findgroups`, {
    method: "POST",
    headers: {
      token: token,
      Accept: "application/json, text/plain",
      "Content-type": "application/json",
    },
    body: JSON.stringify({ groupsName: groupsName }),
  })
    .then((res) => res.json())
    .then((data) => data);
};

export const sendMessage = async (message, token) => {
  return await fetch(`${baseUrl}/chat/sendmessage`, {
    method: "POST",
    headers: {
      token: token,
    },
    body: message,
  })
    .then((res) => res.json())
    .then((data) => data);
};
export const getAllMessages = async (token, groupName) => {
  return await fetch(`${baseUrl}/chat/getallmessages`, {
    method: "POST",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ groupName }),
  })
    .then((res) => res.json())
    .then((data) => data);
};
export const changeAvatar = async (token, data) => {
  return await fetch(`${baseUrl}/user/changeavatar`, {
    method: "POST",
    headers: {
      token: token,
    },
    body: data,
  })
    .then((res) => res.json())
    .then((data) => data);
};

export const changeGroupIcon = async (token, data) => {
  return await fetch(`${baseUrl}/group/changegroupicon`, {
    method: "POST",
    headers: {
      token: token,
    },
    body: data,
  })
    .then((res) => res.json())
    .then((data) => data);
};
