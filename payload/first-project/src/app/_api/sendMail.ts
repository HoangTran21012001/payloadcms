

import payload from 'payload'

export async function sentDoc() {
  await payload.sendEmail({
    to: '486213azwq@gmail.com',
    subject: 'Message subject title',
    html: '<p>HTML based message</p>',
  })
}
