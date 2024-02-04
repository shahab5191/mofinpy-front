'use client'
import { themeOptions } from "@/app/theme"
import axiosInstance from "@/app/utils/axios-instance"
import { ThemeProvider } from "@emotion/react"
import { Button, Checkbox, CssBaseline, FormControlLabel, Input, Link, Typography } from "@mui/material"
import { AxiosError } from "axios"
import { SubmitHandler, useForm } from "react-hook-form"

interface Props { }
type Inputs = {
  email: string,
  password: string,
  remember: boolean
}

const Login = (props: Props) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const result = await axiosInstance.post('/users/signin', {
      email: data.email,
      password: data.password
    })
      .catch((err: AxiosError) => {
      })
  }
  return (
    <>
      <ThemeProvider theme={themeOptions}>
        <CssBaseline />
        <div
          className="w-full h-full flex justify-center items-center"
        >
          <div
            className="w-max min-w-[300px] h-max p-5 bg-[#171717] bg-opacity-60 rounded-md"
          >
            <h1 className="font-light text-center text-2xl mb-2">
              Login
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <input
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Please enter valid email!"
                  }
                })}
                placeholder="Email"
                type="email"
                className="text-white p-2 rounded-md bg-[#151518] bg-opacity-65 border-[1px] border-[#2e2e2e] placeholder:text-white min-w-[250px] outline-none focus-visible:bg-[#202025] transition-colors"
              />
              {errors.email && <span className="text-xs text-red-400">{errors.email.message}</span>}
              <input
                {...register("password", { required: true })}
                placeholder="Password"
                type="password"
                className="text-white p-2 rounded-md bg-[#151518] bg-opacity-65 border-[1px] border-[#2e2e2e] placeholder:text-white min-w-[250px] outline-none focus-visible:bg-[#202025] transition-colors"
              />
              {errors.password && <span className="text-xs text-red-400">Password is required</span>}
              <div className="flex justify-between items-center">
                <FormControlLabel
                  {...register("remember")}
                  control={
                    <Checkbox />
                  }
                  label={<Typography variant="body2" className="font-light text-xs">Remember</Typography>}
                />
                <Link className="no-underline text-xs" href="/user/reset_password">Forgot your password?</Link>
              </div>
              <Button type="submit" className="font-light" variant="contained">Login</Button>
              <hr className="h-[1px] w-full bg-[#2e2e2e]" />
              <p className="text-xs">Don&apos;t have an account? <Link href="/user/signup" className="no-underline text-xs">Signup</Link></p>
            </form>
          </div>
        </div>
      </ThemeProvider>
    </>
  )
}

export default Login
