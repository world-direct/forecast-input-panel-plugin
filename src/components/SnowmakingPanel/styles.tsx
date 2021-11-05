import { css } from 'emotion';
import { stylesFactory } from '@grafana/ui';

const useStyles = stylesFactory(() => {
  return {
    toolbar: css`
      text-align: end;
      margin: 8px 0 16px 0;
      & > Button {
        margin-left: 4px;
      }
    `,
    title: css`
      margin-bottom: 8px;
    `,
    label: css`
      width: 100px;
    `,
    add: css`
      background-color: #4caf50;
    `,
  };
});

export default useStyles;
