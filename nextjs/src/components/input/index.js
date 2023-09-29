import { forwardRef } from 'react';
import { FormControllWrapper } from './styled';

export default forwardRef(function Input({
  className = null,
  label = null,
  type = "text",
  errorMessage,
  value,
  ...rest
}, _) {
  const handleChange = (event) => {
    onChange && onChange(event.target.value);
  }

  return (
    <FormControllWrapper isInvalid={!!errorMessage} className={className}>
      <div className="label">{label}</div>
      <input type={type} autoComplete="off" {...rest} value={value} />
      <div className='error-message'>{errorMessage}</div>
    </FormControllWrapper>
  )
});
