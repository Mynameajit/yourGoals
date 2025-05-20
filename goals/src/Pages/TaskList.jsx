import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Box,
  Stack,
  useMediaQuery,
  useTheme,
  Divider,
  Button,
} from "@mui/material";
import AddDialog from "../dialog/AddDialog";
import TaskItem from "../Components/TaskItem";
import { UseGoalsProvider } from "../Context/goalsContex";
import Loader from "../Components/Loader";
import DataError from "../Components/DataError";
import NoDataPage from "../Components/NoDataPage";


// =============== Short the all Goals Date by ============
const groupTasksByDate = (goals) => {
  const sorted = [...goals].sort(
    (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
  );

  return sorted.reduce((grouped, task) => {
    const dateKey = new Date(task.dueDate).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    if (!grouped[dateKey]) grouped[dateKey] = [];
    grouped[dateKey].push(task);
    return grouped;
  }, {});
};


// === Main components ====
const TaskList = () => {
  const { goals, error, getLoading, fetchGoals, setError, onUpdate, onToggleComplete, onDelete } = UseGoalsProvider() || {};
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isOnline, setIsOnline] = useState(navigator.onLine);


  // =========  Online Ofline event =================
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      fetchGoals && fetchGoals();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [fetchGoals]);



  //  ============ Call the short task function and get the short task =========
  const groupedTasks = groupTasksByDate(goals || []);


  // ==== Acroding to condastion show the components ======
  if (getLoading) return <Loader />;
  if (error) return <DataError />;
  if (!goals || goals.length === 0) return <NoDataPage />;


  return (
    <Box
      sx={{
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
        width: "100%",
        py: "4.6rem",
      }}
    >
      <Paper
        sx={{
          padding: isMobile ? 3 : 5,
          borderRadius: 4,
          margin: "auto",
          width: { xs: "100%", md: "65%" },
          minHeight: "100vh"
        }}
      >
        <Stack spacing={3}>
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            color="primary.dark"
          >
            🚀 Your Goals
          </Typography>


          {!isOnline && (
            <Box sx={{ textAlign: "center", color: "error.main" }}>
              <Typography variant="body1">
                ⚠️ You're offline. Changes might not be saved.
              </Typography>
            </Box>
          )}

          <AddDialog />

          {Object.entries(groupedTasks).map(([date, dateTasks]) => (
            <Box key={date}>
              <Typography
                variant="h6"
                color="primary"
                fontWeight="bold"
                sx={{ mt: 4, mb: 1 }}
              >
                🗓️ {date}
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <TaskItem tasks={dateTasks} onToggleComplete={onToggleComplete} onDelete={onDelete} onUpdate={onUpdate} />
            </Box>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
};

export default TaskList;
