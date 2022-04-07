/*
 * @Author: yinhang 
 * @Date: 2021-06-10 19:56:17 
 * @Last Modified by: yinhang
 * @Last Modified time: 2022-04-07 17:54:05
 * @desc 备忘录模式
 */

// 备忘类
class Memento {
  constructor(content) {
    this.content = content;
  }

  getContent() {
    return this.content;
  }
}

// 备忘列表
class CarTaker {
  constructor() {
    this.list = [];
  }

  add(memento) {
    this.list.push(memento);
  }

  get(index) {
    return this.list[index];
  }

  getList() {
    return this.list
  }
}

// 编辑器
class Editor {
  constructor() {
    this.content = null;
  }

  setContent(content) {
    this.content = content;
  }

  getContent() {
    return this.content;
  }

  saveContentToMemento() {
    return new Memento(this.content);
  }

  getConentFromMemento(memento) {
    this.content = memento.getContent();
  }
}