import { nanoid } from 'nanoid';
import {reactive, ref} from 'vue';
import { get, set } from 'lodash';
let cache = {};
class Store {
  constructor (data, methods) {
    this.$data = reactive(data || {})
    if (methods) {
      
      var k;
      for(k in methods) {
        this[k] = methods[k].bind(this)
      }

      if (this.init) {
        this.init.call(this)
      }
    }
  }
  set (path, val) {
    set(this.$data, path, val);
  }
  get (path) {
    return get(this.$data, path);
  }
}

export const createStore = (name, obj) => {
  const data = obj.data || {};
  if (obj.data) delete obj.data;
  if (!cache[name]) {
    cache[name] = new Store(data, obj);
  }
  return cache[name];
}