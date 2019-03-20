class State {
  constructor (color) {
    this.color = color
  }

  handle (context) {
    context.setState(this)
    console.log(`color change to ${this.color}`)
  }
}

class Context {
  constructor () {
    this.state = null
  }

  getState () {
    return this.state;
  }

  setState (state) {
    this.state = state;
  }

}

let context = new Context()
let green = new State('green')
let red = new State('red')

// 切换状态
green.handle(context)
console.log(green)
console.log(context)
red.handle(context)