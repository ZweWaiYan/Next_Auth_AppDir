"use client"
import React from 'react';
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

const pb = new PocketBase('http://127.0.0.1:8090');

export default function SignUp() {
    const router = useRouter();    

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const data = {
            "email" : event.target.email.value,
            "password": event.target.password.value,                        
            "passwordConfirm": event.target.comfirm_pw.value,                     
        }

        await pb.collection('users').create(data);        
    }

    const changeRoute = () => {
        router.push("/");
    }
    
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
                                fontFamily: 'Arial',
                            }}
                        >
                            Create New User
                        </Text>
                        <Spacer y={1} />
                        <Input
                            name='email'
                            bordered
                            fullWidth
                            color="primary"
                            size="lg"
                            placeholder="Email"
                            css={{ mb: '6px' }}
                        />
                        <Spacer y={1} />
                        <Input
                            name='password'
                            bordered
                            fullWidth
                            color="primary"
                            size="lg"
                            placeholder="Password"
                            css={{ mb: '6px' }}
                        />
                        <Spacer y={1} />
                        <Input
                            name='comfirm_pw'
                            bordered
                            fullWidth
                            color="primary"
                            size="lg"
                            placeholder="Comfirm Password"
                            css={{ mb: '6px' }}                        
                        />
                        <Spacer y={2} />                
                        <Row justify="space-between">
                            <Button onClick={changeRoute} css={{fontFamily: 'Arial'}} auto>Cancel</Button>
                            <Spacer x={0.5} />
                            <Button onClick={changeRoute} type='submit' css={{fontFamily: 'Arial'}} auto>Sign in</Button>
                        </Row>
                    </form>
                </Card>
            </Container>
        </div>
    );
}