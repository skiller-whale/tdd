export default class MockDao {
  constructor() {
    this.users = [];
  }

  setUsers(users) {
    this.users = users;
  }

  getUsers(page = 1, limit = 10) {
    const start = (page - 1) * limit;
    const end = start + limit;
    return [this.users.slice(start, end), this.users.length];
  }
}
