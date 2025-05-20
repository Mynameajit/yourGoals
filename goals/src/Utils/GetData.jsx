import { get, onValue, ref } from "firebase/database";
import { realtimeDB } from "../Config/firebase";


export const fetchFirebaseData = ({
    path,
    setData,
    setLoading,
    setError,
}) => {

    if (!path) {
        console.error("Invalid Firebase DB path");
        return null;
    }
    const dataRef = ref(realtimeDB, path);

    const fetchData = async () => {
        setLoading(true);
        setError(false);

        try {
            const snap = await get(dataRef);
console.log(snap);

            const data = snap.val();
            console.log(data);

            if (data) {
                const formatted = Object.entries(data).map(([id, val]) => ({
                    id,
                    ...val,
                }));
                console.log(formatted);

                setData(formatted);
            } else {
                setData([]);
            }
        } catch (err) {
            console.error("One-time fetch error:", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    fetchData()
};
