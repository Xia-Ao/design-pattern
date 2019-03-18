

class Person {
  constructor (name) {
    this.name = name
  }

  getName () {
    return this.name;
  }
}

let person = new Person('teacher')
alert(person.getName());