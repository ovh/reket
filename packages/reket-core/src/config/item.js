export class ReketConfigItem {
  #value;

  get value() {
    return this.#value;
  }

  set(value) {
    this.#value = value;
  }
}

export default {
  ReketConfigItem,
};
