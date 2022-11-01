/**
 * 存储
 */
export const setItem = (key: string, value: any) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}

/**
 * 获取
 */
export const getItem = (key: string) => {
  const data = localStorage.getItem(key) || ''
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

/**
 * 删除指定数据
 */
export const removeItem = (key: string) => {
  localStorage.removeItem(key)
}

/**
 * 删除所有数据
 */
export const clearStorage = () => {
  localStorage.clear()
}
