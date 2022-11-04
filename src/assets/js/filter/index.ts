import dayjs from 'dayjs'
import { App } from 'vue'

/**
 *
 * @param val 时间戳
 * @param format 格式
 * @returns 指定格式的日期
 */
const dateFilter = (val: number, format: string = 'YYYY-MM-DD') => {
  return dayjs(val).format(format)
}
export default (app: App) => {
  app.config.globalProperties.$filters = {
    dateFilter,
  }
}
