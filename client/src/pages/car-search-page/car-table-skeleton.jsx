import React, {useState, useEffect} from "react";
import { Skeleton } from "@mui/material";

const CarTableSkeleton = () => {
    const [loading, setLoading]= useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [])

    return (
        <div>
            {loading ? <Skeleton animation="wave" animation={false} /> : <div>DONE</div>}
        </div>
    )
}

export default CarTableSkeleton;
