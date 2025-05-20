import { Button, CircularProgress, Stack, Tooltip, Typography } from "@mui/material";
import { Add, ArrowForward, Logout, NoteAlt } from "@mui/icons-material";
import { headerBg } from "../utils/color";
import { useUserContext } from "../Context/userContex";
import { UseGoalsProvider } from "../Context/goalsContex";
import goalsLogo from '../assets/goalslogo.png';

const Header = () => {


  const { handleLogin, handleLogout, isAuth,isLoading } = useUserContext()
  const { setOpenAddGoalsDialog, openAddGolsDialog } = UseGoalsProvider() || {}

  return (
    <Stack
      direction={"row"}
      height={"4rem"}
      width={"100%"}
      position={"fixed"}
      top={0}
      right={0}
      zIndex={1000}
      alignItems={"center"}
      justifyContent={"space-between"}
      padding={{ xs: "1rem", md: "1rem 2rem" }}
      sx={{
        background: `${headerBg}`
      }}

    >

      <Stack direction="row" alignItems="center" spacing={1} height={"100%"} >
        {/* <NoteAlt sx={{ color: "orange", fontSize: "1.8rem" }} />
        <Typography variant="h6" sx={{ fontWeight: 700, color: "white" }}>
          YourNote
        </Typography> */}

        <img
          style={{
            height: "2.6rem"
          }}
          src={goalsLogo} alt="" />
      </Stack>


      <Stack direction={"row"} gap={2}>

        <Tooltip title='Add Note' >
          <Button
            onClick={() => setOpenAddGoalsDialog((pre) => !pre)}
            variant="contained"
            sx={{
              background: `white`,
              padding: { md: "6px 11px", xs: "6px 10px" },
              fontSize: { md: ".8rem", xs: ".75rem" },
              color: "orange",
              fontWeight: "800",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            Add  <Add sx={{ fontSize: { md: "1.1rem", xs: "1rem" }, }} />
          </Button>
        </Tooltip>


        <Button
          onClick={isAuth ? handleLogout : handleLogin}
          variant="contained"
          sx={{
            background: `#0000ff`,
            padding: { md: "5px 11px", xs: "4px 10px" },
            fontSize: { md: ".8rem", xs: ".71rem" },
            color: "white",
            fontWeight: "600",
            borderRadius: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          disabled={isLoading?true:false}
        >
          {
            isAuth ? (
              <>
                {
                  isLoading ? <CircularProgress size={"1.5rem"} color="primary"/> :
                    <Tooltip title='LogOut'>
                      <Logout sx={{ fontSize: { md: "1.4rem", xs: "1.4rem" }, }} />
                    </Tooltip>
                }

              </>
            ) : (
              <>
                Login < ArrowForward sx={{ fontSize: { md: "1.1rem", xs: ".9rem", marginLeft: "2rem" }, }} />
              </>
            )
          }
        </Button>


      </Stack>


    </Stack>
  )
}

export default Header;