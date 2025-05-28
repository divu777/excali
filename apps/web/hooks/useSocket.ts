import { useEffect, useState } from "react"


export const useSocket = ()=>{
    const [ws,setWebSocket] = useState<WebSocket| null >()
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        const ws= new WebSocket(process.env.WEB_SOCKET_URL ?? "ws://localhost:4000?token=")
        ws.onopen=()=>{

            setWebSocket(ws)
            setLoading(false)
        }
        ws.onclose=()=>{
            setLoading(true)
            setWebSocket(null)
        }
    },[])

    return {ws, loading}
}