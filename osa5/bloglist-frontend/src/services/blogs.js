import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (blog, user) => {
  const token = `bearer ${user.token}`;
  const config = {
    headers: { Authorization: token },
  };
  console.log(config);

  const response = await axios.post(baseUrl, blog, config);
  console.log(response);
  return response.data;
};

export default { getAll, create };
