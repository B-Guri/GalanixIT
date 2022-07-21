import axios from "axios";

export default class Service {
  static async getInfo(country, name) {
    return await axios
      .get("http://universities.hipolabs.com/search", {
        params: { country: country, name: name },
      })
      .then((res) => {
        return res.data;
      });
  }
}
