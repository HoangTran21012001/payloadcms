'use server'
import { sentDoc } from './sendMail'

export const actionSentMail = async () => {
  sentDoc()
}
