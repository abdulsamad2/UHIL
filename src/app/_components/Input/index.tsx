import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

import classes from './index.module.scss'

type Props = {
  name: string
  label: string
  register: UseFormRegister<FieldValues & any>
  required?: boolean
  error: any
  type?: 'text' | 'textarea' | 'number' | 'password' | 'email' | 'select'
  validate?: (value: string) => boolean | string
  placeholder?: string
  disabled?: boolean
  options?: { value: string; label: string }[] // Options for select input
}

export const Input: React.FC<Props> = ({
  name,
  label,
  required,
  register,
  error,
  type = 'text',
  validate,
  placeholder,
  disabled,
  options, // Destructure options
}) => {
  return (
    <div className={classes.inputWrap}>
      <label htmlFor={name} className={classes.label}>
        {label}
        {required ? <span className={classes.asterisk}>&nbsp;*</span> : ''}
      </label>
      {type === 'textarea' ? (
        <textarea
          className={[classes.input, classes.textarea, error && classes.error]
            .filter(Boolean)
            .join(' ')}
          rows={3}
          placeholder={placeholder}
          {...register(name, {
            required,
            validate,
          })}
          disabled={disabled}
        />
      ) : type === 'select' ? (
        <select
          className={[classes.input, error && classes.error].filter(Boolean).join(' ')}
          {...register(name, { required, validate })}
          disabled={disabled}
        >
          {options?.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          className={[classes.input, error && classes.error].filter(Boolean).join(' ')}
          type={type}
          placeholder={placeholder}
          {...register(name, {
            required,
            validate,
            ...(type === 'email'
              ? {
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Please enter a valid email',
                  },
                }
              : {}),
          })}
          disabled={disabled}
        />
      )}

      {error && (
        <div className={classes.errorMessage}>
          {!error?.message && error?.type === 'required'
            ? 'This field is required'
            : error?.message}
        </div>
      )}
    </div>
  )
}
