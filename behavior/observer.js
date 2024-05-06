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

// Реализации
class Observable {
  constructor() {
    this.listeners = {};
  }
  // Подписаться
  on(event, callback) {
    if (this.listeners[event] == undefined) {
      this.listeners[event] = {};
      this.listeners[event].eventProperty = {};
      this.listeners[event].eventProperty.isOnOnce = false;
      this.listeners[event].data = [];
    }
    this.listeners[event].data.push(callback);
  }
  // Подписаться единожды
  onOnce(event, callback) {
    this.on(event, callback);
    this.listeners[event].eventProperty.isOnOnce = true;
  }
  // Отписаться
  off(event, callback) {
    this.listeners[event].data = this.listeners[event].data.
    filter(function (listener) {
      return listener !== callback;
    });
  }
  // Разослать сообщение подписчикам
  emit(event, data) {
    if (this.listeners[event] == undefined || this.listeners[event].data == undefined) {
      return;
    }
    let itObj = this;
    this.listeners[event].data.forEach(listener => {
      if (itObj.listeners[event].eventProperty.isOnOnce) {
        itObj.off(event, itObj.listeners[event].data[0]);
      }
      listener(data);
    });
  }
}