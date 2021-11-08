import { Alert, LoadingPlaceholder } from '@grafana/ui';
import { useMutation, useQuery } from 'react-query';

import EditComponent from './EditComponent';
import ISnowmakingForecast from '../../models/ISnowmakingForecast';
import LoadComponent from './LoadComponent';
import { NIL as NIL_UUID } from 'uuid';
import React from 'react';
import debounce from 'lodash.debounce';
import moment from 'moment';
import { useApiClient } from 'components/ApiClientProvider';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  userId: string;
};

const SnowmakingPanel: React.FC<Props> = ({ userId }) => {
  const [id, setId] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState<string | undefined>(undefined);

  const client = useApiClient();

  const updateMessage = (message: string | undefined) => {
    setMessage(message);
    if (message !== undefined) {
      debounce(() => setMessage(undefined), 3000)();
    }
  };

  const { data, isLoading, refetch } = useQuery(
    ['getSnowmakingForecast', id],
    async () => {
      if (id === null) {
        return undefined;
      }

      if (id === NIL_UUID) {
        var result: ISnowmakingForecast = {
          id: NIL_UUID,
          scenario: '',
          power: 0,
          from: moment().format('DD.MM.YYYY HH:mm'),
          to: moment().format('DD.MM.YYYY HH:mm'),
        };
        return result;
      }

      return await client.getSnowmakingForecast(id);
    },
    {
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: () => {
        // updateMessage(undefined);
      },
      onError: (error: any) => {
        if (error.status === 404) {
          updateMessage('Eintrag nicht gefunden.');
          return;
        }
        updateMessage('Fehler!');
      },
    }
  );

  const handleSave = async (forecast: ISnowmakingForecast): Promise<void> => {
    if (forecast.id === null) {
      updateMessage('Fehler!');
      return;
    }

    if (forecast.id === NIL_UUID) {
      forecast.id = uuidv4();
      return await client.createSnowmakingForecast(userId, forecast);
    }

    return await client.updateSnowmakingForecast(userId, forecast);
  };

  const saveMutation = useMutation(handleSave, {
    onSuccess: () => {
      setId(null);
      updateMessage('Gespeichert!');
    },
    onError: () => {
      updateMessage('Fehler!');
    },
  });

  const handleDelete = async (forecast: ISnowmakingForecast): Promise<void> => {
    if (forecast.id === null) {
      updateMessage('Fehler!');
      return;
    }

    return await client.deleteSnowmakingForecast(forecast.id);
  };

  const deleteMutation = useMutation(handleDelete, {
    onSuccess: () => {
      setId(null);
      updateMessage('Gelöscht!');
    },
    onError: () => {
      updateMessage('Fehler!');
    },
  });

  const onCreate = (): void => {
    updateMessage(undefined);
    setId(NIL_UUID);
  };

  const onReturn = (): void => {
    updateMessage(undefined);
    setId(null);
  };

  const onLoad = (forecast: ISnowmakingForecast) => {
    updateMessage(undefined);
    setId(forecast.id);
    refetch();
  };

  if (isLoading) {
    return <LoadingPlaceholder text="Bitte warten..." />;
  }

  if (data === undefined) {
    return (
      <>
        {message !== undefined ? (
          <Alert title={message} severity="info" onRemove={() => updateMessage(undefined)} />
        ) : null}
        <LoadComponent onCreate={onCreate} onLoad={onLoad} />
      </>
    );
  }

  return (
    <>
      {message !== undefined ? (
        <Alert title={message} severity="info" onRemove={() => updateMessage(undefined)} />
      ) : null}
      <EditComponent
        forecast={data}
        onReturn={onReturn}
        onSave={saveMutation.mutate}
        onDelete={deleteMutation.mutate}
      />
    </>
  );
};

export default SnowmakingPanel;
