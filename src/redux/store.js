import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./features/authSlice";
import personReducer from "./features/personSlice";
import marriageReducer from "./features/marriageSlice";

const authPersistConfig = {
  key: "auth",
  storage,
};
const personPersistConfig = {
  key: "person",
  storage,
};
const marriagePersistConfig = {
  key: "marriage",
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedPersonReducer = persistReducer(
  personPersistConfig,
  personReducer
);
const persistedMarriageReducer = persistReducer(
  marriagePersistConfig,
  marriageReducer
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    person: persistedPersonReducer,
    marriage: persistedMarriageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
