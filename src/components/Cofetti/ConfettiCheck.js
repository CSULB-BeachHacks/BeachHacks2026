import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import ConfettiAnimation from "./Confetti";
import RainAnimation from "../Rain/Rain";

export default function ConfettiCheck() {
  const { currentUser } = useAuth();
  const [showConfetti, setShowConfetti] = useState(false);
  const [showRain, setShowRain] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkStatus() {
      if (!currentUser) {
        setShowConfetti(false);
        setShowRain(false);
        setLoading(false);
        return;
      }

      try {
        // Check if user is admin - don't show animations for admins
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists() && userSnap.data().isAdmin) {
          setShowConfetti(false);
          setShowRain(false);
          setLoading(false);
          return;
        }

        // Check application status
        const applicationRef = doc(db, "applications", currentUser.uid);
        const applicationSnap = await getDoc(applicationRef);
        
        if (applicationSnap.exists()) {
          const data = applicationSnap.data();
          const status = data.status || "pending";
          setShowConfetti(status === "accepted");
          setShowRain(status === "rejected");
        } else {
          setShowConfetti(false);
          setShowRain(false);
        }
      } catch (error) {
        console.error("Error checking application status:", error);
        setShowConfetti(false);
        setShowRain(false);
      } finally {
        setLoading(false);
      }
    }

    checkStatus();
  }, [currentUser]);

  if (loading) {
    return null;
  }

  return (
    <>
      {showConfetti && <ConfettiAnimation />}
      {showRain && <RainAnimation />}
    </>
  );
}
