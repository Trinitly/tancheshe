// 食物-构造函数
function Food() {
  // 属性
  this.x = 0;   // 食物横向的位置
  this.y = 0;   // 食物的纵向位置
  this.elelment = $('<div class="food"></div>').appendTo('#map');  // 食物对应的div
}

// 方法
Food.prototype.randomLocation = function () {
  // 获取横向最大的格子数
  var maxXCount = $('#map').width() / 20;
  // 获取纵向最大格子数
  var maxYCount = $('#map').height() / 20;

  // 随机横向范围内的一个格子数 [0,maxXCount);
  var xNum = parseInt(Math.random() * maxXCount);
  // 随机纵向范围内的一个格子数 [0,maxYCount);
  var yNum = parseInt(Math.random() * maxYCount);

  //  计算位置的值
  this.x = xNum * 20;
  this.y = yNum * 20;

  // 把计算好的值赋值给食物对象对应的元素的样式
  this.elelment.css({
    left: this.x,
    top:this.y
  });

};