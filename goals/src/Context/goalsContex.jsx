import React, { createContext, useContext, useEffect, useState } from "react";
import { ref, push, onValue, get, remove, set, update } from "firebase/database";
import { realtimeDB } from "../Config/firebase";
import { useUserContext } from "./userContex";
import toast from "react-hot-toast";
import { fetchFirebaseData, } from "../Utils/GetData";

const Context = createContext();

const GoalsContext = ({ children }) => {
  const { user, setIsLogin } = useUserContext();

  const [goals, setGoals] = useState([]);
  const [openAddGolsDialog, setOpenAddGoalsDialog] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("");

  const [addGoalsLoading, setAddGoalsLoading] = useState(false);
  const [getLoading, setGetLoading] = useState(true);
  const [deliteLoading, setDeliteLoading] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isUpdateId, setIsUpdateId] = useState(null);
  const [UpdateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState(false);

  const goalsRef = user?.uid ? ref(realtimeDB, `Goals/${user.uid}`) : null;


  const fetchGoals = () => {

    if (!goalsRef) return;

    setGetLoading(true);
    setError(false);

    get(goalsRef)
      .then((snap) => {
        const data = snap.val();

        if (data) {
          const allGoals = Object.entries(data).map(([id, val]) => ({
            id,
            ...val,
          }));
          setGoals(allGoals);
        } else {
          setGoals([]);
        }

        setGetLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching goals:", err);
        setError(true);
        setGetLoading(false);
      });
  };


  // Real - time listener
  useEffect(() => {
    if (!goalsRef) return;

    const unsubscribe = onValue(goalsRef, (snap) => {
      const data = snap.val();


      if (data) {
        const allGoals = Object.entries(data).map(([id, val]) => ({
          id,
          ...val,
        }));
        setGoals(allGoals);
      } else {
        setGoals([]);
      }

      setGetLoading(false);
    });

    return () => unsubscribe();
  }, [user]);




  // Add new goal
  const handleAddTask = async () => {
    if (!user?.uid) return toast.error("User not logged in");

    if (!title || !description || !dueDate || !priority || !category) {
      return toast.error("Please fill all the fields");
    }
    const newRef = push(ref(realtimeDB, `Goals/${user.uid}`));

    const newGoal = {
      id: newRef.key,
      title,
      description,
      dueDate,
      priority,
      category,
      completed: false,
    };

    try {
      setAddGoalsLoading(true);
      await set(newRef, newGoal);
      toast.success("New Goal added ");

      // Clear form
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("Medium");
      setCategory("");
      setOpenAddGoalsDialog(false);
    } catch (err) {
      console.error("Error adding goal:", err.message);
      toast.error("Failed to add goal");
    } finally {
      setAddGoalsLoading(false);
    }
  };


  // ======= Update goals =======

  // Open update dialog and populate fields
  const onUpdate = (id, t, d, dueD, p, c) => {
    setIsUpdate(true);
    setIsUpdateId(id);
    setTitle(t);
    setDescription(d);
    setDueDate(dueD);
    setPriority(p);
    setCategory(c);
    setOpenAddGoalsDialog(true);
  };

  // Handle update submission
  const handleUpdateTask = async () => {
    if (!user?.uid || !isUpdateId) {
      toast.error("Missing user or goal ID");
      return;
    }

    const updatedData = {
      title,
      description,
      dueDate,
      priority,
      category,
      completed: false,
    };

    try {
      setUpdateLoading(true);
      const goalRef = ref(realtimeDB, `Goals/${user.uid}/${isUpdateId}`);
      await update(goalRef, updatedData);

      // Reset state
      setIsUpdateId(null);
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("Medium");
      setCategory("");
      setOpenAddGoalsDialog(false);
      setIsUpdate(false);

      toast.success("Goal updated successfully");
    } catch (error) {
      console.error("Error updating goal:", error);
      toast.error("Failed to update goal");
    } finally {
      setUpdateLoading(false);
    }
  };



  const onToggleComplete = async (id) => {
    try {
      const goalRef = ref(realtimeDB, `Goals/${user.uid}/${id}`);
      await update(goalRef, {
        completed: true,
      });

    } catch (error) {
      console.log(error);

    }

  }

  const onDelete = async (id) => {
    if (!id) return;

    const deliteRef = ref(realtimeDB, `Goals/${user.uid}/${id}`);
    try {
      setDeliteLoading(id);
      const delit = await remove(deliteRef);
      toast.success("deleted successfully.");
      setDeliteLoading(null);
    } catch (error) {
      console.error("Error deleting data:", error);
      setDeliteLoading(null);
    }
  };



  useEffect(() => {
    if (!openAddGolsDialog) {
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("Medium");
      setCategory("");
      setIsUpdate(false);
      setIsUpdateId(null); // (optional) clear ID too
    }
  }, [openAddGolsDialog]);


  return (
    <Context.Provider
      value={{
        // States
        openAddGolsDialog,
        setOpenAddGoalsDialog,
        title,
        setTitle,
        description,
        setDescription,
        dueDate,
        setDueDate,
        priority,
        setPriority,
        category,
        setCategory,


        // Actions
        handleAddTask,
        fetchGoals,
        onUpdate,
        onToggleComplete,
        onDelete,
        handleUpdateTask,


        // Data
        goals,
        error,
        setError,
        getLoading,
        addGoalsLoading,
        setIsLogin,
        deliteLoading,
        isUpdate,
        UpdateLoading

      }}
    >
      {children}
    </Context.Provider>
  );
};

export const UseGoalsProvider = () => useContext(Context);

export default GoalsContext;
