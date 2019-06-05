const { RESTDataSource } = require('apollo-datasource-rest');

class TodosAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://jsonplaceholder.typicode.com';
  }

  async getTodo(id) {
    return this.get(`todos/${id}`);
  }
}

module.exports = { TodosAPI };