'use client'

import { UseControllerProps, useController } from 'react-hook-form'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import { cn } from '@/lib/utils'

type DateInputProps = {
  label: string
  type?: string
  showLabel?: string
} & UseControllerProps &
  Partial<ReactDatePickerProps>

const DateInput: React.FC<DateInputProps> = (props) => {
  const { fieldState, field } = useController({ ...props, defaultValue: '' })

  return (
    <div className="block">
      <DatePicker
        {...props}
        {...field}
        onChange={(value) => field.onChange(value)}
        selected={field.value}
        placeholderText={props.label}
        className={cn(
          'rounded-lg w-[100%] flex flex-col',
          fieldState.error
            ? 'bg-red-50 border-red-500 text-red-900'
            : !fieldState.invalid && fieldState.isDirty
            ? 'bg-green-50 border-green-500 text-green-900'
            : ''
        )}
      />
      {fieldState.error && (
        <div className="text-red-500 text-sm">{fieldState.error.message}</div>
      )}
    </div>
  )
}

export default DateInput