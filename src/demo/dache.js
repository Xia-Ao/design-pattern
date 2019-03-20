class Car {
  constructor (plate, name) {
    this.plate = plate;
    this.name = name;
  }
}

class Kuaiche extends Car {
  constructor (plate, name, price) {
    super(plate, name);
    this.price = price;
  }
}

class Zhuanche extends Car {
  constructor (plate, name, price) {
    super(plate, name);
    this.price = price;
  }
}


class Trip {
  constructor (car) {
    this.car = car;
  }

  start () {
    console.log('行程开始，' + this.car.name + '车牌号是：' + this.car.plate)
  }

  end () {
    console.log('行程结束，车费为：' + this.car.price * 5 + '元')
  }
}

let car= new Kuaiche('浙A88888', '宝马5系', 10);
let trip= new Trip(car);

trip.start()
trip.end()