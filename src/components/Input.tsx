import React, { forwardRef } from 'react'
import { ChangeHandler, Controller, FieldError, Merge } from 'react-hook-form'
import Select from 'react-select'
import { customStyles } from '../utils/selectCustomStyles'

type Props = {
  type: 'password' | 'text' | 'textarea' | 'email' | 'select'
  isMulti?: boolean
  id: string
  half: boolean
  label: string
  error: string | undefined
  control?: any
  name?: string
  onChange?: ChangeHandler
  onBlur?: ChangeHandler
  ref?: React.Ref<any>
}

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  let component =
    props.type === 'select' ? (
      <Controller
        name={props.id}
        control={props.control}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Select
            onChange={onChange}
            isMulti={props.isMulti}
            onBlur={onBlur}
            value={value}
            ref={ref}
            styles={{
              ...customStyles
            }}
            isClearable
            isSearchable
            options={options}
          />
        )}
      />
    ) : (
      <input
        type='text'
        id={props.id}
        name={props.name}
        onChange={props.onChange}
        onBlur={props.onBlur}
        ref={ref}
        className='w-full py-2 px-4 text-gray-500 focus:text-gray-700 font-semibold rounded-lg shadow-md outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75'
      />
    )
  return (
    <div className={`${props.half ? 'w-1/2' : 'w-full'}`}>
      <label
        htmlFor={`${props.id}`}
        className='block pb-1 pl-1 text-gray-500 font-semibold'
      >
        {props.label}
      </label>
      {component}
      {props.error && (
        <p className='text-red-400 text-xs font-semibold'>*{props.error}</p>
      )}
    </div>
  )
})

export default Input
