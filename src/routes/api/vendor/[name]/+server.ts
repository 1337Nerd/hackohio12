import { json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async({ params, fetch }) => {
    const { name } = params
    const res = await fetch(`https://vulnerability.circl.lu/api/browse/${name?.toLowerCase()}`)
    const data = await res.json()
    return json(data)
}