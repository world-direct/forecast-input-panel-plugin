import { PanelOptions } from './types';
import { PanelPlugin } from '@grafana/data';
import WrapperPanel from 'components/WrapperPanel';

export const plugin = new PanelPlugin<PanelOptions>(WrapperPanel).setPanelOptions((builder) => {
  return builder
    .addTextInput({
      path: 'endpoint',
      name: 'API Endpoint URL',
    })
    .addTextInput({
      path: 'username',
      name: 'User Identification',
    })
    .addTextInput({
      path: 'password',
      name: 'User Password',
    })
    .addRadio({
      path: 'type',
      defaultValue: 'cableways',
      name: 'Paneltyp',
      settings: {
        options: [
          {
            value: 'cableways',
            label: 'Lifte',
          },
          {
            value: 'snowmaking',
            label: 'Beschneiung',
          },
        ],
      },
    });
});
