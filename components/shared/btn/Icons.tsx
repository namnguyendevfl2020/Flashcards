import { IconContext } from "react-icons";
import { BsTrashFill } from "react-icons/bs";

interface IconProp {
  type : string;
};

export const Icon = ({type}: IconProp) => {
  switch(type) {
    case "trash": 
      return <IconContext.Provider value={{ color: "white", className: "icon-20" }}>
          <button className="border-outline-none bg-none element-center" 
                  style = {{background: "none"}}
          >
            <BsTrashFill />
          </button>
        </IconContext.Provider>
    default:
      return <></>;
  };
};
