import { nanoid } from 'nanoid';
import {reactive, ref, readonly} from 'vue';
import { get, set } from 'lodash';
let cache = {};
class Store {
  constructor (data, ctx, methods) {
    this.$data = reactive(data || {})
    this.$ctx = readonly(ctx || {})

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
  const ctx = obj.ctx || {};
  if (obj.data) delete obj.data;
  if (obj.ctx) delete obj.ctx;
  if (!cache[name]) {
    cache[name] = new Store(data, ctx, obj);
  }
  return cache[name];
}