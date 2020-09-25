export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string
  ){}

  getId() {return this.id}
  getName() {return this.name}
  getEmail() {return this.email}
  getPassword() {return this.password}

  setId(id: string) {this.id = id}
  setName(name: string) {this.name = name}
  setEmail(email: string) {this.email = email}
  setPassword(password: string) {this.password = password}
}
