import { configureStore } from "@reduxjs/toolkit";
import newZoneSliseReducer from '../components/redux/slices/newZoneSlise'
import dynamic from "next/dynamic";
// const documentSliseReducer = dynamic(
//     () => import("../components/redux/slices/documentSliseReducer"),
//     { ssr: false }
// )
import documentSliseReducer from "../components/redux/slices/documentSliseReducer";
import pacientInfoSliseReducer from "../components/redux/slices/pacientInfoSliseReducer";
import zoneInfoSliseReducer from "../components/redux/slices/zoneInfoSliseReducer";
import ogkSliseReducer from "../components/redux/slices/ogkSliseReducer";
import cherepSliseReducer from "../components/redux/slices/cherepSliseReducer";
import ppnSliseReducer from "../components/redux/slices/ppnSliseReducer"
import universalSliceReducer from "../components/redux/slices/universalSliceReducer";
import newPatientSliseReducer from "../components/redux/slices/newPatientSliseReducer";
import descriptionOnlyReducer from "../components/redux/slices/descriptionOnlyReducer";

const store = configureStore({
    reducer: {
        creatingZones: newZoneSliseReducer,
        creatingPatient: newPatientSliseReducer,
        creatingDocument: documentSliseReducer,
        pacientInfo: pacientInfoSliseReducer,
        zoneInfo: zoneInfoSliseReducer,
        ogkInfo: ogkSliseReducer,
        cherepInfo: cherepSliseReducer,
        ppnInfo: ppnSliseReducer,
        universalSlice: universalSliceReducer,
        descriptionOnly: descriptionOnlyReducer,
    }
})

export default store