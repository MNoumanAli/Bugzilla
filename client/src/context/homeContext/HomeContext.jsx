import { createContext, useState } from "react";
import { getLoggedUser } from "../../utils/user";

export const HomeContext = createContext();

const HomeContextProvider = ({ children }) => {
  const { name, email, role, id } = getLoggedUser();
  const [checkEdit, setEdit] = useState(false);
  const [checkModel, setModel] = useState(false);
  const [bugModal, setBugModal] = useState(false);
  return (
    <HomeContext.Provider
      value={{
        name,
        email,
        id,
        role,
        checkEdit,
        checkModel,
        bugModal,
        setBugModal,
        setModel,
        setEdit,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
export default HomeContextProvider;
