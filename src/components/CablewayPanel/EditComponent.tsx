import { Button, Field, FieldSet, Form, InlineLabel, Input, Label } from '@grafana/ui';

import ICablewaysForecast from '../../models/ICablewayForecast';
import { NIL as NIL_UUID } from 'uuid';
import React from 'react';
import moment from 'moment';
import useStyles from './styles';

type Props = {
  forecast: ICablewaysForecast;
  onSave: (dto: ICablewaysForecast) => void;
  onDelete: (dto: ICablewaysForecast) => void;
  onReturn: () => void;
};

const EditComponent: React.FC<Props> = (props) => {
  const { forecast, onSave, onDelete, onReturn } = props;
  const styles = useStyles();

  const onSubmit = (dto: ICablewaysForecast) => {
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
            <Field invalid={!!errors.fromDate} error={errors.fromDate?.message}>
              <Input
                placeholder={moment().format('DD.MM.YYYY')}
                addonBefore={<InlineLabel className={styles.label}>Von</InlineLabel>}
                {...register('fromDate', {
                  required: 'Bitte ausfüllen',
                  validate: (value) => {
                    let a = moment(value, 'DD.MM.YYYY');
                    if (!a.isValid()) {
                      return 'Ungültiges Format (DD.MM.YYYY)';
                    }

                    let b = moment(getValues('toDate'), 'DD.MM.YYYY');

                    if (a > b) {
                      return 'Enddatum passt nicht zum Startdatum';
                    }

                    return true;
                  },
                })}
              />
            </Field>
            <Field invalid={!!errors.toDate} error={errors.toDate?.message}>
              <Input
                placeholder={moment().format('DD.MM.YYYY')}
                addonBefore={<InlineLabel className={styles.label}>Bis</InlineLabel>}
                {...register('toDate', {
                  required: 'Bitte ausfüllen',
                  validate: (value) => {
                    let a = moment(getValues('fromDate'), 'DD.MM.YYYY');
                    let b = moment(value, 'DD.MM.YYYY');

                    if (!b.isValid()) {
                      return 'Ungültiges Format (DD.MM.YYYY)';
                    }

                    if (a > b) {
                      return 'Enddatum passt nicht zum Startdatum';
                    }

                    return true;
                  },
                })}
              />
            </Field>
          </FieldSet>
          <FieldSet>
            <Label className={styles.title}>Betriebszeit</Label>
            <Field invalid={!!errors.fromTime} error={errors.fromTime?.message}>
              <Input
                placeholder={moment().format('HH:mm')}
                addonBefore={<InlineLabel className={styles.label}>Von</InlineLabel>}
                {...register('fromTime', {
                  required: 'Bitte ausfüllen',
                  pattern: {
                    value: /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
                    message: 'Ungültiges Format (HH:mm)',
                  },
                  validate: (value) => {
                    let a = moment(value, 'HH:mm');
                    let b = moment(getValues('toTime'), 'HH:mm');

                    if (a >= b) {
                      return 'Endzeit passt nicht zur Startzeit';
                    }

                    return true;
                  },
                })}
              />
            </Field>
            <Field invalid={!!errors.toTime} error={errors.toTime?.message}>
              <Input
                placeholder={moment().format('HH:mm')}
                addonBefore={<InlineLabel className={styles.label}>Bis</InlineLabel>}
                {...register('toTime', {
                  required: 'Bitte ausfüllen',
                  pattern: {
                    value: /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
                    message: 'Ungültiges Format (HH:mm)',
                  },
                  validate: (value) => {
                    let a = moment(getValues('fromTime'), 'HH:mm');
                    let b = moment(value, 'HH:mm');

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
