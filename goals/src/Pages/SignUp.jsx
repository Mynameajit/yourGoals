import { Person2 } from '@mui/icons-material'
import { Button, CircularProgress, Paper, Stack, TextField, Typography, useMediaQuery } from '@mui/material'
import { buttonBgColor } from '../utils/color';
import { useUserContext } from '../Context/userContex';
import goalsImg from "../assets/goalsImg.jpg";

const input = {
    background: "none",
    outline: "none",
    border: "1px solid gray",
    padding: "10px 12px",
    fontSize: "18px",
    color: "white",
    borderRadius: "6px"
}




const Signup = () => {



    const {
        isLogin,
        setIsLogin,
        setUserName,
        userName,
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        handleRegister,
        isLoading,



    } = useUserContext() || {}

    const _600 = useMediaQuery("(max-width:700px)")



    return (

        <Stack
            height={"100vh"}
            width={"100%"}
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            padding={1}
            bgcolor={"rgba(0,0,0,0.66)"}
            position={"relative"}
        >

            <Stack
            mt={4}
                minHeight={_600 ? !isLogin ? "480px" : "400px" : !isLogin ? "480px" : "400px"}
                width={_600 ? "95%" : "400px"}
                padding={"1rem"}
                direction={"column"}
                alignItems={"center"}
                borderRadius={"1rem"}
                pt={_600 ? 2 : 1}
                color={"white"}
                boxShadow={"0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12)"}
                style={{
                    background: "linear-gradient( rgba(150, 2, 141, 0.6), rgba(2, 17, 150, 0.6))",
                }}
            >


                <Person2 sx={{ fontSize: _600 ? "3rem" : "4rem", color: "gray" }} />

                <Typography
                    style={{
                        background: "linear-gradient(to right, rgba(235, 38, 7, 1), rgba(7, 235, 151, 1))",
                        WebkitBackgroundClip: "text", // For Safari
                        backgroundClip: "text",
                        color: "transparent",
                        fontWeight: "bold", // Optional: Improves visibility
                    }}
                    variant='h4' fontSize={_600 ? "1.6rem" : "2rem"}>{isLogin ? "Login to YourNote" : "Register for YourNote"}</Typography>

                <Stack mt={_600 ? "2rem" : "1rem"} gap={"1rem"} width={"100%"}>

                    {
                        !isLogin && (
                            <Stack>
                                <Typography variant='subtitle1' sx={{ fontWeight: "600" }}>User Name <span style={{ color: "orange" }}>*</span></Typography>
                                <input
                                    style={input}
                                    type="email"
                                    placeholder='Enter UserName...'
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />

                            </Stack>
                        )
                    }


                    <Stack>
                        <Typography variant='subtitle1' sx={{ fontWeight: "600" }}>Email <span style={{ color: "orange" }}>*</span></Typography>
                        <input
                            style={input}
                            type="email"
                            placeholder='Enter email...'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </Stack>
                    <Stack>
                        <Typography variant='subtitle1' sx={{ fontWeight: "600" }}>Password <span style={{ color: "orange" }}>*</span></Typography>
                        <input
                            style={input}
                            type="password"
                            placeholder='Enter Password...'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </Stack>



                    <Button
                        disabled={isLoading ? true : false}
                        onClick={isLogin ? handleLogin : handleRegister}
                        size='l'
                        variant='contained'
                        style={{
                            background: `${isLoading ? "gray" : buttonBgColor}`,
                            marginTop: "1rem"
                        }}
                    >
                        {
                            isLoading ? (
                                <>
                                    <CircularProgress sx={{ fontWeight: "900" }} size={'1.8rem'} color="warning" />
                                </>
                            ) : (
                                isLogin ? "Sign In" : "Sign Up"
                            )

                        }

                    </Button>


                </Stack>

                <Typography
                    mt={2}
                    variant='h4' fontSize={_600 ? "1rem" : "1rem"}>
                    {isLogin ? "I have don'n account ?" : "I have a account ? "}
                    <span 
                    onClick={()=>setIsLogin((pre)=>!pre)}
                    style={{ color: "orange", textDecoration: "underline", cursor: "pointer" }} >
                        {isLogin ? " Register" : " Login"}
                    </span>
                </Typography>



            </Stack>

            <Stack position={"absolute"} height={"100%"} width={"100%"} zIndex={"-1"} style={{ filter: "blur(1px)" }}>
                <img style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                }} src={goalsImg} alt="" />
            </Stack>

        </Stack>
    )
}

export default Signup