import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useLang } from '@/lib'
import { Notif } from '../Notif'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()
    const params = useParams()
    const { Lang, local } = useLang();

    const { data: user, error, mutate } = useSWR('/user', () =>
        axios
            .get('/user')
            .then(res => res.data)
            .catch(error => {
                if (error?.response?.status !== 409) throw error

                router.push('/verify-email')
            }),
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const register = async ({ setErrors, ...props }) => {
        await csrf()

        setErrors([])

        axios
            .post('/register', props)
            .then(() => {
                mutate()
                Notif('success', Lang('public.email_send'))
            })
            .catch(error => {
                if (error?.response?.status !== 422) throw error

                setErrors(error?.response?.data.errors)
            })
    }

    const login = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/login', props)
            .then(() => mutate())
            .catch(error => {
                if (error?.response?.status !== 422 && error?.response?.status !== 500) throw error

                if (error?.response?.data.message === 'This password does not use the Bcrypt algorithm.') {
                    Notif('error', Lang('public.you_login_by_gmail'),'9000')
                }

                setErrors(error?.response?.data.errors)
            })
    }

    const forgotPassword = async ({ setErrors, setStatus, email }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error?.response?.status !== 422) throw error

                setErrors(error?.response?.data?.errors)
            })
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/reset-password', { token: params.token, ...props })
            .then(response =>
                router.push('/' + local + '/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error?.response?.status !== 422) throw error

                setErrors(error?.response?.data?.errors)
            })
    }

    const resendEmailVerification = ({ setStatus }) => {
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    const logout = async () => {
        if (!error) {
            await axios.post('/logout').then(() => mutate())
        }

        window.location.pathname = '/' + local + '/login'
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated)
        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at
        )
            router.push(redirectIfAuthenticated)
            
        if (middleware === 'auth' && error) logout()
    }, [user, error])

    return {
        user,
        register,
        login,
        mutate,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}