import { QueryClient, QueryClientProvider } from 'react-query';
import { css, cx } from 'emotion';

import { ApiClient } from 'api';
import { ApiClientProvider } from 'components/ApiClientProvider';
import CablewayPanel from 'components/CablewayPanel';
import { PanelOptions } from 'types';
import { PanelProps } from '@grafana/data';
import React from 'react';
import SnowmakingPanel from 'components/SnowmakingPanel';
import useStyles from './styles';

interface Props extends PanelProps<PanelOptions> {}

const WrapperPanel: React.FC<Props> = (props) => {
  const { width, height, options } = props;

  const styles = useStyles();
  const queryClient = new QueryClient();
  const apiClient = new ApiClient({ username: options.username, password: options.password }, options.endpoint);

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <QueryClientProvider client={queryClient}>
        <ApiClientProvider client={apiClient}>
          {options.type === 'cableways' ? <CablewayPanel userId={options.username} /> : null}
          {options.type === 'snowmaking' ? <SnowmakingPanel userId={options.username} /> : null}
        </ApiClientProvider>
      </QueryClientProvider>
    </div>
  );
};

export default WrapperPanel;
