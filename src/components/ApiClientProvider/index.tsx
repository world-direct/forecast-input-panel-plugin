import { ApiClient, IApiClient } from 'api';
import React, { useContext } from 'react';

const defaultState: IApiClient = new ApiClient({ username: '', password: '' }, '');

const ApiClientContext = React.createContext<IApiClient>(defaultState);

export const useApiClient = () => useContext(ApiClientContext);

interface Props {
  client: IApiClient;
}

export const ApiClientProvider: React.FC<Props> = ({ client, children }) => {
  return <ApiClientContext.Provider value={client}>{children}</ApiClientContext.Provider>;
};
