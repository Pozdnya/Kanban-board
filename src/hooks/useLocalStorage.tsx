import { useEffect, useState } from "react"

export function useLocalStorage(initialValue: unknown, field: string = 'issues') {
  const getStorage = () => {
    const storage = localStorage.getItem(field)

    if (storage) {
      return JSON.parse(storage)
    }

    return initialValue;
  }

  const [value, setValue] = useState(() => getStorage())

  useEffect(() => {
    localStorage.setItem(field, JSON.stringify(value)
    )
  }, [field, value])

  return [value, setValue]
}
