// 蛇 - 构造函数
function Snake() {
  // 属性
  this.elements = [];   // 蛇组（蛇头和蛇身），存放的一组jQuery对象格式div,蛇头存放在蛇组的最前面。
  this.direction = 'right';   // 蛇移动的方向 left 、right、bottom、top

}
// 方法-计算新蛇头的位置-将来给增加新蛇头时使用
Snake.prototype.getNewHeadLocation = function () {
  // 1. 如何计算新蛇头位置
  // ① 检测是否有旧的蛇头，没有蛇头，位置是 0,0
  // 获取旧的蛇头
  var oldHead = this.elements[0];
  if (oldHead == undefined) {
    // 若将来返回多个值时，可以返回数组字面量或对象字面量
    // 若返回的值是有意义的，则建议返回一个对象字面量
    return { left: 0, top: 0 };
  } else {
    // 获取旧的蛇头的位置
    var x = oldHead.position().left;
    var y = oldHead.position().top;
    // ② 有蛇头,根据方向计算新蛇头的位置
    if (this.direction == 'right') {
      x = x + 20;
    } else if (this.direction == 'left') {
      x = x - 20;
    } else if (this.direction == 'top') {
      y = y - 20;
    } else if (this.direction == 'bottom') {
      y = y + 20;
    }

    return { left: x, top: y };

  }

}

// 方法-增加新蛇头
Snake.prototype.insertNewHead = function () {
  // ① 获取将来新蛇头的位置
  var location = this.getNewHeadLocation();
  // ② 检测是否有旧的蛇头,若有，把旧的蛇头改为身体
  var oldHead = this.elements[0];
  if (oldHead != undefined) {
    oldHead.removeClass().addClass('snake-body');
  }
  // ③ 动态创建新蛇头追加到地图中
  var newHead = $('<div class="snake-head"></div>').appendTo('#map');
  // ④ 把新蛇头翻入蛇组的最前面
  this.elements.unshift(newHead);
  // ⑤ 把计算好的位置给新蛇头
  newHead.css({
    left: location.left,
    top: location.top
  })
}

// 方法-显示一蛇
Snake.prototype.showSnake = function () {
  for (var i = 1; i <= 3; i++) {
    this.insertNewHead();
  }
};

// 方法-蛇移动
Snake.prototype.move = function () { 
  // 1. 删除蛇组中最后一个元素 并且地图中也要删除
  var last = this.elements.pop();   // 从组中删除
  last.remove();    // 从地图中移除
  // 2. 增加蛇头
  this.insertNewHead();
};

// 方法-蛇是否撞墙死
Snake.prototype.isDead = function () { 
  // 检测蛇头的位置
  var oldHead = this.elements[0];
  // 获取蛇头的位置
  var x = oldHead.position().left;
  var y = oldHead.position().top;
  // 判断是否死亡
  if (
    x < 0 ||
    x >= $('#map').width() ||
    y < 0 ||
    y >= $('#map').height()
  ) {
    return true;
  } else {
    return false;
  }
};

// 方法-蛇是否吃食物
// food 形参，接收传入的食物对象
Snake.prototype.isEat = function (food) { 
  // 获取蛇头
  var head = this.elements[0];
  // 获取蛇头的位置
  var left = head.position().left;
  var top = head.position().top;
  // 判断
  if (left == food.x && top == food.y) {
    return true;
  } else {
    return false;
  }
};

