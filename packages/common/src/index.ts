import { z } from 'zod'

export const config ={
    "JWT_SECRET":process.env.JWT_KEY ?? "supersecretpassword",
}


export const SignupSchema=z.object({
    name:z.string({message:"Name not valid"}),
    email:z.string().email({message:"Invalid Email"}),
    password:z.string().min(6).max(20,{message:"Invalid password"})
})

export const SigninSchema=z.object({
    email:z.string().email({message:"invalid email"}),
    password:z.string().min(6).max(20,{message:"Invalid password"})
})


export const CreateRoomSchema= z.object({
    name:z.string().min(6).max(15,{message:"Invalid name for creating a room"})
})

export type Signintype = z.infer<typeof SigninSchema>
export type SignupType = z.infer<typeof SignupSchema>