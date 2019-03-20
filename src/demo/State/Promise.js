class Promise {
  constructor (context) {
    this.state = 'pending';
    this.data = null;
    this.resolvedCallback = [];
    this.rejectedCallback = [];

    this.resolve = (value) => {
      // 注意this指向， 指向实例，在类中使用没有任何问题，但是如果不是在类中使用，this指向运行时在的环境，一般是undefined
      // 一般使用箭头函数，指定this指向为函数定义时所在的环境
      if (this.state === 'pending') {
        this.state = 'resolved';
        this.data = value;
        // resolve执行
        this.resolvedCallback.forEach((fn) => fn(value))
      }
    };
    this.reject = (value) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.data = value;
        // reject执行
        // resolve执行
        this.rejectedCallback.forEach((fn) => fn(value))
      }
    };

    try {
      context(this.resolve, this.reject);
    } catch (e) {
      this.reject(e)
    }
  }

  // 原型对象，
  then (onFulfilled, onRejected) {
    let promise2;

    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => reason;

    // 相比于state-machine，这里是用if-else判断，而state-machine使用状态机处理
    // resolved 状态处理
    if (this.state === 'resolved') {
      return promise2 = new Promise((resolve, reject) => {
        try {
          const temp = onFulfilled(this.data);
          if (temp instanceof Promise) {
            temp.then(resolve, reject);
          } else {
            resolve(temp);
          }
        } catch (e) {
          reject(e)
        }
      })
    }

    // rejected 状态处理
    if (this.state === 'rejected') {
      debugger;
      return promise2 = new Promise((resolve, reject) => {
        try {
          const temp = onRejected(this.data);
          if (temp instanceof Promise) {
            temp.then(resolve, reject);
          }
        } catch (e) {
          reject(e)
        }
      })
    }

    // 如果还在pending状态，不能确定onFulfilled还是onRejected，
    // 暂时不能处理，把两种情况都放入两个callback队列，等状态改变之后再执行
    if (this.state === 'pending') {
      return promise2 = new Promise((resolve, reject) => {
        // 向callback添加回调
        this.resolvedCallback.push(() => {
          try {
            const temp = onFulfilled(this.data);
            if (temp instanceof Promise) {
              temp.then(resolve, reject);
            } else {
              resolve(temp)
            }
          } catch (e) {
            reject(e)
          }
        });
        this.rejectedCallback.push(() => {
          try {
            const temp = onRejected(this.data);
            if (temp instanceof Promise) {
              temp.then(resolve, reject);
            }
          } catch (e) {
            reject(e)
          }
        })
      })
    }
  }

  catch (onReject) {
    return this.then(null, onReject);
  }
}

let url = 'https://raw.githubusercontent.com/jakesgordon/javascript-state-machine/master/examples/matter.png'

let promise = new Promise((resolve, reject) => {
  const dom = document.getElementById('img');
  console.log(dom);
  const img = document.createElement('img');
  dom.appendChild(img);
  console.log(img);
  img.src = url;
  img.onload = function () {
    resolve(() => {
      alert('load success')
    })
  };
  img.onerror = function () {
    reject(() => {
      alert('load failed')
    })
  }
});

promise.then(fn => {
  fn();
}, fn => fn());
promise.then(fn => {
  fn();
}, fn => fn());


