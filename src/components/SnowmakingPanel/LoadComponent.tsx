import { Button, Field, FieldSet, Form, InlineLabel, Input, Label } from '@grafana/ui';

import ISnowmakingForecast from 'models/ISnowmakingForecast';
import React from 'react';
import useStyles from './styles';

type Props = Readonly<{
  onLoad: (forecast: ISnowmakingForecast) => void;
  onCreate: () => void;
}>;

const LoadComponent: React.FC<Props> = (props) => {
  const { onLoad, onCreate } = props;
  const styles = useStyles();

  const onSubmit = (forecast: ISnowmakingForecast) => {
    onLoad(forecast);
  };

  return (
    <Form onSubmit={onSubmit}>
      {({ register, errors }) => (
        <>
          <div className={styles.toolbar}>
            <Button icon="edit" type="submit" variant="primary" />
            <Button icon="plus" type="button" className={styles.add} onClick={onCreate} />
          </div>
          <FieldSet>
            <Label className={styles.title}>Auswahl</Label>
            <Field invalid={!!errors.id} error={errors.id?.message}>
              <Input
                placeholder="00000000-0000-0000-0000-000000000000"
                addonBefore={<InlineLabel className={styles.label}>Id</InlineLabel>}
                {...register('id', {
                  required: 'Bitte ausfüllen',
                  pattern: {
                    value: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
                    message: 'Ungültiges Format',
                  },
                })}
              />
            </Field>
          </FieldSet>
        </>
      )}
    </Form>
  );
};

export default LoadComponent;
