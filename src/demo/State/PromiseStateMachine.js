import StateMachine from 'javascript-state-machine'

const fsm = new StateMachine({
  init: 'pending',
  transitions: [
    {name: 'resolve', from: 'pending', to: 'fulfilled'},
    {name: 'reject', from: 'pending', to: 'rejected'},
  ],
  methods: {
    onResloved: function (state, data) {
      debugger;
      data.resolvedCallback.forEach(fn => fn())
    },
    onRejected: function (state, data) {
      debugger
      data.rejectedCallback.forEach(fn => fn())
    }
  }
});


class Promise {
  constructor (context) {
    this.state = 'pending';
    this.data = null;
    this.resolvedCallback = [];
    this.rejectedCallback = [];

    this.resolve = () => {
      fsm.resolve(this)
    };
    this.reject = () => {
      fsm.reject(this)
    };

    try {
      context(this.resolve, this.reject);
    } catch (e) {
      this.reject(e)
    }
  }

  then (onFulfilled, onRejected) {
    this.rejectedCallback.push(onFulfilled);
    this.rejectedCallback.push(onRejected);
  }

  catch (onReject) {
    return this.then(null, onReject);
  }

}


let url = 'https://raw.githubusercontent.com/jakesgordon/javascript-state-machine/master/examples/matter.png1'

let promise = new Promise((resolve, reject) => {
  const dom = document.getElementById('img');
  console.log(dom);
  const img = document.createElement('img');
  dom.appendChild(img);
  console.log(img);
  img.src = url;
  img.onload = function () {
    resolve()
  };
  img.onerror = function () {
    reject()
  }
});

promise.then(() => {
  alert('load success')
}, () => {
  alert('load failed')
});