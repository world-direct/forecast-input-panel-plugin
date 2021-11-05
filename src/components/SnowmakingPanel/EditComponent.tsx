import { Button, Field, FieldSet, Form, InlineLabel, Input, Label } from '@grafana/ui';

import ISnowmakingForecast from '../../models/ISnowmakingForecast';
import { NIL as NIL_UUID } from 'uuid';
import React from 'react';
import moment from 'moment';
import useStyles from './styles';

type Props = {
  forecast: ISnowmakingForecast;
  onSave: (dto: ISnowmakingForecast) => void;
  onDelete: (dto: ISnowmakingForecast) => void;
  onReturn: () => void;
};

const EditComponent: React.FC<Props> = (props) => {
  const { forecast, onSave, onDelete, onReturn } = props;
  const styles = useStyles();

  const onSubmit = (dto: ISnowmakingForecast) => {
    onSave(dto);
  };

  const handleDelete = () => {
    onDelete(forecast);
  };

  return (
    <Form defaultValues={forecast} onSubmit={onSubmit}>
      {({ register, errors, control, getValues }) => (
        <>
          <div className={styles.toolbar}>
            <Button icon="arrow-left" type="button" variant="secondary" onClick={onReturn} />
            <Button icon="save" type="submit" />
            <Button
              icon="trash-alt"
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={forecast.id === NIL_UUID}
            />
          </div>
          <FieldSet>
            <Label className={styles.title}>Szenario</Label>
            <Field invalid={!!errors.scenario} error={errors.scenario?.message}>
              <Input
                addonBefore={<InlineLabel className={styles.label}>Name</InlineLabel>}
                {...register('scenario', {
                  required: 'Bitte ausfüllen',
                })}
              />
            </Field>
            <Field invalid={!!errors.power} error={errors.power?.message}>
              <Input
                placeholder="0"
                addonBefore={<InlineLabel className={styles.label}>Leistung</InlineLabel>}
                addonAfter={<InlineLabel>kW</InlineLabel>}
                {...register('power', {
                  required: 'Bitte ausfüllen',
                  validate: (value) => {
                    if (value <= 0) {
                      return 'Wert ungültig (0 oder kleiner)';
                    }

                    return true;
                  },
                })}
              />
            </Field>
          </FieldSet>
          <FieldSet>
            <Label className={styles.title}>Zeitraum</Label>
            <Field invalid={!!errors.from} error={errors.from?.message}>
              <Input
                placeholder={moment().format('DD.MM.YYYY HH:mm')}
                addonBefore={<InlineLabel className={styles.label}>Von</InlineLabel>}
                {...register('from', {
                  required: 'Bitte ausfüllen',
                  validate: (value) => {
                    let a = moment(value, 'DD.MM.YYYY HH:mm');
                    if (!a.isValid()) {
                      return 'Ungültiges Format (DD.MM.YYYY HH:mm)';
                    }

                    let b = moment(getValues('to'), 'DD.MM.YYYY HH:mm');

                    if (a >= b) {
                      return 'Endzeit passt nicht zur Startzeit';
                    }

                    return true;
                  },
                })}
              />
            </Field>
            <Field invalid={!!errors.to} error={errors.to?.message}>
              <Input
                placeholder={moment().format('DD.MM.YYYY HH:mm')}
                addonBefore={<InlineLabel className={styles.label}>Bis</InlineLabel>}
                {...register('to', {
                  required: 'Bitte ausfüllen',
                  validate: (value) => {
                    let a = moment(getValues('from'), 'DD.MM.YYYY HH:mm');
                    let b = moment(value, 'DD.MM.YYYY HH:mm');

                    if (!b.isValid()) {
                      return 'Ungültiges Format (DD.MM.YYYY HH:mm)';
                    }

                    if (a >= b) {
                      return 'Endzeit passt nicht zur Startzeit';
                    }

                    return true;
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

export default EditComponent;
