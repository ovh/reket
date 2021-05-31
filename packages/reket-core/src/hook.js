export class ReketHook {
  #onSuccess;

  get onSuccess() {
    return this.#onSuccess;
  }

  #onError;

  get onError() {
    return this.#onError;
  }

  constructor(successFn, errorFn) {
    this.set(successFn, errorFn);
  }

  set(successFn, errorFn) {
    if (successFn) {
      if (typeof successFn !== 'function') {
        throw new Error('[ReketHook.set]: successFn param must be a function.');
      }

      this.#onSuccess = successFn;
    }

    if (errorFn) {
      if (typeof errorFn !== 'function') {
        throw new Error('[ReketHook.set]: errorFn param must be a function.');
      }

      this.#onError = errorFn;
    }
  }
}

export default {
  ReketHook,
};
