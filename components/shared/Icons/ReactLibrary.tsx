import { IconContext } from "react-icons";
import { BsTrashFill } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

interface IconProp {
  type : string;
};

export default function ReactLibIcons ({type}: IconProp) {

  const ignoreTab = -1;
  
  switch(type) {
    case "trash": 
      return <IconContext.Provider value={{ color: "white", className: "trash" }}>
          <button className="border-outline-none bg-none element-center line-height-normal" 
                  style = {{background: "none"}}
          >
            <BsTrashFill />
          </button>
        </IconContext.Provider>
    case "down-chevron": 
        return <IconContext.Provider value={{ color: "black", className: "icon-20" }}>
          <button className="border-outline-none bg-none element-center" 
                  // type = "button"
                  tabIndex= {ignoreTab}
                  style = {{background: "none"}}
          >
            <MdOutlineKeyboardArrowDown />
          </button>
        </IconContext.Provider>
    default:
      return <></>
  }
}
