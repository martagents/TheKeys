import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, addDays } from 'date-fns'

export interface DailyTask {
  id: string
  pillar: 'sharp' | 'fitness' | 'presence' | 'temple' | 'warrior'
  name: string
  completed: boolean
  frequency: 'daily' | 'weekly' | 'custom'
  customFrequency?: number // in days
  lastCompleted?: Date
  dueToday: boolean
}

export function isTaskDueToday(task: DailyTask, today: Date = new Date()): boolean {
  if (task.frequency === 'daily') {
    return true
  }

  if (task.frequency === 'custom' && task.customFrequency && task.lastCompleted) {
    const daysSinceCompleted = Math.floor(
      (today.getTime() - task.lastCompleted.getTime()) / (1000 * 60 * 60 * 24)
    )
    return daysSinceCompleted >= task.customFrequency
  }

  return false
}

export function getWeekRange(date: Date = new Date()) {
  return {
    start: startOfWeek(date, { weekStartsOn: 1 }), // Monday
    end: endOfWeek(date, { weekStartsOn: 1 }),
  }
}

export function getMonthRange(date: Date = new Date()) {
  return {
    start: startOfMonth(date),
    end: endOfMonth(date),
  }
}

export function getWeekDays(date: Date = new Date()): Date[] {
  const { start, end } = getWeekRange(date)
  return eachDayOfInterval({ start, end })
}

export function getMonthDays(date: Date = new Date()): Date[] {
  const { start, end } = getMonthRange(date)
  return eachDayOfInterval({ start, end })
}

export function formatDate(date: Date, formatStr: string = 'MMM d, yyyy'): string {
  return format(date, formatStr)
}

export { isSameDay, isToday, addDays }
