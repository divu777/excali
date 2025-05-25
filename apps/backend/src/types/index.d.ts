

// declare module 'express-serve-static-core'{
//     export interface Request{
//         user?:string
//     }
// }

declare namespace Express{
    export interface Request{
        user:string
    }
}
