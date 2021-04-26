import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
}

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson).then((response) => response.data);
}

const remove = (id) => {
    axios.delete(baseUrl+"/"+id)
}

const update = (id, updatedPerson) => {
  return axios.put(`${baseUrl}/${id}`, updatedPerson).then(response => response.data)
}

const httpService = {getAll, create, remove, update}

export default httpService;
