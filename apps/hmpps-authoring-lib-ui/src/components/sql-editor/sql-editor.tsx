'use client';

import { type FC } from 'react';
import classNames from 'classnames';
import CodeMirror, { type ReactCodeMirrorProps } from '@uiw/react-codemirror';
import { type SQLConfig, sql } from '@codemirror/lang-sql';
import './sql-editor.scss';

export type SQLEditorConfig = SQLConfig;

const DEFAULT_CONFIG: SQLEditorConfig = {
  upperCaseKeywords: true,
};

export interface SQLEditorProps extends ReactCodeMirrorProps {
  hasError?: boolean;
  config?: SQLEditorConfig;
}

export const SQLEditor: FC<SQLEditorProps> = ({
  className,
  hasError,
  config = {},
  extensions = [],
  ...restProps
}) => (
  <CodeMirror
    className={classNames(
      'sql-editor',
      {
        'sql-editor--error': hasError,
      },
      className,
    )}
    extensions={[sql({ ...DEFAULT_CONFIG, ...config }), ...extensions]}
    width="100%"
    height="100%"
    {...restProps}
  />
);
