// Строитель (англ. Builder) — порождающий шаблон проектирования предоставляет способ
// создания составного объекта.

// Цель
// Отделяет конструирование сложного объекта от его представления так, что в результате
// одного и того же процесса конструирования могут получаться разные представления.

// Плюсы
// 1 позволяет изменять внутреннее представление продукта;
// 2 изолирует код, реализующий конструирование и представление;
// 3 дает более тонкий контроль над процессом конструирования.

// Минусы
// 1 алгоритм создания сложного объекта не должен зависеть от того, из каких частей состоит
// объект и как они стыкуются между собой;
// 2 процесс конструирования должен обеспечивать различные представления конструируемого объекта.

// Применение
// Объекты «моникер» в COM есть Строители, инициализируемые строкой. Более того, для их создания
// используется другой Строитель — MkParseDisplayNameEx, который определяет по строке класс моникера,
// создает моникер и инициализирует его этой же строкой.

// Реализации
// Product
function Pizza() {
  var duplicate = this; // постоянная ссылка на инстанцируемый объект для вызова при любом this
  var dough;
  var sauce;
  var topping;

  this.setDough = function (val) {
    dough = val;
  };
  this.setSauce = function (val) {
    sauce = val;
  };
  this.setTopping = function (val) {
    topping = val;
  };

  // из-за особенностей языка, геттеры (пусть они нам и не понадобятся) 
  // должны быть определены в той же функции, что и локальные переменные
  this.getDough = function () {
    return dough;
  };
  this.getSauce = function () {
    return sauce;
  };
  this.getTopping = function () {
    return topping;
  };

  // мы должны создать метод, изменяющий св-ва уже созданного объекта
  // (см. createNewPizzaProduct)
  this.clear = function () {
    duplicate.setDough(undefined);
    duplicate.setSauce(undefined);
    duplicate.setTopping(undefined);
  };
}

// Abstract Builder
function PizzaBuilder() {
  var pizza = new Pizza();

  this.getPizza = function () {
    return pizza;
  };
  this.createNewPizzaProduct = function () {
    // если мы просто поменяем зн-е переменной pizza, то изменение никак
    // не отразится на дочерних классах, т.к. внутри них переменная pizza
    // ссылается на «старую» область памяти
    pizza.clear();
    // если внутри реализаций (HawaiianPizzaBuilder, SpicyPizzaBuilder)
    // мы, вместо переменной pizza, будем использовать метод getPizza,
    // то можно использовать
    // pizza = new Pizza();
    // и метод clear у Pizza не понадобится
  };

  this.buildDough = function (val) {};
  this.buildSauce = function (val) {};
  this.buildTopping = function (val) {};
}

// Concrete Builder
function HawaiianPizzaBuilder() {
  PizzaBuilder.call(this);
  var pizza = this.getPizza(); // имитация protected

  this.buildDough = function () {
    pizza.setDough("cross");
  };
  this.buildSauce = function () {
    pizza.setSauce("mild");
  };
  this.buildTopping = function () {
    pizza.setTopping("ham+pineapple");
  };
}

function SpicyPizzaBuilder() {
  PizzaBuilder.call(this);
  var pizza = this.getPizza();

  this.buildDough = function () {
    pizza.setDough("pan baked");
  };
  this.buildSauce = function () {
    pizza.setSauce("hot");
  };
  this.buildTopping = function () {
    pizza.setTopping("pepperoni+salami");
  };
}

// Director
function Waiter() {
  var pizzaBuilder;

  this.setPizzaBuilder = function (builder) {
    pizzaBuilder = builder;
  };
  this.getPizza = function () {
    return pizzaBuilder.getPizza();
  };

  this.constructPizza = function () {
    pizzaBuilder.createNewPizzaProduct();
    pizzaBuilder.buildDough();
    pizzaBuilder.buildSauce();
    pizzaBuilder.buildTopping();
  };
}

// Клиент заказывает две пиццы
var pizza;
var waiter = new Waiter();

var hawaiianPizzaBuilder = new HawaiianPizzaBuilder();
waiter.setPizzaBuilder(hawaiianPizzaBuilder);
waiter.constructPizza();
pizza = waiter.getPizza();
alert(pizza.getDough() + ", " + pizza.getSauce() + ", " + pizza.getTopping());

var spicyPizzaBuilder = new SpicyPizzaBuilder();
waiter.setPizzaBuilder(spicyPizzaBuilder);
waiter.constructPizza();
pizza = waiter.getPizza();
alert(pizza.getDough() + ", " + pizza.getSauce() + ", " + pizza.getTopping());