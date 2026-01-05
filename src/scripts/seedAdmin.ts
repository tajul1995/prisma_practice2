import { Verification } from './../../generated/prisma/client';
import { prisma } from "../lib/prisma"
import { userRole } from "../middleware/auth"
// import fetch from "node-fetch"

const seedAdmin = async () => {
  try {
    const adminData = {
      name: "masum kahn",
      email: "masumkhan198989@gmail.com",
      role: userRole.ADMIN,
      password: "tajul1989@",
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: adminData.email },
    })

    if (existingUser) {
      throw new Error("User already exists")
    }

    const response = await fetch(
      "http://localhost:5000/api/auth/sign-up/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminData),
      }
    )


    if(response.ok){
        await prisma.user.update({
            where:{
                email:adminData.email
            },
            data:{
                emailVerified:true
            }


            
        })
    }

  } catch (error) {
    console.error(error)
  }
}

seedAdmin()
