"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { signup } from '@/app/actions/users'
import { useRouter } from 'next/navigation'

function SignUp() {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const handleSubmit = (formData: FormData) => {
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        startTransition(async () => {
            const error = await signup(email, password)
            if (error?.errorMessage) toast.error(error.errorMessage)
            toast.success("Check your email to verify your account")
            router.replace('/login')
        })
    }

    return (
        <div className="mt-20 flex flex-1 flex-col items-center">
            <Card className="w-[350px]">
                <CardHeader className='"mb-4'>
                    <CardTitle className='text-center text-3xl text-brand-300'>Sign up</CardTitle>
                </CardHeader>
                <form action={handleSubmit}>
                    <CardContent>
                        <div className='grid w-full items-center gap-y-6'>
                            <div className='flex flex-col gap-y-1.5'>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="text" required disabled={isPending} placeholder='Enter your email' />
                            </div>
                            <div className='flex flex-col gap-y-1.5'>
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" name="password" type="password" required disabled={isPending} placeholder='Type your password' />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className='mt-6 flex flex-col gap-y-4'>
                        <Button
                            type='submit'
                            className='w-full'
                            disabled={isPending}
                        >
                            {isPending ? (<Loader2 className="animate-spin"/>) : "Login"}
                        </Button>
                        <div>
                            <p className='text-center text-sm text-muted-foreground'>
                                Already have an account? <Link href="/login" className='text-brand-300 hover:underline'>Login</Link>
                            </p>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}

export default SignUp