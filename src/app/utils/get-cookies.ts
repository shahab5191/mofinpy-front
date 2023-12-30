import { getCookie } from "cookies-next"

export const isServer = (typeof window === 'undefined')
// TODO: Make this shit work
// currently it is not returning token
export const getCookieByName = async (name: string) => {
  if (isServer) {
    const { cookies } = await import('next/headers')
    const token = cookies().get(name)?.value
    return token
  } else {
    const token = getCookie(name)
    console.log(token)
    return getCookie(name)
  }
}
