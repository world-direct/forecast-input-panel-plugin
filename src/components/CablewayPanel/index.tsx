import { Alert, LoadingPlaceholder } from '@grafana/ui';
import { useMutation, useQuery } from 'react-query';

import EditComponent from './EditComponent';
import ICablewayForecast from '../../models/ICablewayForecast';
import LoadComponent from './LoadComponent';
import { NIL as NIL_UUID } from 'uuid';
import React from 'react';
import moment from 'moment';
import { useApiClient } from 'components/ApiClientProvider';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  userId: string;
};

const CablewayPanel: React.FC<Props> = ({ userId }) => {
  const [id, setId] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState<string | undefined>(undefined);

  const client = useApiClient();

  const { data, isLoading, refetch } = useQuery(
    ['getCablewayForecast', id],
    async () => {
      if (id === null) {
        return undefined;
      }

      if (id === NIL_UUID) {
        var result: ICablewayForecast = {
          id: NIL_UUID,
          scenario: '',
          power: 0,
          fromDate: moment().format('DD.MM.YYYY'),
          toDate: moment().format('DD.MM.YYYY'),
          fromTime: moment().format('HH:mm'),
          toTime: moment().format('HH:mm'),
        };
        return result;
      }

      return await client.getCablewayForecast(id);
    },
    {
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: () => {
        // setMessage(undefined);
      },
      onError: (error: any) => {
        if (error.status === 404) {
          setMessage('Eintrag nicht gefunden.');
          return;
        }
        setMessage('Fehler!');
      },
    }
  );

  const handleSave = async (forecast: ICablewayForecast): Promise<void> => {
    if (forecast.id === null) {
      setMessage('Fehler!');
      return;
    }

    if (forecast.id === NIL_UUID) {
      forecast.id = uuidv4();
      return await client.createCablewayForecast(userId, forecast);
    }

    return await client.updateCablewayForecast(userId, forecast);
  };

  const saveMutation = useMutation(handleSave, {
    onSuccess: () => {
      setMessage('Gespeichert!');
    },
    onError: () => {
      setMessage('Fehler!');
    },
  });

  const handleDelete = async (forecast: ICablewayForecast): Promise<void> => {
    if (forecast.id === null) {
      setMessage('Fehler!');
      return;
    }

    return await client.deleteCablewayForecast(forecast.id);
  };

  const deleteMutation = useMutation(handleDelete, {
    onSuccess: () => {
      setId(null);
      setMessage('Gelöscht!');
    },
    onError: () => {
      setMessage('Fehler!');
    },
  });

  const onCreate = (): void => {
    setMessage(undefined);
    setId(NIL_UUID);
  };

  const onReturn = (): void => {
    setMessage(undefined);
    setId(null);
  };

  const onLoad = (forecast: ICablewayForecast) => {
    setMessage(undefined);
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
          <Alert title={message} severity="info" onRemove={() => setMessage(undefined)} />
        ) : null}
        <LoadComponent onCreate={onCreate} onLoad={onLoad} />
      </>
    );
  }

  return (
    <>
      {message !== undefined ? <Alert title={message} severity="info" onRemove={() => setMessage(undefined)} /> : null}
      <EditComponent
        forecast={data}
        onReturn={onReturn}
        onSave={saveMutation.mutate}
        onDelete={deleteMutation.mutate}
      />
    </>
  );
};

export default CablewayPanel;
