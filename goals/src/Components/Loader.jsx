import { CircularProgress, Stack } from '@mui/material'
import React from 'react'
import goals from '../assets/goals.png';


const Loader = () => {
    return (
        <Stack
            width={"100%"}
            height={"100vh"}
            alignItems={"center"}
            justifyContent={"center"}

            style={{
                background: "linear-gradient( rgba(150, 2, 141, 1), rgba(2, 17, 150, 1))",
            }}
        >


            <Stack
                position={"relative"}
                width={"5rem"}
                height={"5rem"}
                sx={{
                    '@keyframes pulse': {
                        '0%': { transform: 'scale(1)' },
                        '50%': { transform: 'scale(1.1)' },
                        '100%': { transform: 'scale(1)' }
                    }
                }}
            >
                {/* Circular Progress (Loader) */}
                <CircularProgress
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '5rem !important',
                        height: '5rem !important',
                        color: '#3f51b5',
                        animation: 'rotate 2s linear infinite',
                        '@keyframes rotate': {
                            '0%': { transform: 'rotate(0deg)' },
                            '100%': { transform: 'rotate(360deg)' }
                        }
                    }}
                    thickness={2}
                />

                {/* Image with slow pulse animation */}
                <img
                    style={{
                        height: '4rem',
                        width: '4rem',
                        borderRadius: '50%',
                        position: 'absolute',
                        top: '0.5rem',
                        left: '0.5rem',
                        objectFit: 'cover',
                        animation: 'pulse 3s ease-in-out infinite',
                        transformOrigin: 'center center'
                    }}
                    src={goals}
               />
                
                
            </Stack>

        </Stack>
    )
}

export default Loader