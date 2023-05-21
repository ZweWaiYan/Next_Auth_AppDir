'use client'
import React, { useState } from 'react';
import {
    Card,
    Spacer,
    Button,
    Text,
    Input,
    Row,
    Container,
} from '@nextui-org/react';
import PocketBase from 'pocketbase';
import { useRouter } from 'next/navigation';

export default function SignIn() {    

    const pb = new PocketBase('http://127.0.0.1:8090');
    
    const router = useRouter();
    const [values, setValues] = useState({ email: "", password: "" });    

    const handleChange = (event: any) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        })

    }

    const changeRoute = () => {
        router.push("/signup");
    }

    const forgetPwHandle = () => {
        
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault(); 
        
        try {
            const authData = await pb.collection("users").authWithPassword(values.email, values.password);            
            if (authData) {
                document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
                router.push('/dashboard')
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    return (
        <div>
            <Container
                display="flex"
                alignItems="center"
                justify="center"
                css={{ minHeight: '100vh' }}
            >
                <Card css={{ mw: '420px', p: '20px' }} variant="bordered">
                    <form onSubmit={handleSubmit}>
                        <Text
                            size={24}
                            weight="bold"
                            css={{
                                as: 'center',
                                mb: '20px',
                                fontFamily: 'Arial'
                            }}
                        >
                            Login
                        </Text>
                        <Input
                            name="email"
                            bordered
                            fullWidth
                            color="primary"
                            size="lg"
                            placeholder="Email"
                            css={{ mb: '6px' }}
                            onChange={(event: any) => handleChange(event)}
                        />
                        <Spacer y={1} />
                        <Input
                            name="password"
                            bordered
                            fullWidth
                            color="primary"
                            size="lg"
                            placeholder="Password"
                            css={{ mb: '6px' }}
                            type="password"
                            onChange={(event : any) => handleChange(event)}
                        />
                        <Spacer y={2} />
                        <Row justify="space-between">                                                    
                            <Text onClick={changeRoute} size={14} css={{fontFamily: 'Arial'}}>Create New User</Text>
                            <Text onClick={forgetPwHandle} size={14} css={{fontFamily: 'Arial'}}>Forgot password?</Text>
                        </Row>
                        <Spacer y={1} />
                        <Button type='submit'>Sign in</Button>
                        <Spacer y={1} />
                    </form>
                </Card>
            </Container>
        </div>
    );
}
