// Прототип, (англ. Prototype) — порождающий шаблон проектирования.

// Назначение
// Задаёт виды создаваемых объектов с помощью экземпляра-прототипа и создаёт новые объекты путём копирования этого прототипа. Он позволяет уйти от
// реализации и позволяет следовать принципу «программирование через интерфейсы». В качестве возвращающего типа указывается интерфейс/абстрактный
// класс на вершине иерархии, а классы-наследники могут подставить туда наследника, реализующего этот тип.
// Проще говоря, это паттерн создания объекта через клонирование другого объекта вместо создания через конструктор.

// Применение
// Паттерн используется чтобы:
// - избежать дополнительных усилий по созданию объекта стандартным путём(имеется в виду использование конструктора, так как в этом случае также
// будут вызваны конструкторы всей иерархии предков объекта), когда это непозволительно дорого для приложения.
// - избежать наследования создателя объекта(object creator) в клиентском приложении, как это делает паттерн abstract factory.
// Используйте этот шаблон проектирования, когда системe безразлично как именно в ней создаются, компонуются и представляются продукты:
// - инстанцируемые классы определяются во время выполнения, например с помощью динамической загрузки;
// - избежать построения иерархий классов или фабрик, параллельных иерархии классов продуктов;
// - экземпляры класса могут находиться в одном из нескольких различных состояний. Может оказаться удобнее установить соответствующее число
// прототипов и клонировать их, а не инстанцировать каждый раз класс вручную в подходящем состоянии.

// В JavaScript у каждого объекта есть прототип, от которого он может наследовать свойства и методы. Метод Object.create() является одним из
// способов реализации шаблона проектирования прототипа.

// Преимущества использования шаблона Prototype:
//Шаблон Prototype позволяет быстро клонировать объекты, снижая нагрузку на систему. Он обеспечивает гибкость по сравнению с жестко
// запрограммированными классами, облегчает добавление и удаление объектов во время выполнения и упрощает создание сложных объектов, тем самым
// повышая производительность и использование памяти.

// - Мы можем клонировать объект, не привязываясь к его конкретным классам.
// - Вы можете избежать повторения инициализации кода, клонируя готовые прототипы.
// - Создавать сложные объекты проще.
// - При работе со структурными заданиями для сложных объектов мы создаем альтернативу наследованию.

// Примеры
var carPrototype = { // создаём объект-прототип с методами для наследования
  start: function () {
    return 'Engine of ' + this.model + ' starting...'; // this будет ссылаться на созданный объект-экземпляр
  },
  stop: function () {
    return 'Engine of ' + this.model + ' stopping...';
  }
};

function Car(model, year) { // создаём функцию-конструктор
  this.model = model;
  this.year = year;
}
Car.prototype = carPrototype; // заменяем ссылку объекта прототипа на ранее созданный объект-прототип 

var car1 = new Car('Toyota Corolla', 2005); // создаём экземпляр объекта с интерфейсом Car
console.log(car1.start()); // Engine of Toyota Corolla starting...
