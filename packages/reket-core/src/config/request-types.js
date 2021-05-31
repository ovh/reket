export class ReketConfigRequestTypes {
  #requestTypes = new Map();

  get size() {
    return this.#requestTypes.size;
  }

  add(typesOrType, typePrefix) {
    if (typeof typesOrType === 'string') {
      this.#requestTypes.set(typesOrType, typePrefix);
    } else if (Array.isArray(typesOrType)) {
      typesOrType.forEach(({ type, urlPrefix }) => {
        this.#requestTypes.set(type, urlPrefix);
      });
    }
  }

  getUrlPrefix(requestType) {
    return this.#requestTypes.get(requestType);
  }

  getDefaultUrlPrefix() {
    return this.getUrlPrefix(this.#requestTypes.keys().next().value);
  }
}

export default {
  ReketConfigRequestTypes,
};
