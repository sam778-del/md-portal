"use client"

export const Button = ({ children, onClick, className, disabled, ...props }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`py-2 px-4 rounded-lg text-white transition-colors duration-200 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export const Checkbox = ({ id, checked, onCheckedChange, className, ...props }) => {
  return (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      className={`cursor-pointer peer ${className}`}
      {...props}
    />
  )
}

