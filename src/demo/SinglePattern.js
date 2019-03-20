class LoginForm {
  constructor () {
    this.state = true;
  }

  hide () {
    if (this.state === false) {
      alert('已经隐藏');
      return
    }
    this.state = false;
    console.log('登录框已经隐藏')
  }

  show () {
    if (this.state === true) {
      alert('已经显示');
      return
    }
    this.state = true;
    console.log('登录框已经显示')
  }
}

LoginForm.getInstance = (function () {
  let instance;  // 利用闭包特性
  return function () {
    if (instance == null) {
      instance = new LoginForm()
    }
    return instance
  }
})();

let login1 = LoginForm.getInstance();
let login2 = LoginForm.getInstance();

login1.show();

console.log(login1 === login2);