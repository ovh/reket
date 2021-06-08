import { ReketConfigItem } from './item';

export class ReketConfigClient extends ReketConfigItem {
  set(reketClient) {
    if (Object.getPrototypeOf(reketClient.constructor).name !== 'ReketClient') {
      throw new Error(
        '[ReketConfigClient.set]: reketClient must be an instance of ReketClient.',
      );
    }

    super.set(reketClient);
  }
}

export default {
  ReketConfigClient,
};
