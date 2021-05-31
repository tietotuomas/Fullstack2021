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
  return response.data;
};

const update = async (updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog);
  return response.data;
};

const remove = async (blog, user) => {
  const token = `bearer ${user.token}`;
  const config = {
    headers: { Authorization: token },
  };
  console.log(config);

  const response = await axios.delete(`${baseUrl}/${blog.id}`, config);
  return response;
};

export default { getAll, create, update, remove };
