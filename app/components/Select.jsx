import { useLoadingBarContext } from '@app/store/loading-bar'
import { useEffect, useRef, useState } from 'react'

const Select = ({
  defaultValue,
  options,
  type,
  disabled = false,
  label,
  updateFunction,
  lastValue,
}) => {
  const [isOpened, setIsOpened] = useState(false)
  const [value, setValue] = useState('')
  const [filteredOptions, setFilteredOptions] = useState([])

  const selectRef = useRef(null)

  const { setLoadingBar } = useLoadingBarContext()

  const filterSelectOptions = searchText => {
    const regex = new RegExp(value, 'i')
    return options.filter(
      item => regex.test(item.label) || regex.test(item._id)
    )
  }

  useEffect(() => {
    const handleDocumentClick = event => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpened(false)
        if (lastValue && options) {
          setValue(lastValue.label)
        }
      }
    }

    document.addEventListener('click', handleDocumentClick)

    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [lastValue])

  // Track if current input value exists in fetched options
  useEffect(() => {
    // If input has options
    const optionLabels = options?.map(option => option.label) || []

    if (!optionLabels.includes(value)) {
      setValue('')

      if (updateFunction) {
        updateFunction(null)
      }
    }
  }, [options])

  // If select is disabled, restart value to ''
  useEffect(() => {
    if (disabled) {
      setValue('')
    }
  }, [disabled])

  // update loading bar
  useEffect(() => {
    // if input has a value and has an options
    if (value && options) {
      setLoadingBar(prev => prev + 10)
    }

    // If input value is empty
    if (!value) {
      setLoadingBar(prev => prev - 10)
    }
  }, [value])

  const handleFocus = e => {
    setIsOpened(true)
    if (options) {
      setValue('')
    }
  }

  const handleClick = option => {
    // If input has options
    if (options) {
      updateFunction(option)

      setIsOpened(false)
      setValue(option.label)
    }
  }

  const handleChange = e => {
    setValue(e.target.value)
  }

  useEffect(() => {
    // If input has no options
    if (!options) {
      updateFunction(value)
    }

    // Filter options by value in the input
    if (options) {
      const filteredOptions = value ? filterSelectOptions(value) : []
      setFilteredOptions(filteredOptions)
    }
  }, [value])

  const handleClearInput = () => {
    setValue('')
    setIsOpened(false)
    updateFunction(null)
  }

  return (
    <div className="flex flex-col relative" ref={selectRef}>
      {label && <label className="text-sm">{label}</label>}
      <input
        className={`select-${type} bg-white cursor-context-menu}`}
        type="text"
        placeholder={defaultValue}
        onFocus={handleFocus}
        disabled={disabled}
        value={value}
        onChange={handleChange}
      />
      <ul
        className={`option absolute overflow-y-scroll max-h-[40vh] z-50 w-full flex-col bg-white ${
          isOpened ? 'flex' : 'hidden'
        }`}
      >
        <li
          className="py-2 px-2 hover:bg-gray-200 cursor-pointer border-b-[1px] border-gray-300"
          onClick={handleClearInput}
        >
          Clear input
        </li>
        {options &&
          !filteredOptions.length &&
          !value &&
          options.map((option, i) => (
            <li
              className={`py-2 px-2 hover:bg-gray-200 cursor-pointer ${
                i !== options.length - 1 && 'border-b-[1px] border-gray-300'
              }`}
              key={option._id}
              onClick={() => handleClick(option)}
            >
              {option.label}
            </li>
          ))}
        {filteredOptions &&
          filteredOptions.map((option, i) => (
            <li
              className={`py-2 px-2 hover:bg-gray-200 cursor-pointer ${
                i !== options.length - 1 && 'border-b-[1px] border-gray-300'
              }`}
              key={option._id}
              onClick={() => handleClick(option)}
            >
              {option.label}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Select
