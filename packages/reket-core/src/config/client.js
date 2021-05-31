import { ReketConfigItem } from './item';
import { ReketClient } from '../client';

export class ReketConfigClient extends ReketConfigItem {
  set(reketClient) {
    if (!(reketClient instanceof ReketClient)) {
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
