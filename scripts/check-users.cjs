const { PrismaClient } = require('.prisma/client')
const db = new PrismaClient({ datasourceUrl: 'file:../prisma/dev.db' })
db.user.findMany().then(u => {
  console.log('Users in DB:', JSON.stringify(u, null, 2))
  return db.$disconnect()
}).catch(e => {
  console.error('Error:', e.message)
  db.$disconnect()
})
