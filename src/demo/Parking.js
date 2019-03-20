// 车辆
class Car {
  constructor (plate) {
    this.plate = plate;
  }
}

// 停车场
class Park {
  constructor (floors) {
    this.floors = floors;
    this.camera = new Camrea();
    this.screen = new Screen();
    this.carList = {};
  }

  emptyNum () {
    return this.floors.map(floor => {
      return `${floor.index} 层还有${floor.emptyPlaceNum()}个空位`
    }).join('\n');
  }

  in (car) {
    // 通过摄像头获取车辆信息
    const info = this.camera.shot(car);
    // 停到某个停车位
    const index = parseInt(Math.random() * 100 % 100);
    // 都停到第一层
    const place = this.floors[0].place[index];
    place.in();
    info.place = place;
    this.carList[car.plate] = info;
  }

  out (car) {
    const info = this.carList[car.plate];
    // 将车位清空
    const place = info.place;
    place.out();
    delete this.carList[car.plate];
    this.screen.show(car, info.inTime)
  }

}

// 楼层
class Floor {
  constructor (index, place) {
    this.index = index;
    this.place = place || [];
  }

  emptyPlaceNum () {
    let num = 0;
    this.place.forEach(item => {
      item.empty ? num++ : ''
    });
    return num
  }
}

// 车位
class Place {
  constructor () {
    this.empty = true
  }

  in () {
    this.empty = false;
  }

  out () {
    this.empty = true;
  }
}


class Camrea {
  shot (car) {
    return {
      plate: car.plate,
      inTime: new Date()
    };
  }
}

class Screen {
  show (car, inTime) {
    console.log('车牌号：' + car.plate);
    console.log(`停车时间：${new Date() - inTime}`)
  }
}


// 初始化停车场
const floors = [];
for (let i = 0; i < 3; i++) {
  const place = [];
  for (let i = 0; i < 100; i++) {
    place.push(new Place())
  }
  floors.push(new Floor(i + 1, place))
}

const park = new Park(floors);

const car1 = new Car('浙A22222');
const car2 = new Car('浙A33333');
const car3 = new Car('浙A44444');

// 模拟车辆进出
console.log('初始化之后车位：\n' + park.emptyNum());

console.log('第一辆车进入');
park.in(car1);
console.log(park.emptyNum());
console.log('第二辆车进入');
park.in(car2);
console.log(park.emptyNum());
console.log('第一辆车驶出');
park.out(car2);
console.log(park.emptyNum());
console.log('第三辆车驶入');
park.in(car3);
console.log(park.emptyNum());
console.log('第三辆车驶出');
park.out(car3);
console.log(park.emptyNum());
console.log('第一辆车驶出');
park.out(car1);
console.log(park.emptyNum());



