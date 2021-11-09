import { QueryClient, QueryClientProvider } from 'react-query';
import React, { useEffect, useState } from 'react';
import { css, cx } from 'emotion';

import { ApiClient } from 'api';
import { ApiClientProvider } from 'components/ApiClientProvider';
import CablewayPanel from 'components/CablewayPanel';
import { LoadingPlaceholder } from '@grafana/ui';
import { PanelOptions } from 'types';
import { PanelProps } from '@grafana/data';
import SnowmakingPanel from 'components/SnowmakingPanel';
import useStyles from './styles';

interface Props extends PanelProps<PanelOptions> {}

async function encrypt(message: string) {
  const data = new TextEncoder().encode(message);
  const hash = await window.crypto.subtle.digest('SHA-256', data);
  const array = Array.from(new Uint8Array(hash));
  const hex = array.map((e) => ('00' + e.toString(16)).slice(-2)).join('');

  return hex;
}

const WrapperPanel: React.FC<Props> = (props) => {
  const { width, height, options, replaceVariables } = props;
  const [apiClient, setApiClient] = useState<ApiClient | undefined>(undefined);

  const styles = useStyles();
  const id = replaceVariables('${__user.id}');
  const username = replaceVariables('${__user.login}');

  useEffect(() => {
    encrypt(`${id}_${username}`).then((password) =>
      setApiClient(new ApiClient({ username: id, password: password }, options.endpoint))
    );
  });

  const queryClient = new QueryClient();

  if (apiClient === undefined) {
    return <LoadingPlaceholder text="Bitte warten..." />;
  }

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
          {options.type === 'cableways' ? <CablewayPanel userId={Number(id)} /> : null}
          {options.type === 'snowmaking' ? <SnowmakingPanel userId={Number(id)} /> : null}
        </ApiClientProvider>
      </QueryClientProvider>
    </div>
  );
};

export default WrapperPanel;
