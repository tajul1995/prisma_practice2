import app from "./app";
import { prisma } from "./lib/prisma";
const port =process.env.PORT

async function main(){
    try {
        await prisma.$connect()
        console.log('database connected successfully ')
        app.listen(port,()=>{
            console.log(`database running on port${port}`)
        })

        
    } catch (error) {
       await prisma.$disconnect() 
       process.exit(1)
    }
}
main()