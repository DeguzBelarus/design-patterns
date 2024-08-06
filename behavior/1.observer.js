// Наблюдатель (англ. Observer) — поведенческий шаблон проектирования. Также известен как «подчинённые» (англ. Dependents).
//  Реализует у класса механизм, который позволяет объекту этого класса получать оповещения об изменении состояния других объектов 
// и тем самым наблюдать за ними.

// Классы, на события которых другие классы подписываются, называются субъектами (Subjects),
// а подписывающиеся классы называются наблюдателями (англ. Observers).

// Назначение
// Определяет зависимость типа один ко многим между объектами таким образом, что при изменении состояния одного объекта все зависящие
// от него оповещаются об этом событии.

// Реализация
// При реализации шаблона «наблюдатель» обычно используются следующие классы:
// Observable — интерфейс, определяющий методы для добавления, удаления и оповещения наблюдателей;
// Observer — интерфейс, с помощью которого наблюдатель получает оповещение;
// ConcreteObservable — конкретный класс, который реализует интерфейс Observable;
// ConcreteObserver — конкретный класс, который реализует интерфейс Observer.

// Область применения
// - Шаблон «наблюдатель» применяется в тех случаях, когда система обладает следующими свойствами:
// - существует как минимум один объект, рассылающий сообщения;
// - имеется не менее одного получателя сообщений, причём их количество и состав могут изменяться во время работы приложения;
// - позволяет избежать сильного зацепления взаимодействующих классов.
// Данный шаблон часто применяют в ситуациях, в которых отправителя сообщений не интересует, что делают получатели с предоставленной им информацией.

// Дополнительная информация
// В платформе .NET Framework 4.0 шаблон разработки наблюдателя применяется путём реализации универсальных интерфейсов System.IObservable<T> и System.IObserver<T>

// Реализация (deguz optimizations)
class Observable {
  constructor() {
    this.listeners = {};
  }
  // Подписаться
  on(event, callback, isOnOnce = false) {
    if (typeof this.listeners[event] === 'undefined') {
      this.listeners[event] = {};
      this.listeners[event].callbacks = [];
      this.listeners[event].isOnOnce = isOnOnce;
    }
    this.listeners[event].callbacks.push(callback);
  }
  // Подписаться единожды
  once(event, callback) {
    this.on(event, callback, true);
  }
  // Отписаться
  off(event, callback) {
    if (typeof this.listeners[event] === 'undefined') return;
    this.listeners[event].callbacks = this.listeners[event].callbacks.filter((listener) => listener !== callback);
    if (!this.listeners[event].callbacks.length) delete this.listeners[event];
  }
  // Разослать сообщение подписчикам
  emit(event, data) {
    if (typeof this.listeners[event] === 'undefined') return;
    this.listeners[event].callbacks.forEach((listener) => {
      listener(data);
      if (this.listeners[event].isOnOnce) this.off(event, listener);
    });
  }
}

// Применение без расширения
const myObservable = new Observable();
// Добавляем два слушателя-колбэка
myObservable.on('hello', (data) => console.log(`"hello" event was emitted, the first callback was executed with data: `, data));
myObservable.on('hello', () => console.log(`"hello" event was emitted, the second callback was executed without data`, ));
myObservable.emit('hello', 'world'); // Вывод: ""hello" event was emitted, the first callback was executed with data:  world
// затем: "hello" event was emitted, the second callback was executed without data
myObservable.once('world', (data) => console.log(`"world" event was emitted only once, its callback was called with data: ${data}`));
myObservable.emit('world', 'yoyo'); // Вывод: "world" event was emitted only once, its callback was called with data: yoyo
myObservable.emit('world', 'yoyo'); // никакого вывода т.к. событие "world" однократное

// Применение с расширением
class HelloObservable extends Observable {
  constructor() {
    super();
    this.helloCount = 0;
  }
  sayHello() {
    console.log('Object says "Hello!"');
    this.helloCount++;
    this.emit('hello');
  }
}

const helloObservable = new HelloObservable();
helloObservable.on('hello', () => console.log('Object said "Hello!", total "Hello!" count: ', helloObservable.helloCount));
helloObservable.sayHello(); // Вывод: "Object says "Hello!"" и затем "Object said "Hello!", total "Hello!" count:   1
helloObservable.sayHello(); // Вывод: "Object says "Hello!"" и затем "Object said "Hello!", total "Hello!" count:   2
