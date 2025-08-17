import React from "react";
import { useNotification } from "./NotificationContext";
import LoadingScreen from "../loadingScreen";
import ErrorComponent from "../errorComponent";
import SuccessComponent from "../successComponent"
export default function GlobalStatus() {
  const { isLoading, error, info,isLoggedIn } = useNotification();

  return (
    <>
      {isLoading && <LoadingScreen />}
      {error && <ErrorComponent text={error} errorkey={Date.now()}/>}
      {info && <SuccessComponent text={info} />}
    </>
  );
}