import { ReketHook } from '../hook';

export class ReketConfigHooks {
  #response = new ReketHook();

  get response() {
    return this.#response;
  }
}

export default {
  ReketConfigHooks,
};
