import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import { PrismaClient } from '@repo/database';
import async from '../page';
const prisma = new PrismaClient();

export const authOptions = {
    providers : [
        CredentialsProvider({
            name : 'Credentails',
            credentials : {
                username : {label : 'Username', type : 'text', placeholder : 'John@07'},
                email : {label : 'Email', type : 'text', placeholder : 'johndoe@gmail.com'},
                number : {label : 'Phone Number', type : 'text', placeholder : '+1 123-456-7890'},
                password : {label : 'Password', type : 'password'}
            },
            async authorize(credentails : any) {
                const hashedPassword = await bcrypt.hash(
                    credentails.password, 10
                );

                const exsistingUser = await prisma.user.findFirst({
                    where : {
                        number : credentails.number
                    }
                });

                // if user exist check validate password
                // otherwise return null
                // if user does not exist create a user profile
                if(exsistingUser) {
                    const passwordValidation = await bcrypt.compare(
                        credentails.password, exsistingUser.password
                    );

                    if( passwordValidation ) {
                        return {
                            id : exsistingUser.id,
                            name : exsistingUser.name,
                            email : exsistingUser.email,
                            number : exsistingUser.number,
                        }
                    }

                    return null;
                }

                try {
                    const user = await prisma.user.create({
                        data : {
                            name : credentails.username,
                            email : credentails.email,
                            number : credentails.number,
                            password : hashedPassword,
                        }
                    });

                    return {
                        id : user.id.toString(),
                        name : user.name,
                        email : user.email,
                        number : user.number,
                    }
                } catch (err) {
                    console.error(err);
                }

                return null;
            }
        })
    ],
    secret : process.env.JWT_SECRET || 'secret',
    callbacks : {
        async session( { token, session } : any) {
            session.user.id = token.sub
            return session;
        }
    }
}