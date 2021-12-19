import jwt from "jsonwebtoken";


export const generateJWT = ( uid:string ) => {
    
    return new Promise( (resolve, reject)=>{
        
        const payload = { uid };
        
        jwt.sign(payload, process.env.JWT_KEY!,{
            
            expiresIn: '24h'

        }, ( err, token ) =>{

           if(err){
               console.log(err)
               reject('No se pudo generar el token')
           }else{
               resolve( token )
           }
        })
    })
};


export const comprobarJWT = (token:string ="") => {
    try {
       type tokenUID = { uid:string };

       const { uid } = jwt.verify(token, process.env.JWT_KEY!) as tokenUID;

       return [ true, uid ]

    } catch (error) {
       return [false, null]
    }
};
